import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/Header.css';

function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          RepairWave Technologies
        </Link>
      </div>
      <nav>
        <a href="#what-is-repairwave">About Us</a>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}

export default Header;
