import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import Home from './Home.jsx';
import routes from '../../routes';

describe('Home', () => {
  it('should renders all Home page content', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const section = screen.getByRole('region');
    const heading = screen.getByRole('heading');
    const description = screen.getByText(/browse a small collection/i);
    const link = screen.getByRole('link');

    expect(section.textContent).toMatch('A little shop for everyday things');
    expect(heading.textContent).toMatch('Find your next favorite thing.');
    expect(description.textContent).toMatch(
      'Browse a small collection of useful goods, pick what you love, and add it to your cart.'
    );
    expect(link.textContent).toMatch('Explore the shop');
  });

  it('should navigate to Shop page when the link is clicked', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/home'],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const link = screen.getByRole('link', { name: /explore the shop/i });
    await user.click(link);

    expect(router.state.location.pathname).toBe('/shop');
  });
});
