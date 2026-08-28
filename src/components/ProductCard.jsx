import { Link } from 'react-router-dom';
import { Eye, ShoppingBag } from 'lucide-react';
import Rating from './Rating';
import WishlistButton from './WishlistButton';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0].name, 1);
    toast(`${product.name} added to cart`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <img
          src={product.images[1]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-neutral-900 text-white text-[10px] font-semibold tracking-wider px-2 py-1">NEW</span>
          )}
          {product.isBestSeller && (
            <span className="bg-accent text-white text-[10px] font-semibold tracking-wider px-2 py-1">BEST SELLER</span>
          )}
          {product.isOffer && (
            <span className="bg-danger text-white text-[10px] font-semibold tracking-wider px-2 py-1">SALE</span>
          )}
        </div>

        {/* Wishlist */}
        <div className="absolute top-3 right-3">
          <WishlistButton product={product} />
        </div>

        {/* Hover actions */}
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView?.(product); }}
            className="flex-1 bg-white/95 backdrop-blur-sm py-3 text-xs font-medium tracking-wider uppercase text-neutral-900 hover:bg-white flex items-center justify-center gap-1.5"
          >
            <Eye size={14} /> Quick View
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 bg-neutral-900 py-3 text-xs font-medium tracking-wider uppercase text-white hover:bg-neutral-800 flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>

        {!product.availability && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-semibold tracking-wider text-neutral-900">OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="pt-3 pb-1">
        <p className="text-[11px] tracking-wider text-neutral-400 uppercase mb-0.5">{product.category}</p>
        <h3 className="text-sm font-medium text-neutral-900 leading-snug line-clamp-1 group-hover:text-neutral-600 transition-colors">
          {product.name}
        </h3>
        <div className="mt-1">
          <Rating value={product.rating} count={product.reviewCount} showCount size={12} />
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-semibold text-neutral-900">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-xs text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-xs text-danger font-medium">{product.discountPercentage}% OFF</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
