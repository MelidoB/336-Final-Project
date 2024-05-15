import React, { useState, useEffect } from 'react';
import '../static/css/ImageDisplay.css';

function ImageDisplay({ imageId }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {

        const path = `/media?id=${imageId}`;

        setImageUrl(path);
    }, [imageId]);

    if (!imageId) {
        return <div className="image-display">No image provided.</div>;
    }

    return (
        <div className="image-display">
            <img src={imageUrl} alt="Uploaded" onError={(e) => e.target.style.display = 'none'} />
        </div>
    );
}

export default ImageDisplay;
