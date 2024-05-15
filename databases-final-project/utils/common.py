import sys
import os
import functools
import hashlib
import random
import string
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import Flask, request
from flask_cors import CORS
from zoneinfo import ZoneInfo
from datetime import datetime as dt, time as tm, timedelta
from dateutil.parser import parse

# Setting up database and Flask application
database = create_engine("sqlite:///test_db.db")
session = scoped_session(sessionmaker(bind=database))
app = Flask("backend_server")

@app.teardown_appcontext
def remove_session(exception=None):
    session.remove()

from utils import tables

def post_wrap(func):
    def wrapper(*args, **kwargs):
        key = "methods"
        kwargs[key] = kwargs.get(key, [])
        if key in kwargs:
            if "POST" not in kwargs[key]:
                kwargs[key].append("POST")
        return func(*args, **kwargs)
    return wrapper

setattr(app, "route", post_wrap(app.route))
CORS(app)

UTC = ZoneInfo("UTC")
DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S.%f"
ROOT_UID = -1
ROOT_USERNAME = "root"
ROOT_PASSWORD = "root"

# Utility function to convert date and time strings
def convert_to_datetime(value, timezone, time_only=False):
    if time_only:
        # Handle time conversion using the time module
        value = tm.fromisoformat(value)
        return value  # Return the time object directly without any timezone adjustments
    else:
        try:
            value = parse(value)
        except ValueError:
            value = dt.strptime(value, DATETIME_FORMAT)
        return value.replace(tzinfo=timezone).astimezone(timezone).replace(tzinfo=None)

def convert_from_datetime(value, timezone, time_only=False):
    if isinstance(value, tm):
        # For time objects, just return the time as a string
        return value.strftime("%H:%M:%S")
    elif isinstance(value, dt):
        # For datetime objects, convert timezone and return formatted string
        value = value.replace(tzinfo=UTC).astimezone(timezone)
        return value.strftime(DATETIME_FORMAT)
    else:
        raise TypeError("value must be a datetime or time object")

def pass_hash(password, salt):
    return hashlib.sha256((password + salt).encode("utf-8")).hexdigest()

def generate_salt():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

def authentication_wrapper(uid, password, func):
    has_access = False
    if uid == ROOT_UID and password == ROOT_PASSWORD: # Hardcoded in, so we can bootstrap populating the table (and avoid a catch-22)
        has_access = True
    else:
        user = session.get(tables.User, uid)
        if user is None:
            return {"error": "USER_NOT_FOUND"}

        has_access = (user.password_hash == pass_hash(password, user.password_salt))

    if not has_access:
        return {"error": "PASSWORD_INCORRECT"}
    else:
        return func()

def authenticate(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return authentication_wrapper(request.json["uid"], request.json["password"], lambda: func(*args, **kwargs))
    return wrapper

def last(lst):
    if len(lst) == 0:
        return None
    else:
        return lst[-1]
