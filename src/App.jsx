import styles from './App.module.css';
import { Link, NavLink, Outlet } from 'react-router';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const isExisted = prevCart.some((item) => item.product.id === product.id);

      if (isExisted) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { product, quantity }];
    });
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <nav>
        <div className={styles.navContainer}>
          <Link to="home" className={styles.title}>
            Shopping Cart
          </Link>
          <div className={styles.navPages}>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              Home
            </NavLink>
            <NavLink
              to="shop"
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive ? styles.linkActive : styles.link
              }
            >
              Cart
              {totalQuantity > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {totalQuantity}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
      <div className={styles.pageContainer}>
        <Outlet context={{ handleAddToCart }} />
      </div>
    </div>
  );
}

export default App;
