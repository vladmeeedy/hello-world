import cartReducer, {
  addToCart,
  removeFromCart,
  incrementQuantity,
  dicrementQuantity,
  addArrayToCart,
  clearCart,
  openCartForm,
  closeCartForm,
} from './cartReducer'

describe('cartReducer', () => {
  it('should add an item to the cart', () => {
    const initialState = { cart: [] }
    const newItem = { product: 'item1', cartQuantity: 1 }
    const nextState = cartReducer(initialState, addToCart(newItem))

    expect(nextState.cart).toEqual([newItem])
  })

  it('should remove an item from the cart', () => {
    const initialState = { cart: [{ product: 'item1', cartQuantity: 1 }] }
    const itemIdToRemove = 'item1'
    const nextState = cartReducer(initialState, removeFromCart(itemIdToRemove))

    expect(nextState.cart).toEqual([])
  })

  it('should increment the quantity of an item in the cart', () => {
    const initialState = { cart: [{ product: 'item1', cartQuantity: 1 }] }
    const itemIdToIncrement = 'item1'
    const nextState = cartReducer(
      initialState,
      incrementQuantity(itemIdToIncrement),
    )

    expect(nextState.cart[0].cartQuantity).toEqual(2)
  })

  it('should decrement the quantity of an item in the cart', () => {
    const initialState = { cart: [{ product: 'item1', cartQuantity: 2 }] }
    const itemIdToDecrement = 'item1'
    const nextState = cartReducer(
      initialState,
      dicrementQuantity(itemIdToDecrement),
    )

    expect(nextState.cart[0].cartQuantity).toEqual(1)
  })

  it('should clear the cart', () => {
    const initialState = { cart: [{ product: 'item1', cartQuantity: 1 }] }
    const nextState = cartReducer(initialState, clearCart())

    expect(nextState.cart).toEqual([])
  })

  it('should add an array of items to the cart', () => {
    const initialState = { cart: [] }
    const itemsToAdd = [
      { product: { _id: 'item1' }, cartQuantity: 1 },
      { product: { _id: 'item2' }, cartQuantity: 2 },
    ]
    const nextState = cartReducer(initialState, addArrayToCart(itemsToAdd))

    const receivedCart = nextState.cart.map((item) => ({
      product: { _id: item.product },
      cartQuantity: item.cartQuantity,
    }))

    expect(receivedCart).toEqual(expect.arrayContaining(itemsToAdd))
  })
})
