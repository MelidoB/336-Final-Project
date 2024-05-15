import axios from 'axios';
import process from 'process';

export async function fetchBookings(userId, password) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/bookings/list`, {
            uid: userId,  
            password: password  
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.error) {
            console.error('Error fetching bookings:', response.data.error);
            throw new Error(response.data.error);
        }

        console.log('Bookings fetched successfully:', response.data);
        return response.data.bookings; 
    } catch (error) {
        console.error('Error in fetchBookings:', error);
        throw error;
    }
}