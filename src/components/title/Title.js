import React from 'react';
import './Title.css';
export default function Title({label, className}) {
    return(
        <div className={className}>{label}</div>
    )
}