import _ from 'lodash';

export default (state = { items: [] }, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return{ ...state, paid: false, items: [...state.items, action.payload]};
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item !== state.items[action.payload])};
    case 'PAY':
      return { paid: true, items: [] };
    default:
      return state;
  }
}
