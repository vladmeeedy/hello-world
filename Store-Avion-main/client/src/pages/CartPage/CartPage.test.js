import React from 'react'
import { render } from '@testing-library/react'
import Cart from './index'
import OrderForm from '../../components/OrderForm'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  }
})

const mockStore = configureStore()
const store = mockStore({
  store: {
    cart: {
      cart: [],
    },
    user: {
      status: false,
    },
    products: {
      data: [],
    },
  },
})

describe('Cart Component', () => {
  it('renders without crashing', () => {
    const wrapper = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders and getByText Your cart is empty', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    )

    expect(getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('renders OrderForm component', () => {
    const wrapper = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    )
    expect(wrapper.findByText(OrderForm))
  })
})
