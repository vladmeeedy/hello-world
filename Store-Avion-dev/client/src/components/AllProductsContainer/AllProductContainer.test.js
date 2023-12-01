import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import AllProductsContainer from './index'

const mockStore = configureStore([])

const initialState = {
  filters: {
    data: [],
    categories: {
      'Plant pots': false,
    },
    prices: {
      '0-50': false,
    },
    brands: {
      Sinsay: false,
    },
  },
}

const store = mockStore(initialState)

describe('AllProductsContainer', () => {
  it('Renders the AllProductsContainer component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AllProductsContainer />
      </Provider>,
    )

    expect(getByTestId('data-products-container')).toBeInTheDocument()
  })

  it('Simulates the "Load more" button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AllProductsContainer />
      </Provider>,
    )

    const loadMoreButton = getByText('Load more')
    fireEvent.click(loadMoreButton)
  })
})
