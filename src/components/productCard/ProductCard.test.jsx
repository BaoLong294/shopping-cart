import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard.jsx';

const mockProduct = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  price: 9.99,
  description: 'The Essence Mascara Lash Princess is a popular mascara...',
  category: 'beauty',
  image: 'https://fakestoreapi.com/img/...',
};

describe('ProductCard', () => {
  it('should have correct information of the product', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

    const title = screen.getByRole('heading');
    const price = screen.getByText(/^\$9\.99/);
    const description = screen.getByText(/popular mascara/i);
    const category = screen.getByText(/beauty/i);
    const image = screen.getByRole('img');

    const productInfos = [title, price, description, category, image];

    productInfos.forEach((info) => {
      expect(info).toBeInTheDocument();
    });

    expect(image.src).toMatch(/^https:\/\/fakestoreapi\.com\/img\/.+/);
  });

  it('should display a default quantity of 1 in the input field', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('1');
  });

  it('should increase or decrease the quantity when the + button or - button is clicked', async () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    const user = userEvent.setup();

    const increaseButton = screen.getByRole('button', { name: '+' });
    const decreaseButton = screen.getByRole('button', { name: '-' });
    const input = screen.getByRole('textbox');

    await user.click(increaseButton);
    expect(input).toHaveValue('2');

    await user.click(decreaseButton);
    expect(input).toHaveValue('1');

    await user.click(decreaseButton);
    expect(input).toHaveValue('1');
  });

  it('should call onAddToCart when the button is clicked', async () => {
    const handleAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    const increaseButton = screen.getByRole('button', { name: '+' });
    const addToCartButton = screen.getByRole('button', {
      name: /add to cart/i,
    });

    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(addToCartButton);

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });
});
