import React from 'react';
import './Item.scss';
import Button from '../button/Button';
import Price from '../price/Price';
import Image from '../image/Image';
import Title from '../title/Title';
import { shopContext } from '../../App';
export default function Item({ item }) {
    return (
        <shopContext.Consumer>
            {
                (value) => (
                    <div className="item">
                        <span className="discount">{item.discount}% off</span>
                        <Image className="item-image" src={item.image} />
                        {/* <div className="item-image"><img src={item.image} alt=""/></div> */}
                        <div className="item-info">
                            <div className="item-name">
                                <Title label={item.name} />
                            </div>
                            <div className="prices">
                                <Price price={item.price} />
                                <div className="add-to-cart">
                                    <Button size="sm" className="btn btn-outline-info" label="Add to cart" item={item} />
                                    {/* onClick={() => this.addItem(item)} */}
                                </div>

                                <div className="qty">
                                    <span className="decrement" onClick={() => value.removeItem(item)}><b>-</b></span>
                                    <span><b>{item.quantity}</b></span>
                                    <span className="increment" onClick={() => value.addItem(item)}><b>+</b></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </shopContext.Consumer>
    )
}