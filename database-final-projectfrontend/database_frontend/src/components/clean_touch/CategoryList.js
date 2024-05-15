import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../static/images/clean_touch/company/1.png';
import image2 from '../../static/images/clean_touch/company/2.webp';
import image3 from '../../static/images/clean_touch/company/3.jpg';
import image4 from '../../static/images/clean_touch/company/4.jpg';
import image5 from '../../static/images/clean_touch/company/5.jpg';
import image6 from '../../static/images/clean_touch/company/6.jpg';
import image7 from '../../static/images/clean_touch/company/7.jpg';
import image8 from '../../static/images/clean_touch/company/8.jpg';
import '../../static/css/clean_touch/CategoryList.css';

function CleanTouchCategoryList() {
  const categories = [
    { name: 'VIP Car Wash', icon: image1 },
    { name: 'Englewood Car Wash', icon: image2 },
    { name: 'Brooklyn splash', icon: image3 },
    { name: 'The Wash For Cars IV', icon: image4 },
    { name: 'Classic Car Wash NY', icon: image5 },
    { name: 'Clean Way Hand Car Wash', icon: image6 },
    { name: 'Old Greenwich Service Station', icon: image7 },
    { name: 'Billys Hand Car Wash And Detail Center', icon: image8 },
  ];

  categories.forEach(category => {
    category.linkName = "/clean_touch/company/" + category.name;
  });

  return (
    <div className="category-list-clean-touch">
      {categories.map((category, index) => (
        <div key={index} className="card">
          <Link to={category.linkName}>
            <img src={category.icon} className="card-img-top" alt={`${category.name} Icon`} />
            <div className="card-body">
              <p className="card-text">{category.name}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CleanTouchCategoryList;
