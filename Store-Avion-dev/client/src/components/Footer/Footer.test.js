import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  });

  it('displays company address', () => {
    const { queryAllByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const companyAddressElements = queryAllByText(
      (content, element) =>
        content.startsWith('Avion') ||
        content.startsWith('21 New York Street') ||
        content.startsWith('New York City') ||
        content.startsWith('United States of America'),
    );

    expect(companyAddressElements.length).toBeGreaterThan(0);
  });

  it('contains menu links', () => {
    const { queryAllByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const menuLinks = [
      'Menu',
      'All products',
      'New arrivals',
      'Best sellers',
      // Add other menu items here
    ];

    menuLinks.forEach((link) => {
      const elements = queryAllByText(link);
      expect(elements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('contains categories links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(getByText('Categories')).toBeInTheDocument();
    expect(getByText('Cutlery')).toBeInTheDocument();
    expect(getByText('Nightstands')).toBeInTheDocument();
    expect(getByText('Crockery')).toBeInTheDocument();
    expect(getByText('Chairs')).toBeInTheDocument();
    expect(getByText('Tables')).toBeInTheDocument();
    expect(getByText('Ceramisc')).toBeInTheDocument();
  });

  it('contains company links', () => {
    const { queryAllByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const ourCompanyElements = queryAllByText('Our company');
    expect(ourCompanyElements).toHaveLength(2);

    expect(queryAllByText('About us')).toHaveLength(2);
    expect(queryAllByText('Privacy page')).toHaveLength(2);
    expect(queryAllByText('Vacancies')).toHaveLength(2);
    expect(queryAllByText('Contact us')).toHaveLength(2);
    expect(queryAllByText('Returns policy')).toHaveLength(2);
    expect(queryAllByText('News')).toHaveLength(1);
  })
});
