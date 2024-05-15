import React from 'react';

function ServiceDetail({ service }) {
    // service contains details about the selected service

    return (
        <div className="service-detail">
            <h3>{service.name}</h3>
            <p>{service.description}</p>

        </div>
    );
}

export default ServiceDetail;
