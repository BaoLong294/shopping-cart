import styles from './Shop.module.css';
import ProductCard from '../productCard/ProductCard';

function Shop({ onAddToCart }) {
  const mockProducts = [
    {
      id: 1,
      title: 'Essence Mascara Lash Princess',
      price: 9.99,
      description:
        'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effect.',
      category: 'beauty',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
    },
    {
      id: 2,
      title: 'Eyeshadow Palette with Mirror',
      price: 19.99,
      description:
        'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning looks.',
      category: 'beauty',
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
    },
  ];

  return (
    <>
      <h1 className={styles.heading}>Shop</h1>
      <p className={styles.description}>
        Choose a quantity, then add your favorites to your cart.
      </p>
      <div className={styles.cardGrid}>
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </>
  );
}

export default Shop;
