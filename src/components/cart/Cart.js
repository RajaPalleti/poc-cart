import React from 'react';
import Item from '../item/Item';
import Table from '../table/Table';
import './Cart.scss';
export default function Cart({ cartList }) {
    return (
        <React.Fragment>
            {
                    cartList.length>0 ?
                <h6 className="cart-title">Cart Items</h6>:
                 <h6 className="cart-title no-items">No items found</h6>
            }
        <div className="all-items">
            <div className="cart-left">
                {
                    cartList ?
                        cartList.map((item, index) =>
                            <Item key={item.name} item={item} />
                        ) : null
                }
            </div>
            <div className="cart-right">
                {
                    cartList.length>0 ?
                        <Table selectedItems={cartList} />
                        : null
                }
                {
                    cartList.length>0 ?
                        <div className="total">
                            <h6>Total</h6>
                            <p className="total-row">
                                <span>Items
                                    <b className="item-count">
                                        {
                                            cartList ?
                                                cartList.reduce((a, c) => a + c.quantity, 0) : 0
                                        }
                                    </b>
                                </span>
                                <span><b>$
                                    {
                                        cartList ?
                                            cartList.reduce((a, c) => a + c.price.display * c.quantity, 0) : 0
                                    }</b>
                                </span>
                            </p>
                            <p className="total-row">
                                <span>Discount
                                </span>
                                <span><b>-$
                                    {
                                        cartList ?
                                            cartList.reduce((a, c) => a + ((c.discount * c.price.display) / 100) * c.quantity, 0) : 0
                                    }</b>
                                </span>
                            </p>
                            <p className="total-row">
                                <span>Type Discount
                                </span>
                                <span><b>$0</b></span>
                            </p>
                            <p className="total-row final">
                                <span>Order Total
                                </span>
                                <span><b>$
                                    {
                                        cartList ?
                                            cartList.reduce((a, c) => a + ((c.price.display - (c.discount * c.price.display) / 100)) * c.quantity, 0) : 0
                                    }</b>
                                </span>
                            </p>
                        </div>
                        : null
                }
            </div>
        </div>
        </React.Fragment>
    )
}