import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItem from './CartItem.jsx';

const mockCart = [
  {
    product: { id: 1, title: 'Essence Mascara Lash Princess', price: 9.99 },
    quantity: 2,
  },
];

describe('CartItem', () => {
  it('should have correct information and quantity of the product', () => {
    render(
      <CartItem
        item={mockCart[0]}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
      />
    );

    const title = screen.getByRole('heading');
    const description = screen.getByText('$9.99 each');
    const price = screen.getByText('$19.98');
    const quantity = screen.getByText('2');

    const productInfos = [title, description, price, quantity];

    productInfos.forEach((info) => expect(info).toBeInTheDocument());
  });

  it('should call onUpdateQuantity with quantity + 1 when increase button is clicked', async () => {
    const handleUpdateQuantity = vi.fn();
    const user = userEvent.setup();

    render(
      <CartItem
        item={mockCart[0]}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={vi.fn()}
      />
    );

    const increaseButton = screen.getByText('+');
    await user.click(increaseButton);

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(handleUpdateQuantity).toHaveBeenCalledWith(
      mockCart[0].product.id,
      3
    );
  });

  it('should call onUpdateQuantity with quantity - 1 when decrease button is clicked', async () => {
    const handleUpdateQuantity = vi.fn();
    const user = userEvent.setup();

    render(
      <CartItem
        item={mockCart[0]}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={vi.fn()}
      />
    );

    const decreaseButton = screen.getByText('-');
    await user.click(decreaseButton);

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(handleUpdateQuantity).toHaveBeenCalledWith(
      mockCart[0].product.id,
      1
    );
  });

  it('should call handleRemoveItem when remove button is clicked', async () => {
    const handleRemoveItem = vi.fn();
    const user = userEvent.setup();

    render(
      <CartItem
        item={mockCart[0]}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={handleRemoveItem}
      />
    );

    const removeButton = screen.getByText('Remove');
    await user.click(removeButton);
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(mockCart[0].product.id);
  });
});
