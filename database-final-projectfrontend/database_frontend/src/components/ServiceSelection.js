import React from 'react';

function ServiceSelection({ onSelectService }) {
    const services = ["Mobile Repair", "Computer Repair", "Tablet Repair"];

    return (
        <div className="service-selection">
            {services.map((service, index) => (
                <button key={index} onClick={() => onSelectService(service)}>
                    {service}
                </button>
            ))}
        </div>
    );
}

export default ServiceSelection;
