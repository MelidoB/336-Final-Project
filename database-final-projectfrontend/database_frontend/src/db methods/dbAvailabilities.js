import axios from 'axios';
import process from 'process';

export async function fetchbusinessInfo(businessId) {
    console.log(`Fetching info for business ID: ${businessId}`);
  try {
    const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/users/info`, {
        params: { id: businessId }  // Sending the business ID with the correct key 'id' expected by the backend
    });

    if (response.data.error) {
      console.error('Fetching business info error:', response.data.error);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Request to fetch business info failed:', error);
    throw error;
  }
}
