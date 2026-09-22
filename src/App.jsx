import styles from './App.module.css';
import { Link, NavLink, Outlet } from 'react-router';

function App() {
  return (
    <div className={styles.app}>
      <nav>
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
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
