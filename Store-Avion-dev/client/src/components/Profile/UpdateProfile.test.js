import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UpdateProfile from './UpdateProfile'
import Store from '../../Redux/store'

describe('UpdateProfile component', () => {
  it('renders form elements', () => {
    const setFormStatusMock = jest.fn()
    const handleButtonClickMock = jest.fn()

    const { getByLabelText, getByText } = render(
      <Store>
        <UpdateProfile
          setFormStatus={setFormStatusMock}
          handleButtonClick={handleButtonClickMock}
        />
      </Store>,
    )

    expect(getByLabelText('Choose file')).toBeInTheDocument()
    expect(getByText('First name')).toBeInTheDocument()
    expect(getByText('Last name')).toBeInTheDocument()
    expect(getByText('Login')).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
    expect(getByText('Save')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const setFormStatusMock = jest.fn()
    const handleButtonClickMock = jest.fn()

    const { getByLabelText, getByText } = render(
      <Store>
        <UpdateProfile
          setFormStatus={setFormStatusMock}
          handleButtonClick={handleButtonClickMock}
        />
      </Store>,
    )

    const imgInput = getByLabelText('Choose file')
    const firstNameInput = screen.getByTestId('first-name-input')
    const lastNameInput = screen.getByTestId('last-name-input')
    const loginInput = screen.getByTestId('login-input')
    const emailInput = screen.getByTestId('email-input')
    const saveButton = getByText('Save')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(loginInput, { target: { value: 'johndoe' } })
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } })

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(handleButtonClickMock).toHaveBeenCalled()
    })
  })
})
