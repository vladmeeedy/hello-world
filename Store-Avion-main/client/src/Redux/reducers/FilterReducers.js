import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import exportedObject from '../api/api.js'

export const fetchFilter = createAsyncThunk(
  'products/fetchFilterProducts',
  async (input) => {
    const response = await exportedObject.getAllProducts(input)
    return response
  },
)

const filterReducers = createSlice({
  name: 'filtersAllProducts',
  initialState: {
    data: [],
    categories: {
      'Plant pots': false,
      Ceramics: false,
      Tables: false,
      Chairs: false,
      Crockery: false,
      Nightstand: false,
      Cutlery: false,
    },
    prices: {
      '0-50': false,
      '51-100': false,
      '101-999': false,
    },
    brands: {
      Sinsay: false,
      Reserved: false,
      JYSK: false,
      Ceramico: false,
      ArtCeramics: false,
      KitchenCeramics: false,
      CeramicCraft: false,
      Vitra: false,
      Ikea: false,
      FÄRGKLAR: false,
      'Contemporary Living': false,
      'Rustic Home Decor': false,
    },
    items: 9,
    addItems: 0,
  },
  reducers: {
    toggleCategory: (state, action) => {
      const category = action.payload
      state.categories[category] = !state.categories[category]
    },
    togglePrice: (state, action) => {
      const price = action.payload
      state.prices[price] = !state.prices[price]
    },
    toggleBrand: (state, action) => {
      const brand = action.payload
      state.brands[brand] = !state.brands[brand]
    },
    toggleItems: (state, action) => {
      const items = action.payload
      state.items = items
    },
    toggleAddItems: (state, action) => {
      const addItems = action.payload
      state.addItems = addItems
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilter.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchFilter.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const {
  toggleCategory,
  togglePrice,
  toggleBrand,
  toggleItems,
  toggleAddItems,
} = filterReducers.actions

export default filterReducers.reducer
