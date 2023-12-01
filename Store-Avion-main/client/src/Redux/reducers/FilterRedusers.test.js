import { configureStore } from '@reduxjs/toolkit'

import reducer, {
  toggleCategory,
  togglePrice,
  toggleBrand,
  toggleItems,
  toggleAddItems,
  fetchFilter,
} from './FilterReducers'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

describe('Filter Reducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filtersAllProducts: reducer,
      },
    })
  })

  it('should toggle a category', () => {
    store.dispatch(toggleCategory('Plant pots'))
    const state = store.getState().filtersAllProducts.categories
    expect(state['Plant pots']).toBe(true)
  })

  it('should toggle a price', () => {
    store.dispatch(togglePrice('0-50'))
    const state = store.getState().filtersAllProducts.prices
    expect(state['0-50']).toBe(true)
  })

  it('should toggle a brand', () => {
    store.dispatch(toggleBrand('Sinsay'))
    const state = store.getState().filtersAllProducts.brands
    expect(state['Sinsay']).toBe(true)
  })

  it('should set the number of items', () => {
    store.dispatch(toggleItems(10))
    const state = store.getState().filtersAllProducts.items
    expect(state).toBe(10)
  })

  it('should set the number of additional items', () => {
    store.dispatch(toggleAddItems(5))
    const state = store.getState().filtersAllProducts.addItems
    expect(state).toBe(5)
  })

  it('should update state on successful data fetch', () => {
    const fakeData = [{}]
    const action = {
      type: fetchFilter.fulfilled.type,
      payload: fakeData,
    }
    store.dispatch(action)
    const state = store.getState().filtersAllProducts
    expect(state.status).toBe('succeeded')
    expect(state.data).toEqual(fakeData)
  })
})
