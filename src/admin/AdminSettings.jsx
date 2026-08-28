import { useState } from 'react';
import { Save, Store, Bell, Shield, CreditCard } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AdminSettings() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    storeName: 'Kirti Garments',
    storeEmail: 'support@kirtigarments.com',
    storePhone: '+91 98765 43210',
    storeAddress: '123 Fashion Street, Mumbai, Maharashtra 400001',
    currency: 'INR',
    freeShippingThreshold: 999,
    lowStockThreshold: 25,
    orderPrefix: 'KG',
    enableNotifications: true,
    enableLowStockAlerts: true,
    enableOrderAlerts: true,
  });

  const handleSave = () => {
    toast('Settings saved successfully!');
  };

  const Input = ({ label, value, onChange, type = 'text' }) => (
    <div>
      <label className="text-sm font-medium text-neutral-700 mb-1.5 block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-field" />
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your store configuration</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save size={18} /> Save</button>
      </div>

      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Store size={18} /> Store Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Store Name" value={form.storeName} onChange={(v) => setForm({ ...form, storeName: v })} />
          <Input label="Store Email" value={form.storeEmail} onChange={(v) => setForm({ ...form, storeEmail: v })} />
          <Input label="Store Phone" value={form.storePhone} onChange={(v) => setForm({ ...form, storePhone: v })} />
          <Input label="Currency" value={form.currency} onChange={(v) => setForm({ ...form, currency: v })} />
        </div>
        <Input label="Store Address" value={form.storeAddress} onChange={(v) => setForm({ ...form, storeAddress: v })} />
      </div>

      <div className="bg-white border border-neutral-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><CreditCard size={18} /> Shopping Settings</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Free Shipping Threshold (₹)" value={form.freeShippingThreshold} onChange={(v) => setForm({ ...form, freeShippingThreshold: v })} type="number" />
          <Input label="Low Stock Threshold" value={form.lowStockThreshold} onChange={(v) => setForm({ ...form, lowStockThreshold: v })} type="number" />
          <Input label="Order ID Prefix" value={form.orderPrefix} onChange={(v) => setForm({ ...form, orderPrefix: v })} />
        </div>
      </div>

      <div className="bg-white border border-neutral-200 p-5 space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Bell size={18} /> Notifications</h2>
        <label className="flex items-center justify-between py-2">
          <span className="text-sm text-neutral-700">Enable all notifications</span>
          <input type="checkbox" checked={form.enableNotifications} onChange={(e) => setForm({ ...form, enableNotifications: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
        <label className="flex items-center justify-between py-2 border-t border-neutral-100">
          <span className="text-sm text-neutral-700">Low stock alerts</span>
          <input type="checkbox" checked={form.enableLowStockAlerts} onChange={(e) => setForm({ ...form, enableLowStockAlerts: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
        <label className="flex items-center justify-between py-2 border-t border-neutral-100">
          <span className="text-sm text-neutral-700">New order alerts</span>
          <input type="checkbox" checked={form.enableOrderAlerts} onChange={(e) => setForm({ ...form, enableOrderAlerts: e.target.checked })} className="w-5 h-5 accent-neutral-900" />
        </label>
      </div>

      <div className="bg-white border border-neutral-200 p-5 space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2"><Shield size={18} /> Security</h2>
        <p className="text-sm text-neutral-500">This is a demo admin panel. In production, enable two-factor authentication and use secure credentials.</p>
        <button className="btn-secondary text-sm">Change Admin Password</button>
      </div>

      <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save size={18} /> Save All Settings</button>
    </div>
  );
}
