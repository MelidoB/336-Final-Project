import React, { useState } from 'react';
import '../static/css/UserProfileEdit.css';

function UserProfileEdit({ user, onSaveProfile }) {
    const [editUser, setEditUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setEditUser((prevState) => ({
                    ...prevState,
                    avatar: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveProfile(editUser);
    };

    return (
        <div className="form-container"> {/* Added container for better layout control */}
            <form onSubmit={handleSubmit} className="user-profile-edit-form">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username" // Placeholder added
                    value={editUser.username}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email (optional)</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email" // Placeholder added
                    value={editUser.email}
                    onChange={handleChange}
                />
                <label htmlFor="contact">Contact</label>
                <input
                    id="contact"
                    name="contact"
                    type="text"
                    placeholder="Enter your contact number" // Placeholder added
                    value={editUser.contact}
                    onChange={handleChange}
                />
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your address" // Placeholder added
                    value={editUser.address}
                    onChange={handleChange}
                />
                <label htmlFor="avatar">Profile Picture</label>
                <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    onChange={handleFileChange}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default UserProfileEdit;
