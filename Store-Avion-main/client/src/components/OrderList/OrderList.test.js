import React, { useState as useStateMock } from 'react'
import axios from 'axios'
import { act, render, waitFor } from '@testing-library/react'
import OrderList from './index'
import { HOST } from '../Token'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

jest.mock('../OrderItem/index')

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

describe('OrdersList', () => {
  it('should render a list of orders', async () => {
    axios.get.mockResolvedValue({ data: orders })

    await act(async () => {
      render(
        <MemoryRouter>
          <OrderList />
        </MemoryRouter>,
      )
    })
  })

  it('should fetch orders from the API', async () => {
    axios.get.mockResolvedValue({ data: orders })

    const result = await axios.get(HOST + '/orders')

    expect(result.data).toEqual(orders)
  })
})
