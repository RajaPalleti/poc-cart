import React from 'react';
import {shopContext} from '../../App'
import './Button.css'
export default function Button({className, size, label, onClick, item}) {
    return(
        <shopContext.Consumer>
            {
                (value)=>(<button size={size} className={className} onClick={()=> value.addItem(item)}>{label}</button>)
            }
            
        </shopContext.Consumer>
    )
}