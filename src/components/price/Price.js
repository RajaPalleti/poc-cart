import React from 'react';
export default function Price({price}) {
    return(
        <div className="prices-left">
            <span className="item-price-display">${price.display}</span>
            <span className="item-price-actual">${price.actual}</span>
        </div>
    )
}