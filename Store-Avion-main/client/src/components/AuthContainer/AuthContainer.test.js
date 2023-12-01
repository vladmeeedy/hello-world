import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import AuthContainer from './index.js'
import { MemoryRouter } from 'react-router-dom'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))
describe('testing AuthContainer component', () => {
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
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AuthContainer />{' '}
      </MemoryRouter>,
    )
  })
  it('toggles between Sign in and Register forms', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AuthContainer />{' '}
      </MemoryRouter>,
    )

    expect(getByText('Sign in')).toBeInTheDocument()
    expect(getByText('Register')).toBeInTheDocument()

    fireEvent.click(getByText('Register'))
    expect(getByText('Register')).toBeInTheDocument()

    fireEvent.click(getByText('Sign in'))
    expect(getByText('Sign in')).toBeInTheDocument()
  })
  it('displays Sign in form initially', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AuthContainer />{' '}
      </MemoryRouter>,
    )
    expect(getByText('Sign in')).toBeInTheDocument()
    expect(getByText('Register')).toBeInTheDocument()
    expect(getByText('My account')).toBeInTheDocument()
  })
})
