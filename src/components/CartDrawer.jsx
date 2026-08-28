import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import QuantitySelector from './QuantitySelector';
import EmptyState from './EmptyState';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, savings, count } = useCart();
  const FREE_SHIPPING_THRESHOLD = 999;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[71] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag size={18} /> Cart {count > 0 && <span className="text-sm text-neutral-400">({count})</span>}
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-neutral-900">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Browse our collection and find something you love."
              actionLabel="Continue Shopping"
              actionLink="/shop"
            />
          </div>
        ) : (
          <>
            {/* Free shipping bar */}
            <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-xs text-neutral-700 mb-2">
                <Truck size={16} className="text-accent" />
                {remaining > 0 ? (
                  <span>Add <strong className="text-neutral-900">{formatPrice(remaining)}</strong> more for FREE shipping</span>
                ) : (
                  <span className="font-medium text-success">You've unlocked FREE shipping!</span>
                )}
              </div>
              <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <Link to={`/product/${item.productId}`} onClick={() => setIsOpen(false)} className="shrink-0">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-neutral-100" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.productId}`} onClick={() => setIsOpen(false)}>
                      <h3 className="text-sm font-medium text-neutral-900 line-clamp-1 hover:text-neutral-600">{item.name}</h3>
                    </Link>
                    <p className="text-xs text-neutral-500 mt-0.5">Size: {item.size} · Color: {item.color}</p>
                    <div className="flex items-center justify-between mt-2">
                      <QuantitySelector
                        quantity={item.quantity}
                        onDecrease={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        onIncrease={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        max={item.stock}
                      />
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        {item.originalPrice > item.price && (
                          <p className="text-xs text-neutral-400 line-through">{formatPrice(item.originalPrice * item.quantity)}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="mt-2 text-xs text-neutral-400 hover:text-danger flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-200 px-5 py-4 space-y-3">
              {savings > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>You save</span>
                  <span className="font-medium">{formatPrice(savings)}</span>
                </div>
              )}
              <div className="flex justify-between text-base">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex gap-3">
                <Link to="/cart" onClick={() => setIsOpen(false)} className="btn-secondary flex-1">View Cart</Link>
                <Link to="/checkout" onClick={() => setIsOpen(false)} className="btn-primary flex-1 flex items-center justify-center gap-1">
                  Checkout <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
