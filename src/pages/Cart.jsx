import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Tag, X, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { couponsApi } from '../services/api';
import { formatPrice } from '../utils/helpers';
import QuantitySelector from '../components/QuantitySelector';
import EmptyState from '../components/EmptyState';
import Breadcrumb from '../components/Breadcrumb';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, savings, count } = useCart();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCoupons, setShowCoupons] = useState(false);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    couponsApi.list({ enabled: true }).then(setCoupons).catch(() => setCoupons([]));
  }, []);

  const FREE_SHIPPING = 999;
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : 49;
  const discount = appliedCoupon
    ? appliedCoupon.type === 'fixed'
      ? appliedCoupon.value
      : Math.round((subtotal * appliedCoupon.value) / 100)
    : 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  const applyCoupon = async () => {
    try {
      const coupon = await couponsApi.validate(couponCode.toUpperCase().trim());
      if (subtotal < coupon.minOrder) { toast(`Minimum order ${formatPrice(coupon.minOrder)} required`, 'error'); return; }
      setAppliedCoupon(coupon);
      toast(`Coupon ${coupon.code} applied!`);
    } catch {
      toast('Invalid or expired coupon code', 'error');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast('Coupon removed', 'info');
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-8">
        <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Cart' }]} />
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start shopping to fill your cart with premium fashion."
          actionLabel="Start Shopping"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Cart' }]} />
      <h1 className="text-2xl md:text-3xl font-serif font-bold mt-4 mb-8">Shopping Cart ({count})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border border-neutral-200 bg-white p-4">
              <Link to={`/product/${item.productId}`} className="shrink-0">
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-neutral-100" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.productId}`}>
                  <h3 className="text-sm font-medium text-neutral-900 hover:text-neutral-600 line-clamp-1">{item.name}</h3>
                </Link>
                <p className="text-xs text-neutral-500 mt-1">Size: {item.size} · Color: {item.color}</p>
                <div className="mt-3 flex items-center justify-between">
                  <QuantitySelector
                    quantity={item.quantity}
                    onDecrease={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                    onIncrease={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                    max={item.stock}
                  />
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">{formatPrice(item.price * item.quantity)}</p>
                    {item.originalPrice > item.price && (
                      <p className="text-xs text-neutral-400 line-through">{formatPrice(item.originalPrice * item.quantity)}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => { removeItem(item.productId, item.size, item.color); toast('Item removed from cart', 'info'); }}
                  className="mt-3 text-xs text-neutral-400 hover:text-danger flex items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}

          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark mt-4">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-white border border-neutral-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            {/* Coupon */}
            <div className="border-b border-neutral-100 pb-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-success/10 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-success" />
                    <span className="text-sm font-medium text-success">{appliedCoupon.code}</span>
                  </div>
                  <button onClick={removeCoupon} className="text-neutral-400 hover:text-danger">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                    <button onClick={applyCoupon} className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800">Apply</button>
                  </div>
                  <button onClick={() => setShowCoupons(!showCoupons)} className="mt-2 text-xs text-accent hover:text-accent-dark">
                    {showCoupons ? 'Hide' : 'Show'} available coupons
                  </button>
                  {showCoupons && (
                    <div className="mt-2 space-y-1.5">
                      {coupons.filter((c) => c.enabled).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => { setCouponCode(c.code); setShowCoupons(false); }}
                          className="w-full text-left px-2 py-1.5 text-xs border border-dashed border-neutral-300 hover:border-accent transition-colors"
                        >
                          <span className="font-mono font-semibold text-neutral-900">{c.code}</span>
                          <span className="text-neutral-500"> — {c.description}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-success">
                  <span>Product Savings</span>
                  <span>-{formatPrice(savings)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
            </div>

            {subtotal < FREE_SHIPPING && (
              <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 p-2">
                <Truck size={14} className="text-accent" />
                Add <strong>{formatPrice(FREE_SHIPPING - subtotal)}</strong> for free shipping
              </div>
            )}

            <div className="border-t border-neutral-200 pt-4 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
