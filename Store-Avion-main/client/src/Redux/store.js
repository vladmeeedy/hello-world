import React from 'react'
import { Provider } from 'react-redux'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk'

import productsReducer from './reducers/productsReducers.js'
import categoriesReducer from './reducers/categoriesReducers.js'
import userReducers from './reducers/userReducers'
import cartReducer from './reducers/cartReducer'
import FilterReducers from './reducers/FilterReducers.js'
import wishlistReducers from './reducers/wishlistReducers.js'

const storeReducers = combineReducers({
  products: productsReducer,
  user: userReducers,
  cart: cartReducer,
  wishlist: wishlistReducers,
})

const persistedReducers = persistReducer(
  { key: 'root', storage },
  storeReducers,
)

const store = configureStore({
  reducer: {
    store: persistedReducers,
    filters: FilterReducers,
    categories: categoriesReducer,
  },
  middleware: [thunk],
})

const persistedStore = persistStore(store)

export default function Store(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}

Store.propTypes = {
  children: PropTypes.node,
}
