import { Navigate, useLocation } from 'react-router-dom';

const CATEGORY_MAP = {
  '/men': '/shop?category=men',
  '/women': '/shop?category=women',
  '/kids': '/shop?category=kids',
  '/ethnic-wear': '/shop?category=ethnic-wear',
  '/casual-wear': '/shop?category=casual-wear',
  '/new-arrivals': '/shop?filter=new',
  '/best-sellers': '/shop?filter=bestseller',
  '/offers': '/shop?filter=offers',
};

export default function CategoryRedirect() {
  const location = useLocation();
  const target = CATEGORY_MAP[location.pathname] || '/shop';
  return <Navigate to={target} replace />;
}
