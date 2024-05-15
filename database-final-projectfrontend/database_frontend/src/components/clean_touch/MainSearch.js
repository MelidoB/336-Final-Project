import React, { useState, useRef } from 'react'; // Import useRef
import { useHistory } from 'react-router-dom';
import CleanTouchHeader from './Header';
import CleanTouchFooter from './Footer';
import { dbSearch } from '../../db methods/dbSearch';
import { createBooking } from '../../db methods/dbBookingCreate';
import * as User from "../../Users.js";

const VEHICLES = ["TOYOTA", "BMW", "VOLKSWAGEN"];
const SERVICES = ["DETAILING", "GENERAL_WASH", "BRAKE_FLUID"];

function MainSearch() {
    const [device, setDevice] = useState('');
    const [issue, setIssue] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('09:00');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const history = useHistory();
    // Create a ref for the search results section
    const searchResultsRef = useRef(null);

    const handleSearch = async () => {
        if (!startDate || !startTime) {
            setError('Please fill in all date and time fields.');
            return;
        }

        const formattedStartDateTime = `${startDate} ${startTime}:00.000`;
        const formattedEndDateTime = `${startDate} 11:00:00.000`; // End time fixed at 11:00

        try {
            const data = await dbSearch({}, "", formattedStartDateTime, formattedEndDateTime);
            setSearchPerformed(true);
            if (data && data.info) { // Change to 'info' as per response structure
                setSearchResults(data.info.map((item, index) => ({
                    id: item.business,
                    distance: item.distance,
                    price: item.price.toFixed(2),
                    availability: item.availability_to_service
                })));
                setError('');
                // Scroll to the search results section after search
                if (searchResultsRef.current) {
                    searchResultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                setSearchResults([]);
                setError('No data found.');
            }
        } catch (err) {
            setSearchResults([]);
            setError('Search request failed. Please try again later.');
        }
    };

    const handleBookingClick = async (businessId, availabilityToServiceId) => {
        const userId = User.getUser('uid');
        const password = User.getUser('password');
        if (!userId) {
            alert('User ID is missing. Please log in.');
            return;
        }

        const formattedStartDateTime = startDate && startTime ? `${startDate} ${startTime}:00.000` : null;
        const formattedEndDateTime = startDate && startTime ? `${startDate} 11:00:00.000` : null;

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
            service: { device, issue }
        };

        try {
            const result = await createBooking(bookingDetails);
            console.log('Booking successful!');
            alert('Booking successful!');
            history.push('/dashboard');
        } catch (error) {
            alert('Ensure you have sufficient funds, or correct any errors.');
            console.error('Error creating booking:', error);
        }
    };

    return (
        <div className="clean_touch-main-search">
            <CleanTouchHeader />
            <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="py-4 px-6">
                    <h1 className="text-2xl text-gray-900 font-bold text-center">Book your next car wash nearby.</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="mt-4">
                        <select className="shadow border rounded w-full py-2 px-3 text-gray-700" onChange={(e) => setDevice(e.target.value)} value={device}>
                            <option value="">Select a vehicle</option>
                            {VEHICLES.map((vehicle, index) => (
                                <option key={index} value={vehicle}>{vehicle}</option>
                            ))}
                        </select>
                        <select className="shadow border rounded w-full py-2 px-3 mt-4" onChange={(e) => setIssue(e.target.value)} value={issue}>
                            <option value="">Select a service</option>
                            {SERVICES.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                        <input type="text" placeholder="Enter Your ZipCode" className="shadow border rounded w-full py-2 px-3 mt-4" onChange={(e) => setLocation(e.target.value)} defaultValue={location} />
                        <input type="date" className="shadow border rounded w-full py-2 px-3 mt-4" onChange={(e) => setStartDate(e.target.value)} defaultValue={startDate} />
                        <input type="time" className="shadow border rounded w-full py-2 px-3 mt-4" onChange={(e) => setStartTime(e.target.value)} defaultValue={startTime} />
                        <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline w-full mt-4" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="white-space"></div>

            <h2 className="text-2xl text-gray-900 font-bold text-center">Search Results</h2>
            {/* Assign ref to the search results section */}
            <div className="search-results mt-4" ref={searchResultsRef}>
                {searchPerformed && searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                        {searchResults.map((result, index) => (
                            <li key={result.id} className={`flex justify-between items-center gap-x-6 py-5 ${index !== 0 ? 'mt-4' : ''}`}>
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">Business ID: {result.id}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Distance: {result.distance.toFixed(2)} meters</p>
                                        <p className="mt-1 text-xs leading-5 text-gray-500">Price: ${result.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleBookingClick(result.id, result.availability)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 focus:outline-none focus:shadow-outline">
                                    Create Booking
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : searchPerformed && searchResults.length === 0 ? (
                    <p className="text-center text-gray-500">No results found.</p>
                ) : null}
            </div>
            <CleanTouchFooter />
        </div>
    );
}

export default MainSearch;
