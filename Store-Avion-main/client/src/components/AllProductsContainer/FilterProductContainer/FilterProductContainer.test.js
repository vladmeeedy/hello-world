import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'

import FilterProductContainer from './index'

const mockStore = configureStore([])
const initialState = {
  filters: {
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
    },
  },
}

const store = mockStore(initialState)

describe('FilterProductContainer', () => {
  it('renders the component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FilterProductContainer />
        </MemoryRouter>
      </Provider>,
    )

    expect(getByText('Categories')).toBeInTheDocument()
  })

  it('handles category change', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FilterProductContainer />
        </MemoryRouter>
      </Provider>,
    )

    const categoryLabel = getByText('Plant pots')
    fireEvent.click(categoryLabel)
  })

  it('handles brand change', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FilterProductContainer />
        </MemoryRouter>
      </Provider>,
    )

    const brandLabel = getByText('Sinsay')
    fireEvent.click(brandLabel)
  })

  it('handles price change', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FilterProductContainer />
        </MemoryRouter>
      </Provider>,
    )

    const priceLabel = getByText('0-50')
    fireEvent.click(priceLabel)
  })

  it('all checkbox in document', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FilterProductContainer />
        </MemoryRouter>
      </Provider>,
    )

    const checkboxes = getAllByRole('checkbox')
    checkboxes.forEach((checkbox) => expect(checkbox).toBeInTheDocument())
  })
})
