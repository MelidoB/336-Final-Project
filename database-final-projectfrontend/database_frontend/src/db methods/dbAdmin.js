// dbAdmin.js
import axios from 'axios';
import process from 'process';

// Function to call the populate endpoint
export const populateDatabase = async (uid, password) => {
    try {
      const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/tables/populate`, {
        uid, 
        password,
      });
      console.log('Database populated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error populating database:', error);
    }
};

// Function to call the drop endpoint
export const dropDatabase = async (uid, password) => {
    try {
      const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/tables/drop`, {
        uid, 
        password,
      });
      console.log('Database dropped:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error dropping database:', error);
    }
};

export default { populateDatabase, dropDatabase };
