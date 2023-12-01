import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Toast from './index'

describe('Toast component', () => {
  test('renders with default props', () => {
    const { getByText } = render(<Toast message="Test Message" />)
    expect(getByText('Test Message')).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn()
    const { getByTestId } = render(
      <Toast message="Test Message" onClose={onCloseMock} />,
    )

    fireEvent.click(getByTestId('btn-close'))

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test('triggers animation and calls onClose after the specified duration', async () => {
    jest.useFakeTimers()
    const onCloseMock = jest.fn()
    const { getByTestId } = render(
      <Toast message="Test Message" duration={3000} onClose={onCloseMock} />,
    )

    fireEvent.click(getByTestId('btn-close'))

    jest.runAllTimers()

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })
  })
})
