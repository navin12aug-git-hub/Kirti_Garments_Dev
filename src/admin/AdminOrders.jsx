import { useState, useMemo, useEffect } from 'react';
import { Search, Eye, X, ChevronDown } from 'lucide-react';
import { ordersApi, customersApi } from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

const STATUSES = ['New', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'];

export default function AdminOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    ordersApi.list().then(setOrders).catch(() => toast('Failed to load orders', 'error'));
    customersApi.list().then(setCustomers).catch(() => setCustomers([]));
  }, []);

  const filtered = useMemo(() => {
    let r = [...orders];
    if (search) r = r.filter((o) => o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) r = r.filter((o) => o.status === statusFilter);
    return r;
  }, [orders, search, statusFilter]);

  const updateStatus = async (id, status) => {
    try {
      const updated = await ordersApi.update(id, { status });
      setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
      if (selected) setSelected((prev) => ({ ...prev, status }));
      toast(`Order ${id} marked as ${status}`);
    } catch (err) {
      toast(err.message || 'Failed to update order', 'error');
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-serif font-bold">Orders</h1>
        <p className="text-sm text-neutral-500 mt-1">{orders.length} orders total</p>
      </div>

      <div className="bg-white border border-neutral-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or customer..." className="input-field pl-10" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field !w-auto">
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Order ID</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden md:table-cell">Customer</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden sm:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Total</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden lg:table-cell">Payment</th>
              <th className="text-right px-4 py-3 font-semibold text-neutral-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-mono font-medium">{o.id}</td>
                <td className="px-4 py-3 hidden md:table-cell text-neutral-600">{o.customerName}</td>
                <td className="px-4 py-3 hidden sm:table-cell text-neutral-500">{formatDate(o.date)}</td>
                <td className="px-4 py-3 font-medium">{formatPrice(o.total)}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded border-0 cursor-pointer ${
                      o.status === 'Delivered' ? 'bg-success/10 text-success' :
                      o.status === 'Cancelled' || o.status === 'Returned' ? 'bg-danger/10 text-danger' :
                      'bg-accent/10 text-accent'
                    }`}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className={`text-xs ${o.paymentStatus === 'Paid' ? 'text-success' : o.paymentStatus === 'Refunded' ? 'text-danger' : 'text-warning'}`}>{o.paymentStatus}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setSelected(o)} className="p-1.5 text-neutral-500 hover:text-accent hover:bg-neutral-100 rounded inline-flex">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-neutral-500 text-sm">No orders found.</div>}
      </div>

      {selected && <OrderModal order={selected} onClose={() => setSelected(null)} onUpdateStatus={updateStatus} />}
    </div>
  );
}

function OrderModal({ order, onClose, onUpdateStatus }) {
  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-lg font-semibold font-mono">{order.id}</h2>
            <p className="text-xs text-neutral-500">{formatDate(order.date)}</p>
          </div>
          <button onClick={onClose}><X size={20} className="text-neutral-400" /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Customer</h3>
              <p className="text-sm text-neutral-700">{order.customerName}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Delivery Address</h3>
              <p className="text-sm text-neutral-600">{order.address}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Items</h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-neutral-50">
                  <div className="w-10 h-12 bg-neutral-200 flex items-center justify-center text-xs text-neutral-400">{item.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-neutral-500">{item.size} · {item.color} · Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(order.discount)}</span></div>}
            <div className="flex justify-between"><span className="text-neutral-600">Shipping</span><span>{order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</span></div>
            <div className="flex justify-between font-semibold text-base border-t border-neutral-100 pt-2"><span>Total</span><span>{formatPrice(order.total)}</span></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 border-t border-neutral-100 pt-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Payment</h3>
              <p className="text-sm text-neutral-700">{order.paymentMethod} — <span className={order.paymentStatus === 'Paid' ? 'text-success' : 'text-warning'}>{order.paymentStatus}</span></p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Update Status</h3>
              <select value={order.status} onChange={(e) => onUpdateStatus(order.id, e.target.value)} className="input-field">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
