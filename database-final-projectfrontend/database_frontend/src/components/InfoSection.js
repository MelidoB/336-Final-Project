import React from 'react';
import '../static/css/InfoSection.css';

import info1 from '../static/images/info11.png';
import info2 from '../static/images/info22.png';
import info3 from '../static/images/info33.png';

function InfoSection() {
    return (
        <section className="info-section" id="what-is-repairwave">
            <h2>What is RepairWave?</h2>
            <p>Find and compare top local repair shops, check estimated costs of repairs, and book services anytime, anywhere.</p>
            <div className="info-points">
                <div className="info-point">
                    <div className="info-point-number">1</div>
                    <p>Search and compare repair solutions for your tech based on price, expertise, and user reviews.</p>
                    <img src={info1} alt="Search and Compare" className="info-point-icon" />
                </div>
                <div className="info-point">
                    <div className="info-point-number">2</div>
                    <p>Instantly book an appointment with your chosen repair shop with just a few clicks.</p>
                    <img src={info2} alt="Book Appointment" className="info-point-icon" />
                </div>
                <div className="info-point">
                    <div className="info-point-number">3</div>
                    <p>Manage your bookings, payments, and leave reviews all in one user-friendly platform.</p>
                    <img src={info3} alt="Manage Bookings" className="info-point-icon" />
                </div>
            </div>
        </section>
    );
}

export default InfoSection;
