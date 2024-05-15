from utils import common, tables

from utils.common import app, session

from utils import availabilities

from flask import request, send_file, current_app
from sqlalchemy import select
import pgeocode

import os
from pathlib import Path
from zoneinfo import ZoneInfo
import math

NUM_TO_DAY=availabilities.DAY_TO_NUM.keys()


@app.route("/availabilities/create")
@common.authenticate
def create_post():
    uid = request.json["uid"]

    # Create the availability object
    availability = tables.Availability()

    # Assign the business ID
    availability.business = uid

    # Assign other JSON values to the availability object
    availabilities.assign_json_to_availability(availability, request.json)

    # Add the availability object to the session
    session.add(availability)

    # Commit the session to generate an ID for the availability object
    try:
        session.commit()
    except Exception as e:
        session.rollback()
        raise e

    # Create and add services
    services_data = request.json.get("services_data", [])
    service_ids = []
    for service_data in services_data:
        service = tables.Service()
        # Assign JSON values to the service object
        for key, value in service_data.items():
            setattr(service, key, value)
        session.add(service)
        session.commit()
        service_ids.append(service.id)

    # Add entries to the Availability_to_Service table
    for service_id in service_ids:
        availability_to_service = tables.Availability_to_Service(
            availability=availability.id, service=service_id
        )
        session.add(availability_to_service)

    # Commit the session again to save the availability_to_service entries
    try:
        session.commit()
    except Exception as e:
        session.rollback()
        raise e

    return {"success": True, "availability_id": availability.id, "service_ids": service_ids}


@app.route("/availabilities/info", methods=["POST"])
def availability_info():
    result = {}
    
    availability = session.get(tables.Availability, request.json["id"])
    
    if availability is None:
        result["error"] = "NOT_FOUND"
        return result, 404
    
    timezone = ZoneInfo(request.json.get("timezone", "UTC"))
    
    for col in availability.__mapper__.attrs.keys():
        value = getattr(availability, col)
        if col == "id":
            continue
        elif col.endswith("_datetime"):
            value = common.convert_from_datetime(value, timezone)
        elif col.endswith("_time"):
            value = common.convert_from_datetime(value, timezone)
        elif col == "days_supported":
            value = [NUM_TO_DAY[i] for i in range(len(NUM_TO_DAY)) if value & (1 << i) != 0]
        elif col == "services":
            query = select(tables.Availability_to_Service.service).where(tables.Availability_to_Service.availability == availability.id)
            value = session.scalars(query).all()
            
        result[col] = value

    return result


@app.route("/availabilities/list", methods=["POST"])
def availability_list():
    result = []

    # Extract the business_id from the request
    business_id = request.json["business_id"]

    timezone = ZoneInfo(request.json.get("timezone", "UTC"))

    # Fetch all availabilities with the same business ID
    availabilities = session.query(tables.Availability).filter_by(business=business_id).all()

    if not availabilities:
        return {"error": "NOT_FOUND"}, 404

    num_to_day_list = list(NUM_TO_DAY)  # Convert dict_keys to a list

    for availability in availabilities:
        availability_data = {}
        for col in availability.__mapper__.attrs.keys():
            value = getattr(availability, col)
            if col == "id":
                availability_data["availability_id"] = value
            elif col == "business":
                availability_data["business_id"] = value
            elif col.endswith("_datetime"):
                value = common.convert_from_datetime(value, timezone)
            elif col.endswith("_time"):
                value = common.convert_from_datetime(value, timezone, time_only=True)
            elif col == "days_supported":
                value = [num_to_day_list[i] for i in range(len(num_to_day_list)) if value & (1 << i) != 0]
            elif col == "services":
                query = select(tables.Availability_to_Service.service).where(tables.Availability_to_Service.availability == availability.id)
                value = session.scalars(query).all()

            availability_data[col] = value
        result.append(availability_data)

    return {"availabilities": result}





@app.route("/availabilities/edit")
@common.authenticate
def availability_edit():     
    return availabilities.availability_change(request, "edit")
    
@app.route("/availabilities/delete", methods=["POST"])
@common.authenticate
def availability_delete():
    return availabilities.availability_change(request, "delete")


dist = pgeocode.GeoDistance('US') #We will have to find a way to support other countries dynamically (probably need another field in user for country)

@app.route("/availabilities/search", methods=["POST"])
def availability_search():
    result = {}
    timezone = ZoneInfo(request.json.get("timezone", "UTC"))

    start_datetime = common.convert_to_datetime(request.json["start_datetime"], timezone)
    end_datetime = common.convert_to_datetime(request.json["end_datetime"], timezone)

    query = (
        select(
            tables.Availability_to_Service.id,
            tables.Availability.business,
            tables.User.zip_code,
            tables.Service.price,
            tables.Availability.start_datetime,
            tables.Availability.end_datetime,
        )
        .join_from(tables.Availability, tables.Availability_to_Service, tables.Availability.id == tables.Availability_to_Service.availability)
        .join(tables.User, tables.Availability.business == tables.User.id)
        .join(tables.Service, tables.Availability_to_Service.service == tables.Service.id)
        .where(availabilities.get_availabilities_in_range(start_datetime, end_datetime))
        .order_by(tables.Service.price.asc())
    )

    rows = []
    unique_businesses = set()
    dist = pgeocode.GeoDistance('US')

    for row in session.execute(query).all():
        if availabilities.check_for_conflict(start_datetime, end_datetime, row[1]):
            continue

        row_data = {
            "availability_to_service": row[0],
            "business": row[1],
            "zip_code": row[2],
            "price": row[3],
            "start_datetime": common.convert_from_datetime(row[4], timezone),
            "end_datetime": common.convert_from_datetime(row[5], timezone),
        }

        if row_data["business"] in unique_businesses:
            continue

        unique_businesses.add(row_data["business"])
        row_data["distance"] = 0

        rows.append(row_data)

    result["info"] = rows
    return result




@app.route("/upload")
@common.authenticate
def image_upload():
    result={}
    
    media_folder = os.path.join(current_app.root_path,"static","media")
    Path(media_folder).mkdir(parents=True,exist_ok=True)
    
    media = request.files.get['media']
    type=media.content_type
    size=media.content_length
    
    if size>10*(10**6):
        result["error"]="FILE_TOO_LARGE"
        return result

    upload=tables.Upload()
            
    upload.type=type
    
    session.add(upload)
    session.commit()
    
    media.save(os.path.join(media_folder, str(upload.id)))
        
    result["id"]=upload.id
    return result
    
@app.route("/media")
def image():
    
    id=request.json["id"]
    
    media_folder = os.path.join(current_app.root_path,"static","media")
    
    type=session.scalars(select(tables.Upload.type).where(tables.Upload.id==id).limit(1)).first()
        
    return send_file(os.path.join(media_folder, str(id)), mimetype=type)
