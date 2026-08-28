import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/helpers';
import EmptyState from '../components/EmptyState';
import Breadcrumb from '../components/Breadcrumb';

export default function Wishlist() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const moveToCart = (item) => {
    const product = {
      id: item.productId,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      images: [item.image],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Default', hex: '#ccc' }],
      stock: 10,
    };
    addItem(product, 'M', 'Default', 1);
    removeItem(item.productId);
    toast(`${item.name} moved to cart`);
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-8">
        <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Wishlist' }]} />
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love by tapping the heart icon. They'll appear here for easy access."
          actionLabel="Discover Products"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Wishlist' }]} />
      <h1 className="text-2xl md:text-3xl font-serif font-bold mt-4 mb-2">My Wishlist</h1>
      <p className="text-sm text-neutral-500 mb-8">{items.length} items saved</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.productId} className="bg-white border border-neutral-200 group">
            <Link to={`/product/${item.productId}`} className="block relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <div className="p-4">
              <Link to={`/product/${item.productId}`}>
                <h3 className="text-sm font-medium text-neutral-900 hover:text-neutral-600 line-clamp-1">{item.name}</h3>
              </Link>
              <p className="text-xs text-neutral-400 mt-0.5">{item.category}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
                {item.originalPrice > item.price && (
                  <span className="text-xs text-neutral-400 line-through">{formatPrice(item.originalPrice)}</span>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => moveToCart(item)} className="btn-primary flex-1 text-xs !py-2.5 flex items-center justify-center gap-1.5">
                  <ShoppingBag size={14} /> Move to Cart
                </button>
                <button
                  onClick={() => { removeItem(item.productId); toast('Removed from wishlist', 'info'); }}
                  className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:border-danger hover:text-danger transition-colors"
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
