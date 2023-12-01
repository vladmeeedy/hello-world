import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import FavoriteItem from './index.js'
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

describe('testing FavoriteItem component', () => {
  const dispatchMock = jest.fn()
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock)
    useSelector.mockImplementation((selector) =>
      selector({
        store: {
          user: {
            status: true,
          },
        },
      }),
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockProps = {
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
  }

  it('renders the wishlist item', () => {
    render(
      <MemoryRouter>
        <FavoriteItem product={mockProps} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Plate')).toBeInTheDocument()
    expect(
      screen.getByText(
        'This ocean-blue, glazed plate, with golden-brown details, turns every meal into pure joy. Decorate your table with clean classic shapes and a strong crafted look. A timeless feel with a unique design.',
      ),
    ).toBeInTheDocument()
  })
  it('delete item from wishlist', () => {
    render(
      <MemoryRouter>
        <FavoriteItem product={mockProps} />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByTestId('close-icon'))
    expect(dispatchMock).toHaveBeenCalledTimes(1)
  })
})
