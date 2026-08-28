import { useState, useMemo, useEffect } from 'react';
import { Search, Eye, X, Mail, Phone, MapPin } from 'lucide-react';
import { customersApi, ordersApi } from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    customersApi.list().then(setCustomers).catch(() => setCustomers([]));
    ordersApi.list().then(setOrders).catch(() => setOrders([]));
  }, []);

  const filtered = useMemo(() => {
    let r = [...customers];
    if (search) r = r.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search));
    if (statusFilter) r = r.filter((c) => c.status === statusFilter);
    return r;
  }, [customers, search, statusFilter]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-serif font-bold">Customers</h1>
        <p className="text-sm text-neutral-500 mt-1">{customers.length} customers</p>
      </div>

      <div className="bg-white border border-neutral-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, mobile..." className="input-field pl-10" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field !w-auto">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Customer</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden sm:table-cell">Contact</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden md:table-cell">Orders</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden lg:table-cell">Total Spent</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-neutral-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">{c.name[0]}</div>
                    <div>
                      <p className="font-medium text-neutral-900">{c.name}</p>
                      <p className="text-xs text-neutral-400">Joined {formatDate(c.joinedAt)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <p className="text-neutral-600 text-xs">{c.email}</p>
                  <p className="text-neutral-500 text-xs">{c.mobile}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{c.orders}</td>
                <td className="px-4 py-3 hidden lg:table-cell font-medium">{formatPrice(c.totalSpent)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${c.status === 'active' ? 'bg-success/10 text-success' : 'bg-neutral-200 text-neutral-600'}`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setSelected(c)} className="p-1.5 text-neutral-500 hover:text-accent hover:bg-neutral-100 rounded inline-flex">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-neutral-500 text-sm">No customers found.</div>}
      </div>

      {selected && <CustomerModal customer={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CustomerModal({ customer, onClose }) {
  const customerOrders = orders.filter((o) => o.customerId === customer.id);

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold">Customer Details</h2>
          <button onClick={onClose}><X size={20} className="text-neutral-400" /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-semibold">{customer.name[0]}</div>
            <div>
              <h3 className="text-xl font-semibold">{customer.name}</h3>
              <span className={`text-xs px-2 py-1 rounded ${customer.status === 'active' ? 'bg-success/10 text-success' : 'bg-neutral-200 text-neutral-600'}`}>{customer.status}</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm"><Mail size={16} className="text-neutral-400" /> {customer.email}</div>
            <div className="flex items-center gap-2 text-sm"><Phone size={16} className="text-neutral-400" /> {customer.mobile}</div>
            {customer.addresses?.[0] && (
              <div className="flex items-center gap-2 text-sm sm:col-span-2"><MapPin size={16} className="text-neutral-400" /> {customer.addresses[0].line}, {customer.addresses[0].city}, {customer.addresses[0].state} - {customer.addresses[0].pincode}</div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-4">
            <div className="text-center"><p className="text-2xl font-serif font-bold">{customer.orders}</p><p className="text-xs text-neutral-500">Orders</p></div>
            <div className="text-center"><p className="text-2xl font-serif font-bold">{formatPrice(customer.totalSpent)}</p><p className="text-xs text-neutral-500">Total Spent</p></div>
            <div className="text-center"><p className="text-2xl font-serif font-bold">{formatPrice(Math.round(customer.totalSpent / customer.orders))}</p><p className="text-xs text-neutral-500">Avg Order</p></div>
          </div>

          {customerOrders.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Order History</h3>
              <div className="space-y-2">
                {customerOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-3 bg-neutral-50">
                    <div>
                      <p className="text-sm font-medium font-mono">{o.id}</p>
                      <p className="text-xs text-neutral-500">{formatDate(o.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatPrice(o.total)}</p>
                      <span className={`text-xs ${o.status === 'Delivered' ? 'text-success' : 'text-accent'}`}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
