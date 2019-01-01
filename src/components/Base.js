import React from 'react'
import { gql, graphql } from 'react-apollo'
import { connect } from 'react-redux'

import Pizza from './Pizza'
import Cart from './Cart'
import Toppings from './Toppings'

export const getPrice = pizza => {
  if (!pizza.toppings || !Array.isArray(pizza.toppings)) {
    return pizza.basePrice
  }
  return (
    pizza.basePrice +
    pizza.toppings.reduce((result, el) => (el.defaultSelected ? result + el.topping.price : result), 0)
  )
}

const pizzaInfo = gql`
  query {
    pizzaSizes {
      name
      maxToppings
      basePrice
      toppings {
        defaultSelected 
        topping {
          name
          price
        }
      } 
    }
  }`

const mapStateToProps = ({ cart, pizza }) => {
  return {
    pizza,
    cart
  }
}

const Base = ({
  cart,
  pizza,
  data: { loading, pizzaSizes },
}) => {

  return !loading ? (
    <div className="content">
      <h1>Waldo's Pizza House</h1>
      <Pizza sizes={pizzaSizes} />
      { pizza &&
        <Toppings pizza={pizza} />
      }
      <Cart cart={cart} />
    </div>
  ) : <h1>Firing up the oven...</h1>
}

//Proptype validation 

export default graphql(pizzaInfo)(connect(mapStateToProps, null)(Base))
