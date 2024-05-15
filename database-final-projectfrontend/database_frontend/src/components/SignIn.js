import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../static/css/SignIn.css';
import * as User from "../Users.js";

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const location = useLocation();

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            history.replace({ ...location, state: {} });
        }
    }, [location, history]);

    const handleSignIn = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://127.0.0.1:5000/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password: password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.error) {
                setErrorMessage('Username or password is incorrect. Please try again.');
            } else {
                User.clearUser();
		User.setUser("uid", data.uid);
		User.setUser("password", password);
                history.push('/dashboard');
            }
        } catch (error) {
            setErrorMessage('There was a problem with the sign-in process.');
        }
    };

    return (
        <div className="signin-container">
            <form onSubmit={handleSignIn} className="signin-form">
                {errorMessage && <div className="signin-error">{errorMessage}</div>}
                {successMessage && <div className="signin-success">{successMessage}</div>}
                <h2>Sign In</h2>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;