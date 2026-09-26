import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router';
import userEvent from '@testing-library/user-event';
import Cart from './Cart';

const mockCart = [
  {
    product: { id: 1, title: 'Mens Cotton Jacket', price: 55.99 },
    quantity: 1,
  },
  {
    product: { id: 2, title: 'Mens Casual Slim Fit', price: 15.99 },
    quantity: 2,
  },
];

const setupCartJSX = (cart = mockCart) => {
  const TestWrapper = () => (
    <Outlet
      context={{
        cart,
        handleUpdateQuantity: vi.fn(),
        handleRemoveItem: vi.fn(),
      }}
    />
  );

  const router = createMemoryRouter([
    {
      path: '/',
      element: <TestWrapper />,
      children: [{ index: true, element: <Cart /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

describe('Cart', () => {
  it('should display the correct number of products in the cart', () => {
    render(setupCartJSX());
    const titles = screen.getAllByRole('heading', { level: 2 });

    expect(titles.length).toEqual(mockCart.length);
  });

  it('should display correct total price', () => {
    render(setupCartJSX());
    const totalPrice = screen.getByText('Total: $87.97');

    expect(totalPrice).toBeInTheDocument();
  });

  it('should display "Your cart is currently empty" if the cart is empty', () => {
    render(setupCartJSX([]));
    const empty = screen.getByText('Your cart is currently empty');
    const shopLink = screen.getByRole('link', {
      name: 'Continue shopping',
    });

    expect(empty).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
  });

  it('should navigate to shop page when "Continue shopping" button is clicked', async () => {
    const TestWrapper = () => (
      <Outlet
        context={{
          cart: [],
          handleUpdateQuantity: vi.fn(),
          handleRemoveItem: vi.fn(),
        }}
      />
    );

    const router = createMemoryRouter([
      {
        path: '/',
        element: <TestWrapper />,
        children: [
          { index: true, element: <Cart /> },
          { path: 'shop', element: <h1>Shop</h1> },
        ],
      },
    ]);

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    const shopLink = screen.getByRole('link', {
      name: 'Continue shopping',
    });

    await user.click(shopLink);

    expect(router.state.location.pathname).toBe('/shop');
  });
});
