import styles from './CartItem.module.css';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { id, title, price } = item.product;
  const quantity = item.quantity;

  const handleDecrease = () => {
    if (quantity > 1) onUpdateQuantity(id, quantity - 1);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>${price} each</p>
      </div>
      <div className={styles.quantityField}>
        <button className={styles.decreaseButton} onClick={handleDecrease}>
          -
        </button>
        <p className={styles.quantity}>{quantity}</p>
        <button
          className={styles.increaseButton}
          onClick={() => onUpdateQuantity(id, quantity + 1)}
        >
          +
        </button>
      </div>
      <p className={styles.price}>${(price * quantity).toFixed(2)}</p>
      <button className={styles.removeButton} onClick={() => onRemoveItem(id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
