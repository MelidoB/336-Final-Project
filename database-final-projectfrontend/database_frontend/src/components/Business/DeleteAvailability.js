import React, { useEffect, useState } from 'react';
import BusinessHeader from './Header';  // Adjust the path as needed
import BusinessFooter from './Footer';  // Adjust the path as needed

function DeleteAvailability() {
    const [availabilities, setAvailabilities] = useState([]);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');  // New state for password
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isUserIdSubmitted, setIsUserIdSubmitted] = useState(false);

    const fetchAvailabilities = async () => {
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:5000/availabilities/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ business_id: parseInt(userId) }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch availabilities');
            }
            const data = await response.json();
            setAvailabilities(data.availabilities);
        } catch (error) {
            setErrorMessage('There was a problem fetching the availabilities.');
        }
    };

    const handleDelete = async (id) => {
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5000/availabilities/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: parseInt(userId), id, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete availability');
            }

            setAvailabilities((prev) => prev.filter((av) => av.availability_id !== id));
            setSuccessMessage('Availability deleted successfully!');
        } catch (error) {
            setErrorMessage('There was a problem deleting the availability.');
        }
    };

    const handleUserIdSubmit = (event) => {
        event.preventDefault();
        setIsUserIdSubmitted(true);
        fetchAvailabilities();
    };

    return (
        <div>
            <BusinessHeader />
            <div className="flex flex-col items-center p-12">
                <div className="w-full max-w-[800px] bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-[#07074D] mb-4">Availabilities</h2>
                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                        {!isUserIdSubmitted ? (
                            <form onSubmit={handleUserIdSubmit} className="mb-5">
                                <label htmlFor="userId" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Enter User ID:
                                </label>
                                <input
                                    id="userId"
                                    name="userId"
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                                <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Enter Password:
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="mt-4 w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form"
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            availabilities.length > 0 ? (
                                availabilities.map((availability) => (
                                    <div key={availability.availability_id} className="flex items-center justify-between p-4 mb-4 border-b border-[#e0e0e0]">
                                        <div>
                                            <p className="text-base font-medium text-[#6B7280]">ID: {availability.availability_id}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Start: {new Date(availability.start_datetime).toLocaleString()}</p>
                                            <p className="text-base font-medium text-[#6B7280]">End: {new Date(availability.end_datetime).toLocaleString()}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Days Supported: {availability.days_supported ? availability.days_supported.join(', ') : 'N/A'}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Services: {availability.services ? availability.services.join(', ') : 'N/A'}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Available: {availability.available ? 'Yes' : 'No'}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(availability.availability_id)}
                                            className="ml-4 rounded-md bg-red-600 py-2 px-4 text-base font-semibold text-white hover:bg-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-base font-medium text-[#6B7280]">No availabilities found.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
            <BusinessFooter />
        </div>
    );
}

export default DeleteAvailability;
