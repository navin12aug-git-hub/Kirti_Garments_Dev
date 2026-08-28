import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';
import CartDrawer from '../components/CartDrawer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function CustomerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-ink-50">
      <Header onMobileMenu={() => setMobileOpen(true)} />
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main key={location.pathname} className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}
