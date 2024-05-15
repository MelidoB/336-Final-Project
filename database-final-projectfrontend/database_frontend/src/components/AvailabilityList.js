// AvailabilityList.js
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../static/css/AvailabilityList.css';
import { createBooking } from '../db methods/dbBookingCreate';
import * as User from "../Users.js";

function AvailabilityList() {
    const location = useLocation();
    const history = useHistory();
    console.log("Location state:", location.state);

    let { searchResults, service, startDate, startTime, endDate, endTime } = location.state || {
        searchResults: { info: [] },
        service: { device: '', issue: '' },
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
    };
	
    console.log('Extracted search results:', searchResults);
    console.log('Extracted search results:', typeof(searchResults));
    console.log('Extracted service:', service);

    const handleBookingClick = async (businessId, availabilityToServiceId) => {
        const userId = User.getUser('uid');
        const password = User.getUser('password');
        if (!userId) {
            alert('User ID is missing. Please log in.');
            return;
        }

        const formattedStartDateTime = startDate && startTime ? `${startDate} ${startTime}:00.000` : null;
        const formattedEndDateTime = endDate && endTime ? `${endDate} ${endTime}:00.000` : null;

        if (!formattedStartDateTime || !formattedEndDateTime) {
            alert('Invalid date or time. Please check your inputs.');
            return;
        }

        const bookingDetails = {
            uid: userId,
            password: password,
            business: businessId,
            availability_to_service: availabilityToServiceId,
            start_datetime: formattedStartDateTime,
            end_datetime: formattedEndDateTime,
            service: service
        };

        try {
            const result = await createBooking(bookingDetails);
            console.log('Booking successful!');
            alert('Booking successful!');
            history.push('/dashboard');
        } catch (error) {
            alert('Failed to create booking. Please try again.');
            console.error('Error creating booking:', error);
        }
    };

    if (!searchResults.info || searchResults.info.length === 0) {
        return <div className="AvailabilityList">No available services found. Please try again for a different day or time.</div>;
    }

    return (
        <div className="AvailabilityList">
            <h1>Available Businesses</h1>
            <ul>
                {searchResults.info.map((business, index) => (
                    <li key={business.business} className="business-list-item">
                        Business ID: {business.business}, Distance: {isFinite(business.distance) ? `${business.distance.toFixed(2)} km` : 'N/A'}, Price: ${business.price.toFixed(2)}
                        <button onClick={() => handleBookingClick(business.business, business.availability_to_service)} className="booking-button">
                            Create Booking
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AvailabilityList;
