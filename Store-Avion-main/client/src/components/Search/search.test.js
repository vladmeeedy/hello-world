// search.test.js
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Search from './search.js'

describe('Search', () => {
  it('should render the search box', () => {
    render(<Search />)
    const searchBox = screen.getByTestId('search-box')
    expect(searchBox).toBeInTheDocument()
  })

  it('should render search results when user types in the search box', async () => {
    render(<Search />)
    const searchBox = screen.getByTestId('search-box')
    fireEvent.change(searchBox, { target: { value: 'shoes' } })
    // Now look for the search results container by class
    const searchResultsContainer = await screen.findByTestId(
      'search-list-container',
    )
    expect(searchResultsContainer).toBeInTheDocument()
  })
})
