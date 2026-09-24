import styles from './ProductCard.module.css';
import { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [value, setValue] = useState(1);

  const handleChange = (event) => {
    const quantity = event.target.value;
    if (!/^\d*$/.test(quantity)) return;
    if (quantity >= 1) setValue(Number(quantity));
  };

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 1) setValue(value - 1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.title} className={styles.img} />
      </div>
      <div className={styles.productInfos}>
        <p className={styles.category}>{product.category}</p>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.quantity}>Quantity</p>
        <div className={styles.quantityField}>
          <button className={styles.decreaseButton} onClick={handleDecrease}>
            -
          </button>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={styles.quantityInput}
          />
          <button className={styles.increaseButton} onClick={handleIncrease}>
            +
          </button>
        </div>
        <button
          className={styles.addButton}
          onClick={() => onAddToCart(product, value)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
