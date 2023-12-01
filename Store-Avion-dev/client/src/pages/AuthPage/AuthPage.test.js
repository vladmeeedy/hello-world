import React from 'react'
import AuthPage from './AuthPage'
import { useDispatch, useSelector } from 'react-redux'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))
describe('testing AuthPage', () => {
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

  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>,
    )
  })
  it('renders without errors', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
