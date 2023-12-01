import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import OrderForm from './index'
import { useDispatch, useSelector } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))
describe('OrderForm', () => {
  const mockChangeOrderPlaced = jest.fn()
  const mockOrderPlaced = {
    status: false,
    massage:
      'The order has not been processed. Check that the entered data is correct and that you are logged in',
  }

  const dispatchMock = jest.fn()
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock)
    useSelector.mockImplementation((selector) => {
      const mockState = {
        store: {
          user: {
            data: {},
            status: false,
          },
          cart: {
            cart: [{ product: 'item1', cartQuantity: 1 }],
          },
          products: {
            data: [
              { _id: 'item1', name: 'Product 1' },
              { _id: 'item2', name: 'Product 2' },
              // Добавьте ожидаемые данные для state.products.data
            ],
          },
        },
      }

      if (selector(mockState)) {
        return selector(mockState)
      }
      return undefined
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render the form correctly', () => {
    render(
      <OrderForm
        changeOrderPlaced={mockChangeOrderPlaced}
        orderPlaced={mockOrderPlaced}
      />,
    )

    expect(
      screen.getByText('Fill the required fields to order'),
    ).toBeInTheDocument()
    expect(screen.getByText('Send')).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    render(
      <OrderForm
        changeOrderPlaced={mockChangeOrderPlaced}
        orderPlaced={mockOrderPlaced}
      />,
    )

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('First name'), {
        target: { value: 'firstname' },
      })
      fireEvent.change(screen.getByPlaceholderText('Last name'), {
        target: { value: 'lastName' },
      })
      fireEvent.change(screen.getByPlaceholderText('Email'), {
        target: { value: 'useremail@gmail.com' },
      })
      fireEvent.change(screen.getByPlaceholderText('Mobile'), {
        target: { value: '0500123456' },
      })
      fireEvent.change(screen.getByPlaceholderText('Country'), {
        target: { value: 'Ukraine' },
      })
      fireEvent.change(screen.getByPlaceholderText('City'), {
        target: { value: 'Kyiv' },
      })
      fireEvent.change(screen.getByPlaceholderText('Address'), {
        target: { value: 'Bankovskaya street' },
      })
      fireEvent.change(screen.getByPlaceholderText('Postal'), {
        target: { value: '12345' },
      })

      fireEvent.click(screen.getByText('Send'))

      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
  })
})
