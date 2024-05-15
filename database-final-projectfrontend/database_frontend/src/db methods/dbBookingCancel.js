import axios from 'axios';
import process from 'process';

export async function deleteBooking(userId, bookingId, password) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/bookings/cancel`, {
            uid: userId,  
            id: bookingId,
            password: password
        });
        if (response.data.error) {
            console.error('Error deleting booking:', response.data.error);
            throw new Error(response.data.error);
        }
        return response.data;
    } catch (error) {
        console.error('Error in deleteBooking:', error);
        throw error;
    }
}