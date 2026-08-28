import { Link } from 'react-router-dom';
import { X, ChevronRight, Heart, User, ShoppingBag, Home as HomeIcon } from 'lucide-react';
import Logo from './Logo';

const mobileNav = [
  { label: 'Home', link: '/', icon: HomeIcon },
  { label: 'Ladies', link: '/shop?category=ladies' },
  { label: 'Gents', link: '/shop?category=gents' },
  { label: 'School', link: '/shop?category=school' },
  { label: 'Men', link: '/shop?category=men' },
  { label: 'Women', link: '/shop?category=women' },
  { label: 'Kids', link: '/shop?category=kids' },
  { label: 'Categories', link: '/shop' },
  { label: 'New Arrivals', link: '/shop?filter=new' },
  { label: 'Offers', link: '/shop?filter=offers' },
  { label: 'Wishlist', link: '/wishlist', icon: Heart },
  { label: 'Account', link: '/account', icon: User },
];

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[80] bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 z-[81] h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <Logo />
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.link}
                onClick={onClose}
                className="flex items-center justify-between px-5 py-3.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  {Icon && <Icon size={18} className="text-neutral-500" />}
                  {item.label}
                </span>
                <ChevronRight size={16} className="text-neutral-300" />
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-neutral-200 p-5">
          <Link to="/cart" onClick={onClose} className="flex items-center gap-3 text-sm font-medium text-neutral-800">
            <ShoppingBag size={18} className="text-neutral-500" /> Cart
          </Link>
          <Link to="/admin/login" onClick={onClose} className="mt-3 block text-xs text-neutral-400 hover:text-neutral-700">
            Admin Login →
          </Link>
        </div>
      </aside>
    </>
  );
}
