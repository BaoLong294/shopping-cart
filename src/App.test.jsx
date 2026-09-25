import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import routes from './routes';

const mockProducts = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    price: 9.99,
    description: 'The Essence Mascara Lash Princess is a popular mascara...',
    category: 'beauty',
    image: 'https://fakestoreapi.com/img/...',
  },
];

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

    expect(router.state.location.pathname).toBe('/shop');
  });

  it('should navigate to Cart page when cart link is clicked', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/home'],
    });
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const cartLink = screen.getByRole('link', { name: 'Cart' });
    await user.click(cartLink);
    expect(router.state.location.pathname).toBe('/cart');
  });

  it('should update the cart badge after adding a product twice', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      })
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ['/home'],
    });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    const shopLink = screen.getByRole('link', { name: 'Shop' });
    await user.click(shopLink);

    const addToCartButtons = await screen.findAllByRole('button', {
      name: /add to cart/i,
    });
    const firstAddToCartButton = addToCartButtons[0];
    await user.click(firstAddToCartButton);
    await user.click(firstAddToCartButton);

    const cartLink = screen.getByRole('link', { name: 'Cart' });
    const cartBadge = within(cartLink).getByText('2');
    expect(cartBadge).toBeInTheDocument();
  });
});
