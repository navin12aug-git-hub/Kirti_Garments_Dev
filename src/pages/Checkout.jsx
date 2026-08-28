import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, Wallet, Banknote, Check, MapPin, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/helpers';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import { ShoppingBag } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Wallet, desc: 'Pay via any UPI app' },
  { id: 'card', label: 'Debit/Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Banknote, desc: 'All major banks' },
  { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: 'Pay when you receive' },
];

export default function Checkout() {
  const { items, subtotal, savings, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  const [payment, setPayment] = useState('upi');
  const [delivery, setDelivery] = useState('standard');
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const shipping = delivery === 'express' ? 99 : subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  const validateInfo = () => {
    const e = {};
    if (!info.name.trim()) e.name = 'Required';
    if (!info.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(info.email)) e.email = 'Invalid email';
    if (!info.mobile.trim()) e.mobile = 'Required';
    else if (!/^\d{10}$/.test(info.mobile)) e.mobile = '10 digits';
    if (!info.address.trim()) e.address = 'Required';
    if (!info.city.trim()) e.city = 'Required';
    if (!info.state.trim()) e.state = 'Required';
    if (!info.pincode.trim()) e.pincode = 'Required';
    else if (!/^\d{6}$/.test(info.pincode)) e.pincode = '6 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validateInfo()) setStep(2);
  };

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      const orderId = `KG${Date.now().toString().slice(-6)}`;
      const order = {
        id: orderId,
        items,
        subtotal,
        shipping,
        total,
        payment,
        delivery,
        address: `${info.address}, ${info.city}, ${info.state} - ${info.pincode}`,
        customerName: info.name,
        customerEmail: info.email,
        customerMobile: info.mobile,
        date: new Date().toISOString().slice(0, 10),
        status: 'Confirmed',
        paymentStatus: payment === 'cod' ? 'Pending' : 'Paid',
      };
      try {
        const existing = JSON.parse(localStorage.getItem('kg_orders') || '[]');
        existing.unshift(order);
        localStorage.setItem('kg_orders', JSON.stringify(existing));
      } catch {}
      clearCart();
      setProcessing(false);
      navigate('/order-success', { state: { order } });
    }, 1800);
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-8">
        <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Checkout' }]} />
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add items to your cart before proceeding to checkout."
          actionLabel="Shop Now"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-custom py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="text-2xl md:text-3xl font-serif font-bold mt-4 mb-8">Checkout</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-4 mb-8">
        {['Information', 'Payment'].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step > i + 1 ? 'bg-success text-white' : step === i + 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
              {step > i + 1 ? <Check size={16} /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${step >= i + 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>{s}</span>
            {i === 0 && <div className="w-12 h-px bg-neutral-200" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white border border-neutral-200 p-6 space-y-5">
              <h2 className="text-lg font-semibold flex items-center gap-2"><MapPin size={18} /> Delivery Information</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Full Name</label>
                  <input type="text" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} className="input-field" placeholder="John Doe" />
                  {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Mobile Number</label>
                  <input type="tel" value={info.mobile} onChange={(e) => setInfo({ ...info, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })} className="input-field" placeholder="9876543210" />
                  {errors.mobile && <p className="text-xs text-danger mt-1">{errors.mobile}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Email</label>
                  <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className="input-field" placeholder="you@example.com" />
                  {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Address</label>
                  <textarea value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} rows={2} className="input-field resize-none" placeholder="House/Flat number, Street, Area" />
                  {errors.address && <p className="text-xs text-danger mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">City</label>
                  <input type="text" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} className="input-field" placeholder="Mumbai" />
                  {errors.city && <p className="text-xs text-danger mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">State</label>
                  <input type="text" value={info.state} onChange={(e) => setInfo({ ...info, state: e.target.value })} className="input-field" placeholder="Maharashtra" />
                  {errors.state && <p className="text-xs text-danger mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Pincode</label>
                  <input type="text" value={info.pincode} onChange={(e) => setInfo({ ...info, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} className="input-field" placeholder="400001" />
                  {errors.pincode && <p className="text-xs text-danger mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Country</label>
                  <input type="text" value={info.country} onChange={(e) => setInfo({ ...info, country: e.target.value })} className="input-field" disabled />
                </div>
              </div>

              {/* Delivery method */}
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-sm font-semibold mb-3">Delivery Method</h3>
                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${delivery === 'standard' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} className="accent-neutral-900" />
                      <div>
                        <p className="text-sm font-medium">Standard Delivery (3-7 days)</p>
                        <p className="text-xs text-neutral-500">Free above ₹999</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{subtotal >= 999 ? 'FREE' : formatPrice(49)}</span>
                  </label>
                  <label className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${delivery === 'express' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" checked={delivery === 'express'} onChange={() => setDelivery('express')} className="accent-neutral-900" />
                      <div>
                        <p className="text-sm font-medium">Express Delivery (1-2 days)</p>
                        <p className="text-xs text-neutral-500">Fastest option</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(99)}</span>
                  </label>
                </div>
              </div>

              <button onClick={handleContinue} className="btn-primary w-full sm:w-auto flex items-center gap-2">
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-neutral-200 p-6 space-y-5">
              <h2 className="text-lg font-semibold flex items-center gap-2"><CreditCard size={18} /> Payment Method</h2>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m.id} className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${payment === m.id ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}>
                    <input type="radio" name="payment" checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-neutral-900" />
                    <m.icon size={20} className="text-neutral-700" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{m.label}</p>
                      <p className="text-xs text-neutral-500">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Mock card form */}
              {payment === 'card' && (
                <div className="border border-neutral-200 p-4 space-y-3 animate-fade-in">
                  <input type="text" placeholder="Card Number (1234 5678 9012 3456)" className="input-field" maxLength={19} />
                  <div className="grid grid-cols-3 gap-3">
                    <input type="text" placeholder="MM/YY" className="input-field" maxLength={5} />
                    <input type="text" placeholder="CVV" className="input-field" maxLength={3} />
                    <input type="text" placeholder="Name on Card" className="input-field" />
                  </div>
                  <p className="text-xs text-neutral-400">This is a mock payment form. No real charges will be made.</p>
                </div>
              )}

              {payment === 'upi' && (
                <div className="border border-neutral-200 p-4 animate-fade-in">
                  <input type="text" placeholder="Enter UPI ID (yourname@upi)" className="input-field" />
                  <p className="text-xs text-neutral-400 mt-2">Mock UPI payment. No real transaction will occur.</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button onClick={handlePlaceOrder} disabled={processing} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {processing ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                  ) : (
                    `Place Order · ${formatPrice(total)}`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-28 h-fit">
          <div className="bg-white border border-neutral-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-16 object-cover bg-neutral-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-900 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-neutral-400">{item.size} · {item.color} · Qty {item.quantity}</p>
                    <p className="text-xs font-semibold mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {savings > 0 && <div className="flex justify-between text-success"><span>Savings</span><span>-{formatPrice(savings)}</span></div>}
              <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              <div className="border-t border-neutral-200 pt-2 flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
