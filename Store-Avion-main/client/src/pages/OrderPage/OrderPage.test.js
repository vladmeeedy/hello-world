import React from 'react'
import { act, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import OrderPage from '../../components/OrderList'
import OrderList from '../../components/OrderList'

jest.mock('axios')

jest.mock('../../components/OrderItem/index')

const orders = [
  {
    _id: 1,
    name: 'Order 1',
    price: 100,
  },
  {
    _id: 2,
    name: 'Order 2',
    price: 200,
  },
]

describe('OrdersPage', () => {
  it('should render a list of orders', async () => {
    axios.get.mockResolvedValue({ data: orders })

    await act(async () => {
      render(
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>,
      )
    })
  })
  it('renders without errors', async () => {
    axios.get.mockResolvedValue({ data: orders })
    let fragment

    await act(async () => {
      const { asFragment } = render(
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>,
      )
      fragment = asFragment
    })
    expect(fragment()).toMatchSnapshot()
  })
})
