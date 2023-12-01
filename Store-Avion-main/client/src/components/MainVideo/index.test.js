import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainVideo from './index'

/* eslint-env jest */

describe('MainVideo', () => {
  it('renders text and button', () => {
    const { getByText, getByRole } = render(
      <Router>
        <MainVideo />
      </Router>,
    )

    expect(
      getByText(/Luxury homeware for people[\s\S]*timeless design quality/),
    ).toBeInTheDocument()
    expect(
      getByText(
        'With our new collection, view over 400 bespoke pieces from homeware through to furniture today',
      ),
    ).toBeInTheDocument()
    expect(
      getByText('Shop the new Autumn 2023 collection today'),
    ).toBeInTheDocument()
    expect(getByRole('button', { name: 'View collection' })).toBeInTheDocument()
  })

  it('renders Video', () => {
    const { getByTitle } = render(
      <Router>
        <MainVideo />
      </Router>,
    )

    expect(getByTitle('Main video')).toBeInTheDocument()
  })

  it('has correct title for Video', () => {
    const { getByTitle } = render(
      <Router>
        <MainVideo />
      </Router>,
    )

    const video = getByTitle('Main video')
    expect(video).toHaveAttribute('title', 'Main video')
  })

  it('has correct link', () => {
    const { getByRole } = render(
      <Router>
        <MainVideo />
      </Router>,
    )

    const link = getByRole('link', { name: 'View collection' })
    expect(link).toHaveAttribute('href', '/All-products/')
  })
})
