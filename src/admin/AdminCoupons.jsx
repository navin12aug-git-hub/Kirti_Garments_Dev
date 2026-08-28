import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Ticket, Power } from 'lucide-react';
import { couponsApi } from '../services/api';
import { formatPrice } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function AdminCoupons() {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    couponsApi.list().then(setCoupons).catch(() => toast('Failed to load coupons', 'error'));
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing) {
        const updated = await couponsApi.update(editing.id, data);
        setCoupons((prev) => prev.map((c) => (c.id === editing.id ? updated : c)));
        toast('Coupon updated');
      } else {
        const created = await couponsApi.create(data);
        setCoupons((prev) => [...prev, created]);
        toast('Coupon created');
      }
      setShowModal(false);
    } catch (err) {
      toast(err.message || 'Something went wrong', 'error');
    }
  };

  const toggleEnabled = async (id) => {
    const current = coupons.find((c) => c.id === id);
    try {
      const updated = await couponsApi.update(id, { enabled: !current.enabled });
      setCoupons((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      toast(err.message || 'Failed to update coupon', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await couponsApi.remove(id);
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      toast('Coupon deleted', 'info');
    } catch (err) {
      toast(err.message || 'Failed to delete coupon', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Coupons</h1>
          <p className="text-sm text-neutral-500 mt-1">{coupons.length} coupons</p>
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="btn-primary flex items-center gap-2"><Plus size={18} /> Add Coupon</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div key={c.id} className={`bg-white border p-5 ${c.enabled ? 'border-neutral-200' : 'border-neutral-200 opacity-60'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Ticket size={20} className="text-accent" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleEnabled(c.id)} className="p-1.5 text-neutral-400 hover:text-neutral-900" title={c.enabled ? 'Disable' : 'Enable'}>
                  <Power size={14} />
                </button>
                <button onClick={() => { setEditing(c); setShowModal(true); }} className="p-1.5 text-neutral-400 hover:text-accent" title="Edit"><Edit size={14} /></button>
                <button onClick={() => setConfirmDelete(c)} className="p-1.5 text-neutral-400 hover:text-danger" title="Delete"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="font-mono text-lg font-bold text-neutral-900">{c.code}</p>
            <p className="text-sm text-neutral-600 mt-1">{c.description}</p>
            <div className="mt-3 pt-3 border-t border-neutral-100 space-y-1 text-xs text-neutral-500">
              <p>Type: <span className="font-medium text-neutral-700">{c.type === 'fixed' ? `₹${c.value} off` : `${c.value}% off`}</span></p>
              <p>Min Order: <span className="font-medium text-neutral-700">{formatPrice(c.minOrder)}</span></p>
              <p>Expiry: <span className="font-medium text-neutral-700">{c.expiry}</span></p>
              <p>Used: <span className="font-medium text-neutral-700">{c.usageCount} times</span></p>
            </div>
            <div className="mt-3">
              <span className={`text-xs px-2 py-1 rounded ${c.enabled ? 'bg-success/10 text-success' : 'bg-neutral-200 text-neutral-600'}`}>
                {c.enabled ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && <CouponModal coupon={editing} onClose={() => setShowModal(false)} onSave={handleSave} />}
      {confirmDelete && (
        <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Delete Coupon?</h3>
            <p className="text-sm text-neutral-600 mb-5">Delete "{confirmDelete.code}"? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="btn-primary flex-1 !bg-danger hover:!bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CouponModal({ coupon, onClose, onSave }) {
  const [form, setForm] = useState({
    code: coupon?.code || '',
    description: coupon?.description || '',
    type: coupon?.type || 'percentage',
    value: coupon?.value || 10,
    minOrder: coupon?.minOrder || 500,
    expiry: coupon?.expiry || '2026-12-31',
    enabled: coupon?.enabled !== false,
  });

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold">{coupon ? 'Edit Coupon' : 'Add Coupon'}</h2>
          <button onClick={onClose}><X size={20} className="text-neutral-400" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave({ ...form, code: form.code.toUpperCase() }); }} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Coupon Code</label>
            <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className="input-field font-mono" placeholder="SAVE500" required />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Description</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" placeholder="₹500 off on orders above ₹999" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Discount Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">{form.type === 'fixed' ? 'Amount (₹)' : 'Percentage (%)'}</label>
              <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: parseInt(e.target.value) || 0 })} className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Min Order (₹)</label>
              <input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: parseInt(e.target.value) || 0 })} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Expiry Date</label>
              <input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="input-field" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} className="w-4 h-4 accent-neutral-900" /> Enabled</label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">{coupon ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
