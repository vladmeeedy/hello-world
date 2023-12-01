import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Modal from './index'

describe('Modal component', () => {
  it('renders the modal and handles button clicks', () => {
    const closeModal = jest.fn()
    const removeOrder = jest.fn()

    const { getByText, getByTestId } = render(
      <Modal closeModal={closeModal} removeOrder={removeOrder} />,
    )

    const headerElement = getByText('Sure you want to delete?')
    expect(headerElement).toBeInTheDocument()

    const textElement = getByText('Are you sure you want to delete this?')
    expect(textElement).toBeInTheDocument()

    const closeButton = getByTestId('btn-close')
    fireEvent.click(closeButton)
    expect(closeModal).toHaveBeenCalledTimes(1)

    const confirmButton = getByText('Yes, confirm')
    expect(confirmButton).toBeInTheDocument()
    fireEvent.click(confirmButton)
    expect(removeOrder).toHaveBeenCalledTimes(1)

    const cancelButton = getByText('No, cancel')
    expect(cancelButton).toBeInTheDocument()
    fireEvent.click(cancelButton)
    expect(closeModal).toHaveBeenCalledTimes(2)
  })
})
