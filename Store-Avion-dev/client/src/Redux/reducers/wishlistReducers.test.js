import reducer, {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
  initialState,
} from './wishlistReducers.js'
import axios from 'axios'
import { configureStore } from '@reduxjs/toolkit'
import { HOST } from '../../components/Token'
jest.mock('axios')

describe('wishlistReducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should dispatch the correct actions for a successful API request', async () => {
    const store = configureStore({
      reducer,
      preloadedState: initialState,
    })
    const newData = [
      { id: '2', name: 'Product 2' },
      { id: '3', name: 'Product 3' },
    ]
    axios.get.mockResolvedValue({ data: { products: newData } })

    await store.dispatch(fetchWishlist())

    expect(axios.get).toHaveBeenCalledWith(HOST + '/wishlist')
  })
})
