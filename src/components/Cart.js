import React from 'react'
import { connect } from 'react-redux'

import { pay, removeFromCart } from '../actions'
import { getPrice } from './Base'

const mapDispatchToProps = dispatch => {
  return {
    getPrice,
    getTotal: (items) => items.reduce((result, pizza) => result + getPrice(pizza), 0),
    payDispatch: (cart) => {
      dispatch(pay(cart))
    },
    removeFromCartDispatch: (index) => {
      dispatch(removeFromCart(index))
    }
  }
}

const Cart = ({
  cart,
  payDispatch,
  removeFromCartDispatch,
  getPrice,
  getTotal
}) => {
  if (cart.paid) {
    return (
      <h1>
        Your order has been placed for some pizza yo!
      </h1>
    )
  }

  const { items } = cart

  return items && items.length ? (
    <div className="content">
      <h1>Cart</h1>
      <div className="ui celled list">
        {items.map((item, index) => {
          return (
            <div className="item" key={item.name + index}>
              {item.name} pizza
              <div className="description">
                {item.toppings &&
                  item.toppings
                    .filter(el => el.defaultSelected)
                    .map(({ topping }) => <div key={topping.name}><small>${getPrice(item).toFixed(2)}</small> {topping.name}</div>)}
                <div>
                  <button
                  className="ui button negative"
                  onClick={() => removeFromCartDispatch(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <h4>
        Total: ${getTotal(items).toFixed(2)}
        </h4>
        {items.length &&
          <button
            className="ui button primary"
            onClick={() => payDispatch(cart)}
          >
            Checkout
          </button>
        }
      </div>
    </div>
  ) : null
}

// Add proptype validation

export default connect(null, mapDispatchToProps)(Cart)
