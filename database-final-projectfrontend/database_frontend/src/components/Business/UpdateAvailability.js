import React, { useEffect, useState } from 'react';
import BusinessHeader from './Header';  // Adjust the path as needed
import BusinessFooter from './Footer';  // Adjust the path as needed

const DAYS_OF_WEEK = [
    { label: "Monday", value: "MONDAY" },
    { label: "Tuesday", value: "TUESDAY" },
    { label: "Wednesday", value: "WEDNESDAY" },
    { label: "Thursday", value: "THURSDAY" },
    { label: "Friday", value: "FRIDAY" },
    { label: "Saturday", value: "SATURDAY" },
    { label: "Sunday", value: "SUNDAY" }
];

function UpdateAvailability() {
    const [availabilities, setAvailabilities] = useState([]);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');  // New state for password
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingAvailabilityId, setEditingAvailabilityId] = useState(null);
    const [editingAvailability, setEditingAvailability] = useState({});
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

    const handleEdit = (availability) => {
        setEditingAvailabilityId(availability.availability_id);
        setEditingAvailability({
            ...availability,
            days_supported: Array.isArray(availability.days_supported) ? availability.days_supported : [],
            services: Array.isArray(availability.services) ? availability.services.join(', ') : '',
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5000/availabilities/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editingAvailability,
                    days_supported: editingAvailability.days_supported,
                    services: editingAvailability.services.split(',').map(service => parseInt(service.trim())),
                    uid: parseInt(userId),
                    password,
                    id: editingAvailabilityId,
                    available: editingAvailability.available,  // Ensure this is included
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update availability');
            }

            setAvailabilities((prev) =>
                prev.map((av) => (av.availability_id === editingAvailabilityId ? editingAvailability : av))
            );
            setSuccessMessage('Availability updated successfully!');
            setEditingAvailabilityId(null);
        } catch (error) {
            setErrorMessage('There was a problem updating the availability.');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingAvailability((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDaysSupportedChange = (day) => {
        setEditingAvailability((prev) => {
            const newDaysSupported = prev.days_supported.includes(day)
                ? prev.days_supported.filter(d => d !== day)
                : [...prev.days_supported, day];
            return { ...prev, days_supported: newDaysSupported };
        });
    };

    const handleCancel = () => {
        setEditingAvailabilityId(null);
        setEditingAvailability({});
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
                                    Enter Business ID:
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
                                    <div key={availability.availability_id} className="flex flex-col p-4 mb-4 border-b border-[#e0e0e0]">
                                        {editingAvailabilityId === availability.availability_id ? (
                                            <form onSubmit={handleUpdate} className="w-full">
                                                <div className="mb-5">
                                                    <label htmlFor="business" className="mb-3 block text-base font-medium text-[#07074D]">
                                                        Business ID:
                                                    </label>
                                                    <input
                                                        id="business"
                                                        name="business"
                                                        type="text"
                                                        value={editingAvailability.business_id}
                                                        onChange={handleChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="start_datetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                                        Start DateTime:
                                                    </label>
                                                    <input
                                                        id="start_datetime"
                                                        name="start_datetime"
                                                        type="datetime-local"
                                                        value={editingAvailability.start_datetime}
                                                        onChange={handleChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="end_datetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                                        End DateTime:
                                                    </label>
                                                    <input
                                                        id="end_datetime"
                                                        name="end_datetime"
                                                        type="datetime-local"
                                                        value={editingAvailability.end_datetime}
                                                        onChange={handleChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                                                        Days Supported:
                                                    </label>
                                                    <div className="flex flex-wrap">
                                                        {DAYS_OF_WEEK.map((day) => (
                                                            <label key={day.value} className="mr-4 mb-2 flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    name="days_supported"
                                                                    value={day.value}
                                                                    checked={editingAvailability.days_supported.includes(day.value)}
                                                                    onChange={() => handleDaysSupportedChange(day.value)}
                                                                    className="mr-2"
                                                                />
                                                                {day.label}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="services" className="mb-3 block text-base font-medium text-[#07074D]">
                                                        Services (comma separated):
                                                    </label>
                                                    <input
                                                        id="services"
                                                        name="services"
                                                        type="text"
                                                        value={editingAvailability.services}
                                                        onChange={handleChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex space-x-4">
                                                    <button
                                                        type="submit"
                                                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                                        Update
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCancel}
                                                        className="hover:shadow-form w-full rounded-md bg-gray-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-base font-medium text-[#6B7280]">Availability ID: {availability.availability_id}</p>
                                                    <p className="text-base font-medium text-[#6B7280]">Business ID: {availability.business_id}</p>
                                                    <p className="text-base font-medium text-[#6B7280]">Start: {new Date(availability.start_datetime).toLocaleString()}</p>
                                                    <p className="text-base font-medium text-[#6B7280]">End: {new Date(availability.end_datetime).toLocaleString()}</p>
                                                    <p className="text-base font-medium text-[#6B7280]">Days Supported: {Array.isArray(availability.days_supported) ? availability.days_supported.join(', ') : 'N/A'}</p>
                                                    <p className="text-base font-medium text-[#6B7280]">Services: {Array.isArray(availability.services) ? availability.services.join(', ') : 'N/A'}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleEdit(availability)}
                                                    className="ml-4 rounded-md bg-[#6A64F1] py-2 px-4 text-base font-semibold text-white hover:bg-[#5852d6]"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
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

export default UpdateAvailability;
