import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import UpdatePassword from './UpdatePassword'

jest.mock('axios')

describe('UpdatePassword component', () => {
  it('submits form with valid data', async () => {
    const setFormStatusMock = jest.fn()
    const handleButtonClickMock = jest.fn()
    const resetFormMock = jest.fn()

    axios.put.mockResolvedValue({ data: { password: 'newpassword' } })

    const { getByText, getByPlaceholderText } = render(
      <UpdatePassword
        setFormStatus={setFormStatusMock}
        handleButtonClick={handleButtonClickMock}
      />,
    )

    const passwordInput = screen.getByPlaceholderText('Enter current password')
    const newPasswordInput = screen.getByPlaceholderText('Enter new password')
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm new password',
    )
    const saveButton = screen.getByText('Save')

    fireEvent.change(passwordInput, { target: { value: 'oldpassword' } })
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } })

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:4000/api/customers/password',
        {
          password: 'oldpassword',
          newPassword: 'newpassword',
          updatePassword: 'newpassword',
        },
      )
      expect(setFormStatusMock).toHaveBeenCalledWith({
        type: 'success',
        message: 'newpassword',
      })
      expect(handleButtonClickMock).toHaveBeenCalled()
    })
  })
})
