import styles from './Home.module.css';
import { Link } from 'react-router';

function Home() {
  return (
    <div className={styles.homePage}>
      <section aria-label="Hero section" className={styles.section}>
        A little shop for everyday things
      </section>
      <h1 className={styles.heading}>
        Find your next <span className={styles.highlight}>favorite thing.</span>
      </h1>
      <p className={styles.description}>
        Browse a small collection of useful goods, pick what you love, and add
        it to your cart.
      </p>
      <Link to="/shop" className={styles.link}>
        Explore the shop
      </Link>
    </div>
  );
}

export default Home;
