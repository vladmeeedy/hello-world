import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CartProductList from './index'

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}))

const mockProps = {
  img: 'mock-image-url',
  name: 'Product Name',
  quantity: 3,
  price: 10,
  discribe: 'Product description',
  id: 'product-id',
}

describe('CartProductList', () => {
  it('renders the component with the provided props', () => {
    const { getByText } = render(<CartProductList {...mockProps} />)

    expect(getByText('Product Name')).toBeInTheDocument()
    expect(getByText('Product description')).toBeInTheDocument()
    expect(getByText('10$')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
  })

  it('triggers the incrementQuantity and decrementQuantity actions when buttons are clicked', () => {
    const { getByText } = render(<CartProductList {...mockProps} />)

    const incrementButton = getByText('+')
    const decrementButton = getByText('-')

    fireEvent.click(incrementButton)
    fireEvent.click(decrementButton)
  })

  it('shortens the description if it is longer than 50 characters', () => {
    const longDescription =
      'A chair made for those lovely dinners with family and friends....'
    const propsWithLongDescription = { ...mockProps, discribe: longDescription }

    const { getByText } = render(
      <CartProductList {...propsWithLongDescription} />,
    )

    expect(
      getByText('A chair made for those lovely dinners with family ...'),
    ).toBeInTheDocument()
  })
})
