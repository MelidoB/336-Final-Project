import axios from 'axios';
import process from 'process';

export async function dbSignUp(password, email) {

    const submission = {
        'username': email,
        'password': password,
    };

    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/users/create`, submission);

        const uid = response.data.uid;
        const error = response.data.error;

        if (error) {
            console.error('SignUp error:', error);
            return [null, null, error];
        }

        console.log('SignUp successful. User ID:', uid);
        return [uid, password, null];

    } catch (error) {

        console.error('SignUp request failed:', error);
        return [null, null, error.message || 'Unknown error'];
    }
}
