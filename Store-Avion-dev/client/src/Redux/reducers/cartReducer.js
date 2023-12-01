import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  cartStatus: false,
}

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemToAdd = action.payload

      const existingItem = state.cart.find(
        (item) => item.product === itemToAdd.product,
      )
      if (existingItem) {
        existingItem.cartQuantity += itemToAdd.cartQuantity
      } else {
        state.cart.push(itemToAdd)
      }
    },
    removeFromCart(state, action) {
      const idToRemove = action.payload
      const itemIndex = state.cart.findIndex(
        (item) => item.product === idToRemove,
      )
      if (itemIndex !== -1) {
        state.cart.splice(itemIndex, 1)
      }
    },
    incrementQuantity(state, action) {
      const id = action.payload

      const product = state.cart.find((item) => item.product === id)
      if (product) {
        product.cartQuantity += 1
      }
    },
    dicrementQuantity(state, action) {
      const id = action.payload

      const product = state.cart.find((item) => item.product === id)
      if (product && product.cartQuantity > 1) {
        product.cartQuantity = product.cartQuantity - 1
      }
    },
    clearCart(state, action) {
      state.cart = []
    },
    addArrayToCart(state, action) {
      const itemsToAdd = Array.isArray(action.payload) ? action.payload : []
      if (!Array.isArray(itemsToAdd)) {
        return
      }
      const modifiedArray = itemsToAdd.map((item) => ({
        product: item.product._id,
        cartQuantity: item.cartQuantity,
      }))

      const uniqueItemsToAdd = modifiedArray.filter(
        (itemToAdd) =>
          !state.cart.some((existingItem) => {
            return existingItem.product === itemToAdd.product
          }),
      )

      state.cart = [...state.cart, ...uniqueItemsToAdd]
    },
  },
})

export default cartReducer.reducer
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  dicrementQuantity,
  addArrayToCart,
  clearCart,
} = cartReducer.actions
