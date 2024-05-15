// dbBalance.js
import axios from 'axios';
import process from 'process';

// Function to initialize the balance for a user
export const initializeBalance = async (uid, password) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/balance/init`, { uid, password });
        console.log('Initializing balance:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error initializing balance:', error);
        throw error;
    }
};

// Function to view the balance of a user
export const viewBalance = async (uid, password) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/balance/view`, { uid, password });
        console.log('Viewing balance:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error viewing balance:', error);
        throw error;
    }
};

// import money to the balance
export const importToBalance = async (uid, password, amount) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/balance/import`, { uid, password, amount });
        console.log('Importing to balance:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error importing to balance:', error);
        throw error;
    }
};

// export money from the balance
export const exportFromBalance = async (uid, password, amount) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/balance/export`, { uid, password, amount });
        console.log('Exporting from balance:', response.data);

        if (response.data.error) {
            if (response.data.error === 'NOT_ENOUGH_MONEY') {
                console.error('Error: Not enough money to export.');
            } else {
                console.error('Error from backend:', response.data.error);
            }
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error exporting from balance:', error);
        throw error;
    }
};
