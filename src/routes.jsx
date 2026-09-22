// Đây là module chứa mảng các routes để cung cấp dữ liệu cho việc routing
import App from './App.jsx';
import Home from './components/home/Home.jsx';
import Shop from './components/shop/Shop.jsx';
import Cart from './components/cart/Cart.jsx';

// Khi trang load lần đầu tiên hay re-load, path root '/' sẽ điều hướng sang '/home'
import { Navigate } from 'react-router';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: 'home', element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
];

export default routes;
