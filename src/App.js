import React from 'react';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';

import CartReducer from './reducers/CartReducer';
import PizzaReducer from './reducers/PizzaReducer';

import Base from './components/Base';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://cors-anywhere.herokuapp.com/https://core-graphql.dev.waldo.photos/pizza'
  })
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    pizza: PizzaReducer,
    cart: CartReducer
  }),
  {},
  composeEnhancers(applyMiddleware(client.middleware()))
)

const App = () => (
  <ApolloProvider store={store} client={client}>
    <main className="ui container">
      <Base />
    </main>
  </ApolloProvider>
)

export default App
