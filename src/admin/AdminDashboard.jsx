import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ShoppingBag, Users, Package, DollarSign, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { ordersApi, customersApi, productsApi } from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ordersApi.list().then(setOrders).catch(() => setOrders([]));
    customersApi.list().then(setCustomers).catch(() => setCustomers([]));
    productsApi.list().then((res) => setProducts(res.products || [])).catch(() => setProducts([]));
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const todaysOrders = orders.filter((o) => o.date === '2026-08-16').length;
  const pendingOrders = orders.filter((o) => ['New', 'Confirmed', 'Packed'].includes(o.status)).length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const cancelledOrders = orders.filter((o) => o.status === 'Cancelled').length;
  const lowStockProducts = products.filter((p) => p.stock < 25).slice(0, 5);

  const stats = [
    { label: 'Total Sales', value: formatPrice(totalSales + 145678), change: '+12.5%', up: true, icon: DollarSign, color: 'bg-success/10 text-success' },
    { label: "Today's Orders", value: todaysOrders + 8, change: '+5.2%', up: true, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Orders', value: orders.length + 234, change: '+8.1%', up: true, icon: Package, color: 'bg-accent/10 text-accent' },
    { label: 'Total Customers', value: customers.length + 156, change: '+3.4%', up: true, icon: Users, color: 'bg-purple-50 text-purple-600' },
  ];

  const secondaryStats = [
    { label: 'Total Products', value: products.length, icon: Package },
    { label: 'Pending Orders', value: pendingOrders, icon: Clock },
    { label: 'Delivered', value: deliveredOrders, icon: CheckCircle },
    { label: 'Cancelled', value: cancelledOrders, icon: XCircle },
  ];

  // Mock chart data
  const salesData = [45, 52, 38, 61, 55, 72, 68, 80, 75, 88, 92, 85];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxSales = Math.max(...salesData);

  const topProducts = products.filter((p) => p.isBestSeller).slice(0, 5);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Main stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon size={20} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${s.up ? 'text-success' : 'text-danger'}`}>
                {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-serif font-bold">{s.value}</p>
            <p className="text-xs text-neutral-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryStats.map((s) => (
          <Link key={s.label} to="/admin/products" className="bg-white border border-neutral-200 p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
            <s.icon size={20} className="text-neutral-500" />
            <div>
              <p className="text-lg font-semibold">{s.value}</p>
              <p className="text-xs text-neutral-500">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales chart */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Sales Overview</h2>
            <span className="text-xs text-neutral-400">Last 12 months</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-48">
            {salesData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-neutral-100 rounded-t relative overflow-hidden flex-1 flex items-end">
                  <div
                    className="w-full bg-accent rounded-t transition-all duration-500 hover:bg-accent-dark group-hover:opacity-80"
                    style={{ height: `${(val / maxSales) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-400">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Top Selling</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-400 w-5">{i + 1}</span>
                <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-900 line-clamp-1">{p.name}</p>
                  <p className="text-xs text-neutral-500">{formatPrice(p.price)}</p>
                </div>
                <span className="text-xs text-success font-medium">{p.reviewCount} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders + low stock */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-accent hover:text-accent-dark">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div>
                  <p className="text-sm font-medium font-mono">{o.id}</p>
                  <p className="text-xs text-neutral-500">{o.customerName} · {formatDate(o.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatPrice(o.total)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${o.status === 'Delivered' ? 'bg-success/10 text-success' : o.status === 'Cancelled' ? 'bg-danger/10 text-danger' : 'bg-accent/10 text-accent'}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Low Stock Alert</h2>
            <Link to="/admin/inventory" className="text-xs text-accent hover:text-accent-dark">View all →</Link>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-2 border-b border-neutral-100 last:border-0">
                <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-900 line-clamp-1">{p.name}</p>
                  <p className="text-xs text-neutral-500">{p.category}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlertTriangle size={14} className={p.stock < 15 ? 'text-danger' : 'text-warning'} />
                  <span className={`text-xs font-medium ${p.stock < 15 ? 'text-danger' : 'text-warning'}`}>{p.stock} left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
