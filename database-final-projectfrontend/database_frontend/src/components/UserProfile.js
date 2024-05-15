import React, { useState } from 'react';
import '../static/css/UserProfile.css';

function UserProfile({ user, onSaveProfile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [localUser, setLocalUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalUser({ ...localUser, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        onSaveProfile(localUser);
        setIsEditing(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setLocalUser({ ...localUser, avatar: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const renderEditView = () => (
        <>
            <input type="file" name="avatar" onChange={handleFileChange} />
            <input type="text" name="username" value={localUser.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email (optional)" value={localUser.email || ''} onChange={handleChange} />
            <input type="tel" name="contact" placeholder="Phone number (optional)" value={localUser.contact || ''} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address (optional)" value={localUser.address || ''} onChange={handleChange} />
            <button class="user-profile-edit-btn" onClick={handleSaveChanges}>Save Changes</button>
        </>
    );

    const renderDefaultView = () => (
        <>
            {user.avatar && <img src={user.avatar} alt="Profile" />}
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
            <p><strong>Contact:</strong> {user.contact || 'Not provided'}</p>
            <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
            <button class="user-profile-edit-btn" onClick={handleEdit}>Edit Profile</button>
        </>
    );

    return (
        <aside className="user-profile-sidebar">
            <h2>Profile</h2>
            <div className="user-profile-info">
                {isEditing ? renderEditView() : renderDefaultView()}
            </div>
        </aside>
    );
}

export default UserProfile;
