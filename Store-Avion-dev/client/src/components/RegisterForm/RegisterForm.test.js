import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import RegisterForm from './index.js'
import axios from 'axios'

jest.mock('axios')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

describe('testing RegisterForm component', () => {
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
    render(<RegisterForm />)
  })
  it('renders the form elements', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterForm />)
    expect(getByPlaceholderText('First name')).toBeInTheDocument()
    expect(getByPlaceholderText('Last name')).toBeInTheDocument()
    expect(getByPlaceholderText('Login')).toBeInTheDocument()
    expect(getByPlaceholderText('Email')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
    expect(getByPlaceholderText('Telephone')).toBeInTheDocument()
    expect(getByText('Send')).toBeInTheDocument()
  })

  it('submits the form', async () => {
    axios.post.mockResolvedValue({ data: { message: 'User registered' } })

    const { getByPlaceholderText, getByText } = render(<RegisterForm />)

    fireEvent.change(getByPlaceholderText('First name'), {
      target: { value: 'John' },
    })
    fireEvent.change(getByPlaceholderText('Last name'), {
      target: { value: 'DoeDoe' },
    })
    fireEvent.change(getByPlaceholderText('Login'), {
      target: { value: 'johndoe123' },
    })
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: '123456789' },
    })
    fireEvent.change(getByPlaceholderText('Repeat Password'), {
      target: { value: '123456789' },
    })
    fireEvent.change(getByPlaceholderText('Telephone'), {
      target: { value: '+380501234567' },
    })

    fireEvent.click(getByText('Send'))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/customers',
        {
          firstName: 'John',
          lastName: 'DoeDoe',
          login: 'johndoe123',
          email: 'john@example.com',
          password: '123456789',
          telephone: '+380501234567',
        },
      )
    })
  })
})
