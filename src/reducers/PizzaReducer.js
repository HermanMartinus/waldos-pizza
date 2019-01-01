export default (state = null, action) => {
  switch (action.type) {
    case 'SELECT_SIZE':
      return action.payload;
    case 'SELECT_TOPPING':
      const { pizza, topping } = action.payload;
      if (!pizza || !topping) return state;

      const { toppings } = pizza;
      if (!toppings) return state;

      return { ...pizza, toppings: pizza.toppings.map(current => {
          if (current.topping.name === topping.name) {
            return Object.assign({ ...current }, { defaultSelected: !current.defaultSelected });
          }
          return current;
        })
      }
    default:
      return state;
  }
}
