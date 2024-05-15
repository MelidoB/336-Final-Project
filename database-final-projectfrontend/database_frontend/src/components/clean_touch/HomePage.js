import React from 'react';
import MainPicture from './MainPicture';
import CleanTouchCategoryList from './CategoryList';
import CleanTouchHeader from './Header';
import CleanTouchFooter from './Footer';
import '../../static/css/clean_touch/HomePage.css';

function CleanTouchHomePage() {
    
    return (
        <div className="clean_touch-home-page">

            <CleanTouchHeader />
            {/* Add the empty div for white space */}
            <div className="white-space"></div>
            <MainPicture className="clean_touch-main-picture"/>
            <div className="white-space"></div>
            <div className="white-space"></div>
            <div className="white-space"></div>
            <div className="clean_touch-category-section">
                <h2>Popular dealers near you</h2>
                <CleanTouchCategoryList />
            </div>
            <div className="white-space"></div>
            <div className="white-space"></div>

            <CleanTouchFooter />
        </div>
    );
}

export default CleanTouchHomePage;
