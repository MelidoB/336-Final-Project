import axios from 'axios';
import process from 'process';

export async function createBooking(bookingDetails) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        console.log('Requesting to create booking with details:', bookingDetails);
        const response = await axios.post(`${backendServer}/bookings/create`, bookingDetails);
        console.log('Response from creating booking:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}
