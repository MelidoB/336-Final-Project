import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from "../../static/clean_touch_companyData.json";  // Assuming data is structured as shown
import CleanTouchHeader from './Header';
import CleanTouchFooter from './Footer';

function EachCompanyPage({ companyInfo }) {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
            <CleanTouchHeader />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row py-8">
                <div className="md:flex-1 px-4">
                    <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                        <img src={companyInfo["Image"]} alt={companyInfo["Company Name"]} className="w-full h-full object-cover"/>
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{companyInfo["Company Name"]}</h2>
                    <h3 className="text-xl mt-4 mb-2 font-semibold">{companyInfo["Offer Title"]}</h3>
                    <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        <p>Price: <span className="font-semibold">{companyInfo["Price"]}</span></p>
                        <p>Address: <span className="font-semibold">{companyInfo["Company Address"]}</span></p>
                        <p>Rating: <span className="font-semibold">{companyInfo["Offer Rating"]} / 5</span></p>
                    </div>
                    <a href={companyInfo["Offer Link"]} target="_blank" rel="noopener noreferrer" className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700 block text-center">View Offer</a>
                </div>
            </div>
            <CleanTouchFooter />
        </div>
    );
}




function IndividualCompanyPage() {
    const { companyName } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("companyName");
    useEffect(() => {
        const selectedCompany = data.find(item => item["Company Name"].toLowerCase() === companyName.replace(/%20/g, ' ').toLowerCase());
        setCompany(selectedCompany);
        setLoading(false);
    }, [companyName]);  // Depend on companyName to re-run this effect

    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        return <div>Company not found.</div>;
    }

    return (
        <EachCompanyPage companyInfo={company} />
    );
}

export default IndividualCompanyPage;
