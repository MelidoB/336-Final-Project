import React from 'react';

function ShopProfile({ shop }) {


    return (
        <div className="shop-profile">
            <h2>{shop.name}</h2>
            <p>{shop.description}</p>

        </div>
    );
}

export default ShopProfile;
