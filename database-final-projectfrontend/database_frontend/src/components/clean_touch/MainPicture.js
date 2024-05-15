import React from 'react';
import MySVG from '../../static/images/clean_touch/homepage.svg'; // Ensure this path is correct

function MainPicture() {
    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '', margin: '0' }}>
                <img src={MySVG} alt="Clean Touch Car Wash" style={{ width: '100%', height: '100vh' }} /> {/* Increase size */}
                <div className="text-container" style={{
                    position: 'absolute', bottom: '60%', left: '15vw', transform: 'translateY(50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '10px', borderRadius: '10px'
                }}>
                    <h2 style={{ color: '#fdd835' }}>Experience a Fresh Way to Get Your Car Cleaned</h2> {/* Yellow Color */}
                    <p style={{ color: 'white' }}>Browse our services to find the perfect car wash for your needs.</p>
                    <a href="/clean_touch/search" className="btn" style={{ backgroundColor: '#0057b7', color: 'white', marginTop: '10px' }}>Explore Services</a> {/* Blue Button */}
                </div>
            </div>
        </div>
    );
  }
  
  
  
  
  

export default MainPicture;
