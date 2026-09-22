import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from './routes';

describe('App', () => {
  it('should include 4 links in the navbar', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/home'],
    });
    render(<RouterProvider router={router} />);
    const nav = screen.getByRole('navigation');
    const links = within(nav).getAllByRole('link');

    expect(links.length).toEqual(4);
  });

  it('should navigate to Shop page when shop link is clicked', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/home'],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const shopLink = screen.getByRole('link', { name: 'Shop' });
    await user.click(shopLink);
    const shopHeading = screen.getByRole('heading', { name: 'SHOP' });

    expect(shopHeading).toBeInTheDocument();
  });

  it('should navigate to Cart page when cart link is clicked', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/home'],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const cartLink = screen.getByRole('link', { name: 'Cart' });
    await user.click(cartLink);
    const cartHeading = screen.getByRole('heading', { name: 'CART' });

    expect(cartHeading).toBeInTheDocument();
  });
});
