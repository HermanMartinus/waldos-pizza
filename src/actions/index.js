export const addToCart = (pizza) => {
    return {
        payload: pizza,
        type: 'ADD_TO_CART'
    }
}

export const pay = () => {
    return {
        type: 'PAY'
    }
}

export const removeFromCart = (index) => {
    return {
        payload: index,
        type: 'REMOVE_FROM_CART'
    }
}

export const selectSize = (pizza = {}) => {
    return {
        payload: pizza,
        type: 'SELECT_SIZE'
    }
}

export const selectTopping = ({ pizza, topping }) => {
    return {
        payload: { pizza, topping },
        type: 'SELECT_TOPPING'
    }
}
