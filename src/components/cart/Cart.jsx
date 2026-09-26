import styles from './Cart.module.css';
import { Link } from 'react-router';
import { useOutletContext } from 'react-router';
import CartItem from '../cartItem/CartItem';

function Cart() {
  const { cart, handleUpdateQuantity, handleRemoveItem } = useOutletContext();

  if (cart.length === 0) {
    return (
      <>
        <h1 className={styles.empty}>Your cart is currently empty</h1>
        <Link to="/shop" className={styles.link}>
          Continue shopping
        </Link>
      </>
    );
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <>
      <h1 className={styles.heading}>Cart</h1>
      <div className={styles.cartList}>
        {cart.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
      <p className={styles.totalPrice}>Total: ${formattedTotalPrice}</p>
    </>
  );
}

export default Cart;
