import React from 'react';
import { shopContext } from '../../App';
import './Table.scss';
// import {  Form, InputGroup } from 'react-bootstrap';
export default function Table({ selectedItems, onClick }) {
  console.log('selectedItems', selectedItems);
  return (
    <shopContext.Consumer>
      {
        (value) => (
          <div>
            <table >
              <thead>
                <tr>
                  <th>Items 
                  <b className="item-count">
                    {
                      selectedItems.length>0?selectedItems.reduce((a, c)=>a+c.quantity, 0):0
                    }
                    </b>
                  </th>
                  <th >Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  selectedItems ?
                    selectedItems.map((item, ind) =>
                      <tr key={item.name}>
                        <td>
                          <div className="item-name-count">
                            <span>{item.name}</span>
                            {/* <b className="item-count">{item.quantity}</b> */}
                          </div>
                        </td>
                        <td>
                          <div className="qty">
                            <span className="decrement" onClick={() => value.removeItem(item)}><b>-</b></span>
                            <span>{item.quantity}</span>
                            <span className="increment"  onClick={() => value.addItem(item)}><b>+</b></span>
                          </div>
                          {/* <Form.Group >
                                  <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend" onClick={() => this.removeItem(item)}>-</InputGroup.Text>
                                    <Form.Control
                                      type="text"
                                      placeholder="Username"
                                      value={item.quantity}
                                      onChange={(e) => this.countChange(item, e)}
                                    />
                                    <InputGroup.Text id="inputGroupPrepend" onClick={() => this.addItem(item)}>+</InputGroup.Text>
                                  </InputGroup>
                                </Form.Group> */}
                        </td>
                        <td>${item.price.display*item.quantity}</td>
                      </tr>
                    ) : null
                }

              </tbody>
            </table>
          </div>
        )
      }
    </shopContext.Consumer>
  )
}