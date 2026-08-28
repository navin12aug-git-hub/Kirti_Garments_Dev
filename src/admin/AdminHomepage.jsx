import { useState, useEffect } from 'react';
import { Save, Image, Star, Tag } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { homeApi } from '../services/api';

export default function AdminHomepage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({});
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeApi
      .get()
      .then((data) => {
        setSettings(data);
        setForm(data);
      })
      .catch(() => toast('Failed to load homepage settings', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = () => {
    homeApi
      .update(form)
      .then((updated) => {
        setSettings(updated);
        setForm(updated);
        toast('Homepage settings saved successfully!');
      })
      .catch((err) => toast(err.message || 'Failed to save settings', 'error'));
  };

  const Input = ({ label, value, onChange, type = 'text' }) => (
    <div>
      <label className="text-sm font-medium text-neutral-700 mb-1.5 block">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3} className="input-field resize-none" />
      ) : (
        <input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} className="input-field" />
      )}
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Homepage Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Customize your homepage content without touching code.</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save size={18} /> Save Changes</button>
      </div>

      {/* Announcement Bar */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Tag size={18} /> Announcement Bar</h2>
        <Input label="Announcement Text" value={form.announcementText || ''} onChange={(v) => setForm({ ...form, announcementText: v })} />
      </div>

      {/* Hero Section */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Image size={18} /> Hero Section</h2>
        <Input label="Headline" value={form.heroHeadline || ''} onChange={(v) => setForm({ ...form, heroHeadline: v })} />
        <Input label="Description" value={form.heroDescription || ''} onChange={(v) => setForm({ ...form, heroDescription: v })} type="textarea" />
        <Input label="Hero Image URL" value={form.heroImage || ''} onChange={(v) => setForm({ ...form, heroImage: v })} />
        {form.heroImage && <img src={form.heroImage} alt="Hero preview" className="w-full h-40 object-cover" />}
      </div>

      {/* Promotional Banner */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Image size={18} /> Promotional Banner</h2>
        <Input label="Headline" value={form.promoHeadline || ''} onChange={(v) => setForm({ ...form, promoHeadline: v })} />
        <Input label="Description" value={form.promoDescription || ''} onChange={(v) => setForm({ ...form, promoDescription: v })} type="textarea" />
        <Input label="Button Text" value={form.promoButtonText || ''} onChange={(v) => setForm({ ...form, promoButtonText: v })} />
        <Input label="Banner Image URL" value={form.promoImage || ''} onChange={(v) => setForm({ ...form, promoImage: v })} />
        {form.promoImage && <img src={form.promoImage} alt="Promo preview" className="w-full h-40 object-cover" />}
      </div>

      {/* Section Titles */}
      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Star size={18} /> Section Titles</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Category Section Title" value={form.categoryTitle || ''} onChange={(v) => setForm({ ...form, categoryTitle: v })} />
          <Input label="New Arrivals Title" value={form.newArrivalsTitle || ''} onChange={(v) => setForm({ ...form, newArrivalsTitle: v })} />
          <Input label="New Arrivals Subtitle" value={form.newArrivalsSubtitle || ''} onChange={(v) => setForm({ ...form, newArrivalsSubtitle: v })} />
          <Input label="Best Sellers Title" value={form.bestSellersTitle || ''} onChange={(v) => setForm({ ...form, bestSellersTitle: v })} />
          <Input label="Offers Title" value={form.offersTitle || ''} onChange={(v) => setForm({ ...form, offersTitle: v })} />
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white border border-neutral-200 p-5 space-y-3">
        <h2 className="text-lg font-semibold">Display Options</h2>
        <label className="flex items-center justify-between py-2">
          <span className="text-sm text-neutral-700">Show Customer Reviews</span>
          <input type="checkbox" checked={form.showReviews !== false} onChange={(e) => setForm({ ...form, showReviews: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
        <label className="flex items-center justify-between py-2 border-t border-neutral-100">
          <span className="text-sm text-neutral-700">Show Newsletter</span>
          <input type="checkbox" checked={form.showNewsletter !== false} onChange={(e) => setForm({ ...form, showNewsletter: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
        <label className="flex items-center justify-between py-2 border-t border-neutral-100">
          <span className="text-sm text-neutral-700">Show WhatsApp Button</span>
          <input type="checkbox" checked={form.showWhatsApp !== false} onChange={(e) => setForm({ ...form, showWhatsApp: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
      </div>

      <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save size={18} /> Save All Changes</button>
    </div>
  );
}
