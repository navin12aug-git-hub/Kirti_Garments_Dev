import { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, Filter, Eye } from 'lucide-react';
import { productsApi, categoriesApi } from '../services/api';
import { formatPrice } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function AdminProducts() {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    productsApi.list().then((res) => setProducts(res.products || [])).catch(() => toast('Failed to load products', 'error'));
    categoriesApi.list().then(setCategories).catch(() => setCategories([]));
  }, []);

  const filtered = useMemo(() => {
    let r = [...products];
    if (search) r = r.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString().includes(search));
    if (categoryFilter) r = r.filter((p) => p.category === categoryFilter);
    return r;
  }, [products, search, categoryFilter]);

  const openAdd = () => { setEditing(null); setShowModal(true); };
  const openEdit = (p) => { setEditing(p); setShowModal(true); };

  const handleSave = async (data) => {
    try {
      if (editing) {
        const updated = await productsApi.update(editing.id, data);
        setProducts((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
        toast('Product updated successfully');
      } else {
        const created = await productsApi.create(data);
        setProducts((prev) => [created, ...prev]);
        toast('Product added successfully');
      }
      setShowModal(false);
    } catch (err) {
      toast(err.message || 'Something went wrong', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await productsApi.remove(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast('Product deleted', 'info');
    } catch (err) {
      toast(err.message || 'Failed to delete product', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold">Products</h1>
          <p className="text-sm text-neutral-500 mt-1">{products.length} products total</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus size={18} /> Add Product</button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-neutral-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or ID..." className="input-field pl-10" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input-field !w-auto">
          <option value="">All Categories</option>
          {categories.filter((c) => !['New Arrivals', 'Offers'].includes(c.name)).map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Product</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700">Price</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden sm:table-cell">Stock</th>
              <th className="text-left px-4 py-3 font-semibold text-neutral-700 hidden lg:table-cell">Status</th>
              <th className="text-right px-4 py-3 font-semibold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium text-neutral-900 line-clamp-1">{p.name}</p>
                      <p className="text-xs text-neutral-400">ID: {p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-neutral-600">{p.category}</td>
                <td className="px-4 py-3 font-medium">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={p.stock < 15 ? 'text-danger font-medium' : p.stock < 25 ? 'text-warning' : 'text-neutral-600'}>{p.stock}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className={`text-xs px-2 py-1 rounded ${p.availability ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {p.availability ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-neutral-500 hover:text-accent hover:bg-neutral-100 rounded" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => setConfirmDelete(p)} className="p-1.5 text-neutral-500 hover:text-danger hover:bg-neutral-100 rounded" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-neutral-500 text-sm">No products found.</div>
        )}
      </div>

      {showModal && <ProductModal product={editing} categories={categories} onClose={() => setShowModal(false)} onSave={handleSave} />}
      {confirmDelete && (
        <DeleteConfirm product={confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={() => handleDelete(confirmDelete.id)} />
      )}
    </div>
  );
}

function ProductModal({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || 'Men',
    subcategory: product?.subcategory || '',
    gender: product?.gender || 'male',
    description: product?.description || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    stock: product?.stock || 0,
    availability: product?.availability !== false,
    sizes: product?.sizes || ['S', 'M', 'L', 'XL'],
    colors: product?.colors || [{ name: 'Black', hex: '#1a1a1a' }],
    images: product?.images || ['https://images.pexels.com/photos/1488470/pexels-photo-1488470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
    isNew: product?.isNew || false,
    isBestSeller: product?.isBestSeller || false,
    isOffer: product?.isOffer || false,
    rating: product?.rating || 4.5,
    reviewCount: product?.reviewCount || 0,
    specifications: product?.specifications || { fabric: 'Cotton', care: 'Machine Wash', fit: 'Regular', origin: 'India' },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Product Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                {categories.filter((c) => !['New Arrivals', 'Offers'].includes(c.name)).map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Subcategory</label>
              <input type="text" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Gender</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="input-field">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Stock</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Price (₹)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Original Price (₹)</label>
              <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: parseInt(e.target.value) || 0 })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-field resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Image URL</label>
            <input type="text" value={form.images[0]} onChange={(e) => setForm({ ...form, images: [e.target.value, ...form.images.slice(1)] })} className="input-field" />
            {form.images[0] && <img src={form.images[0]} alt="Preview" className="mt-2 w-20 h-24 object-cover" />}
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.checked })} className="w-4 h-4 accent-neutral-900" /> Available</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4 accent-neutral-900" /> New Arrival</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isBestSeller} onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })} className="w-4 h-4 accent-neutral-900" /> Best Seller</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isOffer} onChange={(e) => setForm({ ...form, isOffer: e.target.checked })} className="w-4 h-4 accent-neutral-900" /> On Offer</label>
          </div>
          <div className="flex gap-3 pt-4 border-t border-neutral-100">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary flex-1">{product ? 'Update Product' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ product, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
            <Trash2 size={20} className="text-danger" />
          </div>
          <h3 className="text-lg font-semibold">Delete Product?</h3>
        </div>
        <p className="text-sm text-neutral-600 mb-5">Are you sure you want to delete "<strong>{product.name}</strong>"? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1">Cancel</button>
          <button onClick={onConfirm} className="btn-primary flex-1 !bg-danger hover:!bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}
