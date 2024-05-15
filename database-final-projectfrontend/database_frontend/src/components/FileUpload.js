import React, { useState } from 'react';
import '../static/css/FileUpload.css';

function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('media', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.error) {
                console.error(data.error);
            } else {
                console.log('File uploaded successfully:', data.id);

            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div className="file-upload-container">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
