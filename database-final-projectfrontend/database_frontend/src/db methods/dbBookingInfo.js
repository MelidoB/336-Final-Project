import axios from 'axios';
import process from 'process';

export async function fetchBookingInfo(bookingId, userId, password) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/bookings/info`, {
            uid: userId,
            id: bookingId,
            password: password
        });
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return { ...response.data, id: bookingId };
    } catch (error) {
        console.error('Error fetching booking details:', error);
        throw error;
    }
}

