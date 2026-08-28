import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, FolderTree, Boxes, ShoppingCart, Users,
  Ticket, Image, Settings, LogOut, Menu, X, Bell, Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';

const NAV = [
  { label: 'Dashboard', link: '/admin', icon: LayoutDashboard },
  { label: 'Products', link: '/admin/products', icon: Package },
  { label: 'Categories', link: '/admin/categories', icon: FolderTree },
  { label: 'Inventory', link: '/admin/inventory', icon: Boxes },
  { label: 'Orders', link: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', link: '/admin/customers', icon: Users },
  { label: 'Coupons', link: '/admin/coupons', icon: Ticket },
  { label: 'Homepage', link: '/admin/homepage', icon: Image },
  { label: 'Settings', link: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { admin, adminLogout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    adminLogout();
    toast('Admin logged out', 'info');
    navigate('/admin/login');
  };

  const isActive = (link) => location.pathname === link;

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-neutral-900 text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="bg-neutral-900">
            <Logo light />
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-400">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.link}
              to={n.link}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(n.link) ? 'bg-white/10 text-white font-medium' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <n.icon size={18} /> {n.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:bg-white/5 hover:text-white transition-colors">
            <LogOut size={18} /> Logout
          </button>
          <Link to="/" className="mt-1 block text-center text-xs text-neutral-500 hover:text-neutral-300">← Back to Store</Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-neutral-700">
                <Menu size={22} />
              </button>
              <div className="relative hidden sm:block">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 text-sm bg-neutral-100 border-0 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-neutral-200" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative text-neutral-600 hover:text-neutral-900">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[10px] rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold">A</div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-neutral-900">Admin</p>
                  <p className="text-[10px] text-neutral-500">{admin?.email || 'admin@kirti.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
