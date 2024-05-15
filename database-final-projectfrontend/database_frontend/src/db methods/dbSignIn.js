import axios from 'axios';
import process from 'process';

export async function dbSignIn(password, email) {

    const submission = {
        'username': email,
        'password': password,
    };
	
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/users/signin`, submission);

        const uid = response.data.uid;
        const error = response.data.error;

        if (error) {
            console.error('SignIn error:', error);
            return [null, password, error];
        }

        console.log('SignIn successful. User ID:', uid);
        return [uid, password, null];

    } catch (error) {
        console.error('SignIn request failed:', error);
        return [null, password, error.message || 'Unknown error'];
    }
}
