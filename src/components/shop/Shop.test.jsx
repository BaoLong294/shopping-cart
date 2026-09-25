import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router';
import Shop from './Shop.jsx';

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

const TestWrapper = () => {
  return <Outlet context={{ handleAddToCart: vi.fn() }} />;
};

const setupShopJSX = () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    })
  );

  const router = createMemoryRouter([
    {
      path: '/',
      element: <TestWrapper />,
      children: [{ index: true, element: <Shop /> }],
    },
  ]);

  return <RouterProvider router={router} />;
};

describe('Shop', () => {
  it('should display the "Loading..." line before the data is returned from the API', () => {
    render(setupShopJSX());

    const loading = screen.queryByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  it('should display fetched products', async () => {
    render(setupShopJSX());

    const title = await screen.findByText(mockProducts[0].title);
    const price = await screen.findByText(/9.99/);
    const description = await screen.findByText(mockProducts[0].description);
    const category = await screen.findByText(mockProducts[0].category);
    const image = await screen.findByRole('img');

    const productInfos = [title, price, description, category, image];
    productInfos.forEach((info) => {
      expect(info).toBeInTheDocument();
    });

    expect(image.src).toMatch(/^https:\/\/fakestoreapi\.com\/img\/.+/);
  });
});
