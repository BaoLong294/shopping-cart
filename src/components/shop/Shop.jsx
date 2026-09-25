import styles from './Shop.module.css';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import ProductCard from '../productCard/ProductCard';

function Shop() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { handleAddToCart } = useOutletContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error('server error');
        }

        const data = await response.json();
        const newProducts = data.map(
          ({ id, title, price, description, category, image }) => ({
            id,
            title,
            price,
            description,
            category,
            image,
          })
        );

        setProducts(newProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className={styles.loadingWrapper}>
        <span className={styles.spinner}></span>
        <h2 className={styles.loadingHeading}>Loading...</h2>
      </div>
    );

  if (error) return <h2>A network error was encountered</h2>;

  return (
    <>
      <h1 className={styles.heading}>Shop</h1>
      <p className={styles.description}>
        Choose a quantity, then add your favorites to your cart.
      </p>
      <div className={styles.cardGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
}

export default Shop;
