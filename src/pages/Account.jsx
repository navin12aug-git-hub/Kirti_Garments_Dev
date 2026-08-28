import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { User, Package, MapPin, Heart, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ordersApi } from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';

function AccountHome() {
  const { user } = useAuth();
  const localOrders = JSON.parse(localStorage.getItem('kg_orders') || '[]');
  const [dbOrders, setDbOrders] = useState([]);

  useEffect(() => {
    if (user?.id) {
      ordersApi.list({ customerId: user.id }).then(setDbOrders).catch(() => setDbOrders([]));
    }
  }, [user]);

  const userOrders = [...localOrders, ...dbOrders];
  const recentOrders = userOrders.slice(0, 3);

  const stats = [
    { label: 'Total Orders', value: userOrders.length, icon: Package, link: '/account/orders' },
    { label: 'Wishlist Items', value: 0, icon: Heart, link: '/wishlist' },
    { label: 'Saved Addresses', value: 1, icon: MapPin, link: '/account/addresses' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold mb-2">Hello, {user?.name || 'Customer'}</h1>
      <p className="text-sm text-neutral-500 mb-8">Welcome to your Kirti Garments account</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} to={s.link} className="bg-white border border-neutral-200 p-5 hover:shadow-md transition-shadow">
            <s.icon size={22} className="text-accent mb-3" />
            <p className="text-2xl font-serif font-bold">{s.value}</p>
            <p className="text-sm text-neutral-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      {recentOrders.length === 0 ? (
        <div className="bg-white border border-neutral-200 p-8 text-center">
          <Package size={32} className="mx-auto text-neutral-300 mb-3" />
          <p className="text-sm text-neutral-500">No orders yet. Start shopping to see your orders here.</p>
          <Link to="/shop" className="btn-primary mt-4 inline-flex">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-white border border-neutral-200 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-mono">{order.id}</p>
                <p className="text-xs text-neutral-500">{formatDate(order.date)} · {order.items.length} items</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatPrice(order.total)}</p>
                <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded">{order.status}</span>
              </div>
            </div>
          ))}
          <Link to="/account/orders" className="text-sm text-accent hover:text-accent-dark font-medium">View all orders →</Link>
        </div>
      )}
    </div>
  );
}

function AccountOrders() {
  const { user } = useAuth();
  const localOrders = JSON.parse(localStorage.getItem('kg_orders') || '[]');
  const [dbOrders, setDbOrders] = useState([]);

  useEffect(() => {
    if (user?.id) {
      ordersApi.list({ customerId: user.id }).then(setDbOrders).catch(() => setDbOrders([]));
    }
  }, [user]);

  const allOrders = [...localOrders, ...dbOrders];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold mb-6">My Orders</h1>
      {allOrders.length === 0 ? (
        <div className="bg-white border border-neutral-200 p-8 text-center">
          <Package size={32} className="mx-auto text-neutral-300 mb-3" />
          <p className="text-sm text-neutral-500">No orders yet.</p>
          <Link to="/shop" className="btn-primary mt-4 inline-flex">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {allOrders.map((order) => (
            <div key={order.id} className="bg-white border border-neutral-200 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="font-mono text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-neutral-500">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded ${order.status === 'Delivered' ? 'bg-success/10 text-success' : order.status === 'Cancelled' ? 'bg-danger/10 text-danger' : 'bg-accent/10 text-accent'}`}>{order.status}</span>
                  <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {order.items.map((item, i) => (
                  <div key={i} className="shrink-0 flex gap-2 items-center bg-neutral-50 p-2 min-w-[200px]">
                    <img src={item.image || 'https://images.pexels.com/photos/1488470/pexels-photo-1488470.jpeg?auto=compress&cs=tinysrgb&h=120'} alt={item.name} className="w-10 h-12 object-cover" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-neutral-400">{item.size} · Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <Link to="/track-order" className="text-xs font-medium text-accent hover:text-accent-dark">Track Order →</Link>
                {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                  <button className="text-xs text-neutral-400 hover:text-danger">Cancel Order</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AccountAddresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', name: user?.name || 'Customer', line: '12 MG Road, Indiranagar', city: 'Bengaluru', state: 'Karnataka', pincode: '560038', mobile: user?.mobile || '9876543210', country: 'India' },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold">Saved Addresses</h1>
        <button className="btn-secondary text-xs !py-2 !px-4">+ Add New</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((a) => (
          <div key={a.id} className="bg-white border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold bg-neutral-100 px-2 py-1 rounded">{a.label}</span>
              <div className="flex gap-2">
                <button className="text-xs text-accent hover:text-accent-dark">Edit</button>
                <button onClick={() => setAddresses(addresses.filter((x) => x.id !== a.id))} className="text-xs text-neutral-400 hover:text-danger">Delete</button>
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-900">{a.name}</p>
            <p className="text-sm text-neutral-600 mt-1">{a.line}</p>
            <p className="text-sm text-neutral-600">{a.city}, {a.state} - {a.pincode}</p>
            <p className="text-sm text-neutral-600">{a.country}</p>
            <p className="text-sm text-neutral-500 mt-2">Mobile: {a.mobile}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Account() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const nav = [
    { label: 'Dashboard', link: '/account', icon: User },
    { label: 'My Orders', link: '/account/orders', icon: Package },
    { label: 'Addresses', link: '/account/addresses', icon: MapPin },
    { label: 'Wishlist', link: '/wishlist', icon: Heart },
  ];

  const handleLogout = () => {
    logout();
    toast('Logged out successfully', 'info');
    navigate('/');
  };

  return (
    <div className="container-custom py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white border border-neutral-200 p-5">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
              <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">{user.name}</p>
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              </div>
            </div>
            <nav className="mt-4 space-y-1">
              {nav.map((n) => {
                const active = location.pathname === n.link;
                return (
                  <Link
                    key={n.link}
                    to={n.link}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded transition-colors ${active ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'}`}
                  >
                    <n.icon size={18} /> {n.label}
                  </Link>
                );
              })}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 rounded transition-colors">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </div>
        </aside>
        <div className="lg:col-span-3">
          {location.pathname === '/account' && <AccountHome />}
          {location.pathname === '/account/orders' && <AccountOrders />}
          {location.pathname === '/account/addresses' && <AccountAddresses />}
        </div>
      </div>
    </div>
  );
}
