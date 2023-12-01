import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import SignInForm from './index.js'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))
describe('testing SignInForm component', () => {
  const dispatchMock = jest.fn()
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock)
    useSelector.mockImplementation((selector) =>
      selector({
        store: {
          user: {
            status: false,
          },
        },
        categories: {
          categories: [
            {
              id: 1,
              name: 'Category 1',
            },
            {
              id: 2,
              name: 'Category 2',
            },
          ],
        },
      }),
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component', () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    )
  })
  it('renders the form elements', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    )
    expect(getByPlaceholderText('Login or Email')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
    expect(getByText('Send')).toBeInTheDocument()
  })
  it('submits the form and displays success message on successful login', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    )

    axios.post.mockResolvedValue({
      data: { token: 'example_token' },
    })
    await act(async () => {
      fireEvent.change(getByPlaceholderText('Login or Email'), {
        target: { value: 'testuser@example.com' },
      })
      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'testPassword123' },
      })

      fireEvent.click(getByText('Send'))

      await new Promise((resolve) => setTimeout(resolve, 1000))
    })
  })

  it('displays error message on failed login', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    )

    axios.post.mockRejectedValue({
      response: { data: { error: 'Invalid credentials' } },
    })

    fireEvent.change(getByPlaceholderText('Login or Email'), {
      target: { value: 'testuser@example.com' },
    })
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'wrongPassword' },
    })

    fireEvent.click(getByText('Send'))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/customers/login',
        {
          loginOrEmail: 'testuser@example.com',
          password: 'wrongPassword',
        },
      )
      expect(getByText('Login failed! Invalid credentials')).toBeInTheDocument()
    })
  })
})
