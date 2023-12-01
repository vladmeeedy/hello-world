import React from 'react'
import { render, screen } from '@testing-library/react'
import ItStarted from './index.js'
import { MemoryRouter } from 'react-router-dom'

describe('testing ItStarted component', () => {
  it('renders the component', () => {
    render(
      <MemoryRouter>
        <ItStarted />
      </MemoryRouter>,
    )
    expect(screen.getByText('It started with a small idea')).toBeInTheDocument()
    expect(
      screen.getByText(
        'A global brand with local beginnings, our story begain in a small studio in South London in early 2014',
      ),
    ).toBeInTheDocument()
  })
})
