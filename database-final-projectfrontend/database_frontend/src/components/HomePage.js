
import React from 'react';
import Header from './Header';
import MainSearchBar from './MainSearchBar';
import CategoryList from './CategoryList';
import InfoSection from './InfoSection';
import Footer from './Footer';
import '../static/css/HomePage.css';

function HomePage() {
    const handleSearch = (searchTerm, location) => {
        console.log(`Searching for: ${searchTerm} in ${location}`);
    };

    return (
        <div className="home-page">
            <Header />
            <div className="search-section">
                <MainSearchBar onSearch={handleSearch} />
            </div>
            <div className="category-section">
                <h2>Popular Repairs</h2>
                <CategoryList />
            </div>
            <InfoSection />
            <Footer />
        </div>
    );
}

export default HomePage;
