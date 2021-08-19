import React from 'react';
export default function Image({className, src}) {
    return(
        <div className={className}>
            <img src={src} alt="" />
        </div>
    )
}