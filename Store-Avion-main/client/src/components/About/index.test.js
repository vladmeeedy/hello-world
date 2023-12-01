import React from 'react'
import { render } from '@testing-library/react'
import About from './index'

window.scrollTo = jest.fn()

afterEach(() => {
  window.scrollTo.mockClear()
})

test('About component renders correctly and scrolls to top', () => {
  const { getByText, getAllByAltText } = render(<About />)

  const headerElement = getByText(
    'A brand built on the love of craftmanship, quality and outstanding customer service',
  )
  expect(headerElement).toBeInTheDocument()

  const aboutImages = getAllByAltText('about')
  expect(aboutImages).toHaveLength(2)

  expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
})
