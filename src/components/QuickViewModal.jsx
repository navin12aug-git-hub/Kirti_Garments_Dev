import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ChevronRight } from 'lucide-react';
import Rating from './Rating';
import WishlistButton from './WishlistButton';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function QuickViewModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [activeImg, setActiveImg] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, selectedSize, selectedColor, 1);
    toast(`${product.name} added to cart`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Images */}
          <div className="relative bg-neutral-100">
            <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover aspect-[3/4] md:aspect-auto" />
            <div className="absolute bottom-3 left-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-12 h-12 border-2 overflow-hidden ${activeImg === i ? 'border-neutral-900' : 'border-white'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs tracking-wider text-neutral-400 uppercase mb-1">{product.category}</p>
                <h2 className="text-xl font-semibold text-neutral-900">{product.name}</h2>
              </div>
              <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="mt-3">
              <Rating value={product.rating} count={product.reviewCount} showCount />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold text-neutral-900">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm text-danger font-medium">{product.discountPercentage}% OFF</span>
                </>
              )}
            </div>

            <p className="mt-4 text-sm text-neutral-600 leading-relaxed line-clamp-4">{product.description}</p>

            {/* Colors */}
            <div className="mt-5">
              <p className="text-xs font-medium tracking-wider uppercase text-neutral-700 mb-2">Color: {selectedColor}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedColor === c.name ? 'border-neutral-900' : 'border-neutral-200'}`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  >
                    {selectedColor === c.name && <Check size={14} className="text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-4">
              <p className="text-xs font-medium tracking-wider uppercase text-neutral-700 mb-2">Size: {selectedSize}</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] h-10 px-3 text-sm border transition-colors ${selectedSize === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-900'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 flex gap-3">
              <button onClick={handleAdd} className="btn-primary flex-1">Add to Cart</button>
              <Link to={`/product/${product.id}`} onClick={onClose} className="btn-secondary flex items-center gap-1">
                Details <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
