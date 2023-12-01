import React from 'react'
import { render, screen } from '@testing-library/react'
import PrivacyPage from './PrivacyPage'
import styles from './PrivacyPage.module.scss'

// /* eslint-env jest */

describe('PrivacyPage additional tests', () => {
  beforeEach(() => {
    render(<PrivacyPage />)
  })

  test('renders all list items correctly', () => {
    const lists = {
      'Your Rights': [
        'File a complaint with the supervisory authority',
        'Request correction or deletion of personal data',
        'Restrict or refuse the processing of personal data',
        'If necessary, request a copy of your personal data',
      ],
      'Data Collection': [
        'When visiting and purchasing on our website',
        'In our stores or by phone',
        'When participating in surveys, competitions, or promotions',
        'When creating a user profile on Avion',
        'When leaving a review of our products',
      ],
      'Information We Collect': [
        'Email address',
        'Name',
        'Address',
        'Phone number',
        'Email mailbox address',
        'IP address from which you place orders',
      ],
      'Purpose of Data Processing': [
        'The necessity of fulfilling a contract of which the data subject is a party',
        'Processing is necessary for compliance with legal obligations imposed on Avion',
        'Processing is necessary for the purposes of legitimate interests pursued by Avion',
      ],
    }

    Object.entries(lists).forEach(([section, items]) => {
      items.forEach((item) => {
        const listItemElement = screen.getByText((content, element) => {
          return content.includes(item)
        })

        expect(listItemElement).toBeInTheDocument()
      })
    })
  })

  test('all style classes are applied', () => {
    const privacyContainer = screen.getByTestId('privacy-container')
    expect(privacyContainer).toHaveClass(styles.privacyContainer)

    const privacyBanner = screen.getByTestId('privacy-banner')
    expect(privacyBanner).toHaveClass(styles.privacyBanner)

    const privacyHeader = screen.getByTestId('privacy-header')
    expect(privacyHeader).toHaveClass(styles.privacyHeader)

    const privacyTexts = screen.getByTestId('privacy-texts')
    expect(privacyTexts).toHaveClass(styles.privacyTexts)

    const termsSection = screen.getByTestId('terms-section')
    expect(termsSection).toHaveClass(styles.termsSection)

    const subHeader = screen.getByTestId('sub-header')
    expect(subHeader).toHaveClass(styles.subHeader)

    const texts = screen.getAllByTestId('texts')
    texts.forEach((text) => {
      expect(text).toHaveClass(styles.texts)
    })

    const registrationTexts = screen.getByTestId('registration-texts')
    expect(registrationTexts).toHaveClass(styles.registrationTexts)

    const sectionHeaders = screen.getAllByTestId('section-header')
    sectionHeaders.forEach((header) => {
      expect(header).toHaveClass(styles.sectionHeader)
    })

    const lists = screen.getAllByTestId('list')
    lists.forEach((list) => {
      expect(list).toHaveClass(styles.list)
    })
  })

  test('renders all headers with correct text', () => {
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toBe('We care about your privacy')

    const h2s = screen.getAllByRole('heading', { level: 2 })
    expect(h2s[0].textContent).toBe('TERMS AND CONDITIONS')

    const h3s = screen.getAllByRole('heading', { level: 3 })
    expect(h3s[0].textContent).toBe('Your Rights')
    expect(h3s[1].textContent).toBe('Data Collection')
    expect(h3s[2].textContent).toBe('Information We Collect')
    expect(h3s[3].textContent).toBe('Purpose of Data Processing')
    expect(h3s[4].textContent).toBe('Use of Your Data')
    expect(h3s[5].textContent).toBe('Payment on Avion')
  })
})
