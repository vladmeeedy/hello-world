import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import apiWishlist, { deleteFromList } from '../api/apiWishlist'

export const initialState = {
  wishlist: [],
  status: 'idle',
  error: null,
}
export const fetchWishlist = createAsyncThunk(
  'wishlistReducer/fetchWishlist',
  async () => {
    const response = await api('wishlist')

    if (response === null) {
      return
    }
    return response.products
  },
)

export const addToWishlist = createAsyncThunk(
  'wishlistReducer/addToWishlist',
  async (id) => {
    const response = await apiWishlist('wishlist/' + id)
    return response
  },
)
export const removeFromWishlist = createAsyncThunk(
  'wishlistReducer/addToWishlist',
  async (id) => {
    const response = await deleteFromList('wishlist/' + id)
    return response
  },
)
const wishlistReducer = createSlice({
  name: 'wishlistReducer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.wishlist = action.payload
        } else {
          state.wishlist = []
        }
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.wishlist = action.payload.products
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default wishlistReducer.reducer
