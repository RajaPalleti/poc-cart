import React from 'react';
import './Search.scss';
import { shopContext } from '../../App';
import { FaSearch } from 'react-icons/fa';
export default function Search(){
    return (
        <shopContext.Consumer>
            {
                (value)=>(

                    <div className="search">
                        <input type="search" onChange={(e)=>value.filter(e.target.value)} placeholder="Search"/>
                        <FaSearch className="search-icon"/>
                    </div>
                    
                )
            }
        </shopContext.Consumer>
    )
}