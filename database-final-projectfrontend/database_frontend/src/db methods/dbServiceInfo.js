import axios from 'axios';
import process from 'process';

export async function fetchServiceInfo(serviceId) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/services/info`, {
            id: serviceId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.error) {
            console.error('Error fetching service info:', response.data.error);
            throw new Error(response.data.error);
        }

        console.log('Service info fetched successfully:', response.data);
        return {
            name: response.data.device || response.data.vehicle || "Unknown",
            description: response.data.device_repair || response.data.vehicle_service || "No description",
            start_datetime: response.data.start_datetime,
            end_datetime: response.data.end_datetime,
        };
    } catch (error) {
        console.error('Error in fetchServiceInfo:', error);
        throw error;
    }
}
