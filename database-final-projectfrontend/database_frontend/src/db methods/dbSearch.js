// dbSearch.js
import axios from 'axios';
import process from 'process';

export async function dbSearch(services, zipCode, startDateTime, endDateTime) {
    const submission = {
        services,
        zip_code: zipCode,
        start_datetime: startDateTime,
        end_datetime: endDateTime,
    };
    console.log('Sending search request:', submission);

    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/availabilities/search`, submission);
        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }
        console.log('Search response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Search request failed:', error);
        throw error; 
    }
}
