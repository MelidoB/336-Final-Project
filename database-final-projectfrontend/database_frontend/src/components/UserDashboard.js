import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserProfile from './UserProfile';
import { fetchBookings } from '../db methods/dbBookingList';
import { deleteBooking } from '../db methods/dbBookingCancel';
import { fetchBookingInfo } from '../db methods/dbBookingInfo';
import { fetchServiceInfo } from '../db methods/dbServiceInfo';
import { initializeBalance, viewBalance, importToBalance, exportFromBalance } from '../db methods/dbBalance';
import * as User from "../Users.js";

import '../static/css/UserDashboard.css'; 


function UserDashboard() {
    const history = useHistory();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });
    const [bookings, setBookings] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (!User.getUser("uid")) {
            history.push('/signin');
            return;
        }

        const userId = User.getUser("uid");
        const password = User.getUser("password");

        setLoading(true);
        fetchBookings(userId, password)
            .then(async (bookingIds) => {
                if (bookingIds.length === 0) return;

                const bookingsWithDetails = await Promise.all(bookingIds.map(async (bookingId) => {
                    const bookingInfo = await fetchBookingInfo(bookingId, userId, password);
                    if (bookingInfo.service) {
                        const serviceInfo = await fetchServiceInfo(bookingInfo.service);
                        return {
                            ...bookingInfo,
                            serviceName: serviceInfo.name,
                            serviceDescription: serviceInfo.description
                        };
                    } else {
                        return {
                            ...bookingInfo,
                            serviceName: 'N/A',
                            serviceDescription: 'N/A'
                        };
                    }
                }));

                const bookingsDict = {};
                bookingsWithDetails.forEach(booking => {
                    bookingsDict[booking.id] = booking;
                });
                setBookings(bookingsDict);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load bookings');
                setLoading(false);
            });

        handleViewBalance();
    }, [history]);

    const handleDeleteBooking = (bookingId) => {
        const password = User.getUser('password');
        const userId = User.getUser('uid');

        deleteBooking(userId, bookingId, password)
            .then(() => {
                const updatedBookings = { ...bookings };
                delete updatedBookings[bookingId];
                setBookings(updatedBookings);
                alert('Booking deleted successfully');
            })
            .catch(err => {
                alert('Failed to delete booking');
            });
    };

    const handleNavigate = (path) => {
        history.push(path);
    };

    const handleLogout = () => {
        User.clearUser();
        setUser({});
        history.push('/');
    };

    const handleBookService = () => {
        history.push('/book-service');
    };

    const handleInitializeBalance = async () => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            await initializeBalance(userId, password);
            handleViewBalance();  
        } catch (error) {
            alert(`Failed to initialize balance: ${error.message}`);
        }
    };

    const handleViewBalance = async () => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            const result = await viewBalance(userId, password);
            setBalance(result.balance);  
        } catch (error) {
            console.error(`Failed to view balance: ${error.message}`);
        }
    };

    const handleImportToBalance = async () => {
        const input = prompt("Enter amount to add:");
        const amount = parseInt(input, 10); 
        if (isNaN(amount) || amount <= 0) { 
            alert("Please enter a valid positive integer.");
            return; 
        }

        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            await importToBalance(userId, password, amount);
            handleViewBalance(); 
        } catch (error) {
            alert(`Failed to add funds: ${error.message}`);
        }
    };

    const handleExportFromBalance = async () => {
        const input = prompt("Enter amount to export:");
        const amount = parseInt(input, 10); 
        if (isNaN(amount) || amount <= 0) { 
            alert("Please enter a valid positive integer.");
            return; 
        }

        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            await exportFromBalance(userId, password, amount);
            handleViewBalance();  
        } catch (error) {
            alert(`Failed to export funds: ${error.message}`);
        }
    };

    const onSaveProfile = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const userId = User.getUser("uid");

    return (
        <div className="user-container">
            <UserProfile user={user} onSaveProfile={onSaveProfile} />
            <div className="user-dashboard">
                <h1>Welcome, {userId}!</h1>
                {loading ? <div>Loading bookings...</div> : error ? <div>Error: {error}</div> : (
                    <div className="max-w-2xl mx-auto mt-24">
                        <h2>Your Bookings</h2>
                        <div className="max-h-96 overflow-y-auto">
                            {Object.keys(bookings).length > 0 ? (
                                Object.entries(bookings).map(([bookingId, booking]) => (
                                    <div key={bookingId} className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start mb-4 p-4">
                                        <div className="relative w-32 h-32 flex-shrink-0">
                                            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src="https://via.placeholder.com/150" alt="Service" />
                                        </div>
                                        <div className="flex flex-col gap-2 py-2">
                                            <p className="text-xl font-bold">{booking.serviceName}</p>
                                            <p className="text-gray-500">
                                                {booking.serviceDescription}
                                            </p>
                                            <p className="text-gray-500">
                                                <strong>Service Start:</strong> {new Date(booking.start_datetime).toLocaleString()}
                                            </p>
                                            <p className="text-gray-500">
                                                <strong>Service End:</strong> {new Date(booking.end_datetime).toLocaleString()}
                                            </p>
                                            <p className="text-gray-500">
                                                <strong>Availability:</strong> {booking.availability}
                                            </p>
                                            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleDeleteBooking(bookingId)}>Cancel Booking</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No bookings found.</p>
                            )}
                        </div>
                    </div>
                )}
                <div className="dashboard-section">
                    <div className="top-row">
                        <button onClick={handleInitializeBalance}>Initialize Balance</button>
                        <button onClick={handleImportToBalance}>Add Funds to Balance</button>
                        <button onClick={handleExportFromBalance}>Export Funds from Balance</button>
                    </div>
                    <div className="bottom-row">
                        <button onClick={() => handleNavigate('/repair_wave')}>Book New Service With Repair Wave</button>
                        <button onClick={() => handleNavigate('/clean_touch')}>Book New Service with Clean Touch</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div>
                    <h2>Current Balance: ${balance.toFixed(2)}</h2>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;