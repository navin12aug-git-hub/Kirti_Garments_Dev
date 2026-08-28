import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { categoriesApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function AdminCategories() {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => toast('Failed to load categories', 'error'));
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing) {
        const updated = await categoriesApi.update(editing.id, data);
        setCategories((prev) => prev.map((c) => (c.id === editing.id ? updated : c)));
        toast('Category updated');
      } else {
        const created = await categoriesApi.create(data);
        setCategories((prev) => [...prev, created]);
        toast('Category created');
      }
      setShowModal(false);
    } catch (err) {
      toast(err.message || 'Something went wrong', 'error');
    }
  };

  const toggleEnabled = async (id) => {
    const current = categories.find((c) => c.id === id);
    try {
      const updated = await categoriesApi.update(id, { enabled: !current.enabled });
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      toast(err.message || 'Failed to update category', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await categoriesApi.remove(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast('Category deleted', 'info');
    } catch (err) {
      toast(err.message || 'Failed to delete category', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Categories</h1>
          <p className="text-sm text-neutral-500 mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="btn-primary flex items-center gap-2"><Plus size={18} /> Add Category</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="bg-white border border-neutral-200 group">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => toggleEnabled(c.id)} className="w-8 h-8 bg-white/90 rounded flex items-center justify-center text-neutral-600 hover:text-neutral-900" title={c.enabled ? 'Disable' : 'Enable'}>
                  {c.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => { setEditing(c); setShowModal(true); }} className="w-8 h-8 bg-white/90 rounded flex items-center justify-center text-neutral-600 hover:text-accent" title="Edit">
                  <Edit size={14} />
                </button>
                <button onClick={() => setConfirmDelete(c)} className="w-8 h-8 bg-white/90 rounded flex items-center justify-center text-neutral-600 hover:text-danger" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
              {!c.enabled && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-white text-xs font-medium">Disabled</span></div>}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-neutral-900">{c.name}</p>
              <p className="text-xs text-neutral-500">{c.productCount} products</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && <CategoryModal category={editing} onClose={() => setShowModal(false)} onSave={handleSave} />}
      {confirmDelete && (
        <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Delete Category?</h3>
            <p className="text-sm text-neutral-600 mb-5">Delete "{confirmDelete.name}"? Products in this category won't be deleted.</p>
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

function CategoryModal({ category, onClose, onSave }) {
  const [form, setForm] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    image: category?.image || 'https://images.pexels.com/photos/1488470/pexels-photo-1488470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    enabled: category?.enabled !== false,
  });

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold">{category ? 'Edit Category' : 'Add Category'}</h2>
          <button onClick={onClose}><X size={20} className="text-neutral-400" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave({ ...form, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') }); }} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Category Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Image URL</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" />
            {form.image && <img src={form.image} alt="Preview" className="mt-2 w-full h-32 object-cover" />}
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} className="w-4 h-4 accent-neutral-900" /> Enabled</label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">{category ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
