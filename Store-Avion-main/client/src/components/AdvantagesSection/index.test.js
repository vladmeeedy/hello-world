import React from 'react'
import { render } from '@testing-library/react'
import Advantages from './index'

test('Advantages component ', () => {
  const { getByText, getAllByAltText } = render(<Advantages />)

  const headerElement = getByText('What makes our brand different')
  expect(headerElement).toBeInTheDocument()

  const advantageImages = getAllByAltText('advantage')
  expect(advantageImages).toHaveLength(4)
})
