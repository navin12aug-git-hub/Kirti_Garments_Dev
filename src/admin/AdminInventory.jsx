import { useState, useMemo, useEffect } from 'react';
import { Search, AlertTriangle, Package, TrendingDown } from 'lucide-react';
import { productsApi } from '../services/api';
import { formatPrice } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function AdminInventory() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  useEffect(() => {
    productsApi
      .list()
      .then((res) =>
        setItems(
          (res.products || []).map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            image: p.images[0],
            stock: p.stock,
            price: p.price,
            availability: p.availability,
          }))
        )
      )
      .catch(() => toast('Failed to load inventory', 'error'));
  }, []);

  const filtered = useMemo(() => {
    let r = [...items];
    if (search) r = r.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (stockFilter === 'low') r = r.filter((i) => i.stock < 25 && i.stock > 0);
    if (stockFilter === 'out') r = r.filter((i) => i.stock === 0);
    if (stockFilter === 'ok') r = r.filter((i) => i.stock >= 25);
    return r;
  }, [items, search, stockFilter]);

  const updateStock = (id, stock) => {
    const clamped = Math.max(0, stock);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, stock: clamped } : i)));
  };

  const persistStock = (id, stock) => {
    productsApi.update(id, { stock }).catch(() => toast('Failed to save stock change', 'error'));
  };

  const toggleAvailability = (id) => {
    const current = items.find((i) => i.id === id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, availability: !i.availability } : i)));
    productsApi
      .update(id, { availability: !current.availability })
      .then(() => toast('Availability updated'))
      .catch(() => toast('Failed to update availability', 'error'));
  };

  const lowStock = items.filter((i) => i.stock < 25 && i.stock > 0).length;
  const outStock = items.filter((i) => i.stock === 0).length;
  const totalValue = items.reduce((sum, i) => sum + i.price * i.stock, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-serif font-bold">Inventory</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage stock levels and availability</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 p-4">
          <Package size={20} className="text-neutral-500 mb-2" />
          <p className="text-2xl font-serif font-bold">{items.length}</p>
          <p className="text-xs text-neutral-500">Total Products</p>
        </div>
        <div className="bg-white border border-neutral-200 p-4">
          <AlertTriangle size={20} className="text-warning mb-2" />
          <p className="text-2xl font-serif font-bold">{lowStock}</p>
          <p className="text-xs text-neutral-500">Low Stock</p>
        </div>
        <div className="bg-white border border-neutral-200 p-4">
          <TrendingDown size={20} className="text-danger mb-2" />
          <p className="text-2xl font-serif font-bold">{outStock}</p>
          <p className="text-xs text-neutral-500">Out of Stock</p>
        </div>
        <div className="bg-white border border-neutral-200 p-4">
          <p className="text-2xl font-serif font-bold">{formatPrice(totalValue)}</p>
          <p className="text-xs text-neutral-500 mt-1">Inventory Value</p>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-10" />
        </div>
        <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="input-field !w-auto">
          <option value="">All Stock</option>
          <option value="ok">In Stock (25+)</option>
          <option value="low">Low Stock (&lt;25)</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div className="bg-white border border-neutral-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Product</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Stock</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden md:table-cell">Value</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((i) => (
              <tr key={i.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={i.image} alt={i.name} className="w-10 h-12 object-cover" />
                    <p className="font-medium text-neutral-900 line-clamp-1">{i.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-neutral-600">{i.category}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={i.stock}
                    onChange={(e) => updateStock(i.id, parseInt(e.target.value) || 0)}
                    onBlur={(e) => persistStock(i.id, Math.max(0, parseInt(e.target.value) || 0))}
                    className={`w-20 px-2 py-1 border rounded text-sm ${i.stock < 15 ? 'border-danger text-danger' : i.stock < 25 ? 'border-warning text-warning' : 'border-neutral-300'}`}
                  />
                </td>
                <td className="px-4 py-3 hidden md:table-cell font-medium">{formatPrice(i.price * i.stock)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleAvailability(i.id)}
                    className={`text-xs px-2 py-1 rounded ${i.availability ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
                  >
                    {i.availability ? 'Available' : 'Unavailable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-12 text-center text-neutral-500 text-sm">No products found.</div>}
      </div>
    </div>
  );
}
