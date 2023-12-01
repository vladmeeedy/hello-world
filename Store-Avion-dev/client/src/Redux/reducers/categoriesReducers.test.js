import reducer, { initialState, fetchCategories } from './categoriesReducers'
import axios from 'axios'
import { configureStore } from '@reduxjs/toolkit'
import { HOST } from '../../components/Token'

jest.mock('axios')

describe('categoriesReducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should dispatch the correct actions for a successful API request', async () => {
    const store = configureStore({
      reducer,
      preloadedState: initialState,
    })
    const newData = { categories: ['Category1', 'Category2'] }

    axios.get.mockResolvedValue({ data: newData })

    await store.dispatch(fetchCategories())

    expect(axios.get).toHaveBeenCalledWith(HOST + '/catalog')
  })
})
