import React from 'react';
import '../../static/css/clean_touch/Footer.css';

function CleanTouchFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center text-sm py-2">
      <p>&copy; {new Date().getFullYear()} Clean Touch</p>
    </footer>
  );
}

export default CleanTouchFooter;
