import React from 'react';

function ShopList({ shops, onSelectShop }) {


    return (
        <div className="shop-list">
            {shops.map((shop, index) => (
                <div key={index} className="shop-item" onClick={() => onSelectShop(shop)}>
                    <h3>{shop.name}</h3>
                    <p>{shop.description}</p>

                </div>
            ))}
        </div>
    );
}

export default ShopList;
