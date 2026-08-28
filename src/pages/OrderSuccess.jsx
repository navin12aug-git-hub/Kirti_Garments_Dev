import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

export default function OrderSuccess() {
  const { state } = useLocation();
  const [order, setOrder] = useState(state?.order);

  useEffect(() => {
    if (!order) {
      try {
        const orders = JSON.parse(localStorage.getItem('kg_orders') || '[]');
        if (orders.length > 0) setOrder(orders[0]);
      } catch {}
    }
  }, []);

  if (!order) {
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-neutral-500">No recent order found.</p>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 md:py-20 max-w-2xl">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <CheckCircle size={40} className="text-success" />
        </div>
        <h1 className="text-3xl font-serif font-bold">Order Confirmed!</h1>
        <p className="mt-3 text-neutral-600">Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="mt-2 text-sm text-neutral-500">Order ID: <span className="font-mono font-semibold text-neutral-900">{order.id}</span></p>
      </div>

      <div className="mt-8 bg-white border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-3">
              <img src={item.image} alt={item.name} className="w-14 h-16 object-cover bg-neutral-100" />
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900 line-clamp-1">{item.name}</p>
                <p className="text-xs text-neutral-500">{item.size} · {item.color} · Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-neutral-100 pt-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span></div>
          <div className="flex justify-between font-semibold text-base border-t border-neutral-100 pt-2"><span>Total</span><span>{formatPrice(order.total)}</span></div>
        </div>
        <div className="mt-4 border-t border-neutral-100 pt-4 text-sm">
          <p className="text-neutral-600"><strong className="text-neutral-900">Delivery to:</strong> {order.address}</p>
          <p className="text-neutral-600 mt-1"><strong className="text-neutral-900">Payment:</strong> {order.paymentStatus} ({order.payment})</p>
        </div>
      </div>

      {/* Tracking timeline */}
      <div className="mt-6 bg-white border border-neutral-200 p-6">
        <h3 className="text-sm font-semibold mb-4">Order Status</h3>
        <div className="flex items-center gap-2">
          {['Confirmed', 'Packed', 'Shipped', 'Delivered'].map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 0 ? 'bg-success text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                {i === 0 ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`ml-2 text-xs ${i === 0 ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>{s}</span>
              {i < 3 && <div className="flex-1 h-px bg-neutral-200 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/track-order" className="btn-secondary flex items-center justify-center gap-2"><Truck size={16} /> Track Order</Link>
        <Link to="/shop" className="btn-primary flex items-center justify-center gap-2"><Home size={16} /> Continue Shopping</Link>
      </div>
    </div>
  );
}
