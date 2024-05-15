// components/MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/MainPage.css';

function MainPage() {
  return (
    <div className="main-container">
      <h1>Welcome to Clean Repair</h1>
      <p>Choose a service to get started:</p>
      <div className="links">
        <Link to="/repair_wave" className="button-link">Repair Wave</Link>
        <Link to="/clean_touch" className="button-link">Clean Touch</Link>
      </div>
    </div>
  );
}

export default MainPage;
