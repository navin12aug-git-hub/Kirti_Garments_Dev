import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { ordersApi } from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';

const STATUSES = [
  { key: 'Confirmed', icon: CheckCircle },
  { key: 'Packed', icon: Package },
  { key: 'Shipped', icon: Truck },
  { key: 'Out for Delivery', icon: Truck },
  { key: 'Delivered', icon: CheckCircle },
];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
    try {
      const found = await ordersApi.get(orderId.trim());
      setResult(found);
    } catch {
      setResult(null);
    }
  };

  const currentStep = result ? STATUSES.findIndex((s) => s.key === result.status) : -1;

  return (
    <div className="container-custom py-8 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: 'Track Order' }]} />
      <h1 className="text-2xl md:text-3xl font-serif font-bold mt-4 mb-2">Track Your Order</h1>
      <p className="text-sm text-neutral-500 mb-6">Enter your order ID to see the current status and delivery updates.</p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. KG2026-001"
            className="input-field pl-10"
          />
        </div>
        <button type="submit" className="btn-primary">Track</button>
      </form>

      {searched && !result && (
        <div className="bg-white border border-neutral-200 p-8 text-center">
          <XCircle size={32} className="mx-auto text-neutral-300 mb-3" />
          <p className="text-sm text-neutral-500">No order found with ID "{orderId}".</p>
          <p className="text-xs text-neutral-400 mt-1">Try: KG2026-001, KG2026-002, etc.</p>
        </div>
      )}

      {result && (
        <div className="bg-white border border-neutral-200 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="font-mono text-sm font-semibold">{result.id}</p>
              <p className="text-xs text-neutral-500">Placed on {formatDate(result.date)}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded ${result.status === 'Delivered' ? 'bg-success/10 text-success' : result.status === 'Cancelled' ? 'bg-danger/10 text-danger' : 'bg-accent/10 text-accent'}`}>
              {result.status}
            </span>
          </div>

          {result.status !== 'Cancelled' && result.status !== 'Returned' && (
            <div className="mb-8">
              <div className="flex items-center">
                {STATUSES.map((s, i) => (
                  <div key={s.key} className="flex-1 flex items-center last:flex-none">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${i <= currentStep ? 'bg-success text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                      <s.icon size={18} />
                    </div>
                    {i < STATUSES.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < currentStep ? 'bg-success' : 'bg-neutral-200'}`} />}
                  </div>
                ))}
              </div>
              <div className="flex mt-2">
                {STATUSES.map((s, i) => (
                  <div key={s.key} className="flex-1 text-center">
                    <p className={`text-[10px] ${i <= currentStep ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>{s.key}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-neutral-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-600">Items</span><span>{result.items.length}</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Total</span><span className="font-semibold">{formatPrice(result.total)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Payment</span><span>{result.paymentStatus}</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Delivery Address</span><span className="text-right max-w-[60%]">{result.address}</span></div>
          </div>

          <Link to="/account/orders" className="mt-4 inline-block text-sm text-accent hover:text-accent-dark font-medium">View all orders →</Link>
        </div>
      )}
    </div>
  );
}
