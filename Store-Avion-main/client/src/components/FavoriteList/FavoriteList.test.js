import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import FavoriteList from './index.js'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

describe('testing FavoriteList component', () => {
  const dispatchMock = jest.fn()
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock)
    useSelector.mockImplementation((selector) =>
      selector({
        store: {
          user: {
            status: true,
          },
          wishlist: {
            wishlist: [
              {
                enabled: true,
                imageUrls: ['/img/crockery/4.png'],
                quantity: 100,
                _id: '65301cbc54d5c43c884d5ccc',
                name: 'Plate',
                id: 'plate',
                currentPrice: 17.99,
                previousPrice: 17.99,
                categories: 'Crockery',
                brand: 'GLADELIG',
                height: '2cm',
                width: '25cm',
                depth: '25cm',
                description:
                  'This ocean-blue, glazed plate, with golden-brown details, turns every meal into pure joy. Decorate your table with clean classic shapes and a strong crafted look. A timeless feel with a unique design.',
                date: '2023-11-12T12:23:46.741Z',
              },
              {
                enabled: true,
                imageUrls: [
                  '/img/nightstand/lixhult-cabinet-metal-anthracite.jpg',
                ],
                quantity: 97,
                _id: '65301cbc54d5c43c884d5cd8',
                name: 'Lixhult',
                id: 'lixhult',
                currentPrice: 50,
                previousPrice: 50,
                categories: 'Nightstand',
                brand: 'Ikea',
                height: '82cm',
                width: '35cm',
                depth: '35cm',
                description:
                  'Challenge the ordinary! Combine different shapes and sizes, stack and combine, with or without legs, and let loose with a palette of different colours. Have fun!',
                date: '2023-11-12T12:23:46.741Z',
              },
            ],
          },
        },
      }),
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('renders the wishlist', () => {
    render(
      <MemoryRouter>
        <FavoriteList />
      </MemoryRouter>,
    )
    expect(screen.getByText('Wishlist')).toBeInTheDocument()
    expect(screen.getByText('Plate')).toBeInTheDocument()
  })
  it('renders the empty wishlist', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        store: {
          user: {
            status: true,
          },
          wishlist: {
            wishlist: [],
          },
        },
      }),
    )

    render(
      <MemoryRouter>
        <FavoriteList />
      </MemoryRouter>,
    )

    expect(screen.getByText('Wishlist')).toBeInTheDocument()
    expect(screen.getByText("Wow, it's so empty here")).toBeInTheDocument()
  })

  it('renders wishlist when user is not logged in', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        store: {
          user: {
            status: false,
          },
          wishlist: {
            wishlist: [],
          },
        },
      }),
    )

    render(
      <MemoryRouter>
        <FavoriteList />
      </MemoryRouter>,
    )

    expect(screen.getByText('Wishlist')).toBeInTheDocument()
    expect(screen.getByText('You are not authorized.')).toBeInTheDocument()
  })
})
