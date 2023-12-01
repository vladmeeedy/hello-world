import React from 'react'
import { render } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import NavContainer from './index.js'
import { MemoryRouter } from 'react-router-dom'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

describe('testing NavContainer component', () => {
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
        <NavContainer isMenuHidden={false} />
      </MemoryRouter>,
    )
  })

  it('check PropTypes', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <MemoryRouter>
        <NavContainer />
      </MemoryRouter>,
    )
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
  it('display categories', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavContainer isMenuHidden={true} />
      </MemoryRouter>,
    )
    expect(getByText('Category 1')).toBeInTheDocument()
    expect(getByText('Category 2')).toBeInTheDocument()
  })
})
