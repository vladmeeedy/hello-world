import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getProducts from '../api/index.js'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await getProducts()
    return response
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default productsSlice.reducer
