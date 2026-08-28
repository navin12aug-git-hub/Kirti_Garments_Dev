import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton({ product, className = '', size = 18 }) {
  const { hasItem, toggleItem } = useWishlist();
  const active = hasItem(product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
      }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 hover:border-neutral-400 transition-all duration-200 ${className}`}
    >
      <Heart
        size={size}
        className={active ? 'fill-danger text-danger' : 'text-neutral-700'}
      />
    </button>
  );
}
