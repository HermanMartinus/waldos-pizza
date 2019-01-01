import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { getPrice } from './Base';

import {
  selectTopping,
  addToCart,
} from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    selectToppingDispatch: ({ pizza, topping }) => {
      dispatch(selectTopping({ pizza, topping }))
    },
    addToCartDispatch: pizza => {
      dispatch(addToCart(pizza))
    }
  }
}

const Toppings = ({
  pizza,
  selectToppingDispatch,
  addToCartDispatch
}) => {
  const { name, toppings, maxToppings } = pizza

  const selectedToppings = toppings.reduce(
    (result, el) => (el.defaultSelected ? result + 1 : result),
    0
  )

  return (
    <div>
      <h2>Toppings for your {name} pizza</h2>
      <div className="content">
        <div className="ui celled list">
          {toppings.map(el => {
            const { topping, defaultSelected } = el;
            
            return (
              <div key={el.topping.name} className="item">
                <label key={el.topping.name}>
                  <input
                    className='ui checkbox'
                    onChange={() => selectToppingDispatch({ pizza, topping })}
                    disabled={maxToppings === selectedToppings ? !defaultSelected : false}
                    checked={defaultSelected}
                    type='checkbox'
                  />
                  {topping.name} {el.added} {topping.price}$
                </label>
              </div>
            )
          })}
        </div>
        <div className="description">
          {selectedToppings} of {maxToppings || toppings.length} toppings
        </div>
        <div>
          <h4>Price: ${getPrice(pizza).toFixed(2)}</h4>
          <button
            className="ui button primary"
            onClick={() => addToCartDispatch(pizza)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Toppings);