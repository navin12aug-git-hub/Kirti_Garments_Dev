import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import SearchOverlay from './SearchOverlay';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useScrollPosition } from '../hooks';

const navItems = [
  { label: 'Home', link: '/' },
  { label: 'Ladies', link: '/shop?category=ladies', mega: true },
  { label: 'Gents', link: '/shop?category=gents', mega: true },
  { label: 'School', link: '/shop?category=school', mega: true },
  { label: 'Men', link: '/shop?category=men', mega: true },
  { label: 'Women', link: '/shop?category=women', mega: true },
  { label: 'Kids', link: '/shop?category=kids', mega: true },
  { label: 'Ethnic Wear', link: '/shop?category=ethnic-wear' },
  { label: 'Casual Wear', link: '/shop?category=casual-wear' },
  { label: 'New Arrivals', link: '/shop?filter=new' },
  { label: 'Best Sellers', link: '/shop?filter=bestseller' },
  { label: 'Offers', link: '/shop?filter=offers' },
];

export default function Header({ onMobileMenu }) {
  const scrolled = useScrollPosition();
  const { count, setIsOpen } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setHovered(null);
  }, [location]);

  return (
    <>
      <header
        className={`sticky top-0 z-[60] bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
        onMouseLeave={() => setHovered(null)}
      >
        <AnnouncementBar />
        <div className="border-b border-neutral-200">
          <div className="container-custom">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Left: mobile menu + logo */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onMobileMenu}
                  className="md:hidden text-neutral-700"
                  aria-label="Open menu"
                >
                  <Menu size={22} />
                </button>
                <Logo />
              </div>

              {/* Center: nav */}
              <nav className="hidden lg:flex items-center gap-6">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setHovered(item.mega ? item.label : null)}
                    className="relative"
                  >
                    <Link
                      to={item.link}
                      className="text-xs font-medium tracking-wider uppercase text-neutral-700 hover:text-accent transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Right: actions */}
              <div className="flex items-center gap-3 md:gap-4">
                <button onClick={() => setSearchOpen(true)} className="text-neutral-700 hover:text-accent transition-colors" aria-label="Search">
                  <Search size={20} />
                </button>
                <Link to="/account" className="hidden sm:block text-neutral-700 hover:text-accent transition-colors" aria-label="Account">
                  <User size={20} />
                </Link>
                <Link to="/wishlist" className="relative text-neutral-700 hover:text-accent transition-colors" aria-label="Wishlist">
                  <Heart size={20} />
                  {wishCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishCount}
                    </span>
                  )}
                </Link>
                <button onClick={() => setIsOpen(true)} className="relative text-neutral-700 hover:text-accent transition-colors" aria-label="Cart">
                  <ShoppingBag size={20} />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {hovered && <MegaMenu category={hovered} onClose={() => setHovered(null)} />}
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
