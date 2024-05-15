import React from 'react';
import '../static/css/Footer.css';

function Footer() {
  return (
    <footer className="sticky-footer">
      <p>&copy; {new Date().getFullYear()} RepairWave Technologies</p>
    </footer>
  );
}

export default Footer;
