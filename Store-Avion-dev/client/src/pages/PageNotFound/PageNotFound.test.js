import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import PageNotFound from './PageNotFound'

/* eslint-env jest */

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  const push = jest.fn()
  return {
    ...originalModule,
    useNavigate: () => ({
      push,
    }),
    push,
  }
})

describe('PageNotFound', () => {
  test('renders PageNotFound component', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>,
    )

    expect(
      screen.getByText(/This page could not be found!/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /We are sorry\. But the page you are looking for is not available\./i,
      ),
    ).toBeInTheDocument()
  })

  test('renders image with correct src', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>,
    )

    const image = screen.getByAltText('Not Found Image')
    expect(image).toBeInTheDocument()
    expect(image.src).toContain('/img/baner/NotFoundPage1.png')
  })

  test('image and button have correct attributes', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>,
    )

    const image = screen.getByAltText('Not Found Image')
    expect(image).toHaveAttribute('src', '/img/baner/NotFoundPage1.png')

    const button = screen.getByText(/Back to home/i)
    expect(button).toHaveAttribute('type', 'button')
  })
})
