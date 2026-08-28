import { Link } from 'react-router-dom';
import { Camera, MessageCircle, Video, Share2 } from 'lucide-react';
import Logo from './Logo';

const columns = {
  SHOP: [
    { label: 'Ladies', link: '/shop?category=ladies' },
    { label: 'Gents', link: '/shop?category=gents' },
    { label: 'School', link: '/shop?category=school' },
    { label: 'Men', link: '/shop?category=men' },
    { label: 'Women', link: '/shop?category=women' },
    { label: 'Kids', link: '/shop?category=kids' },
    { label: 'Ethnic Wear', link: '/shop?category=ethnic-wear' },
    { label: 'New Arrivals', link: '/shop?filter=new' },
    { label: 'Best Sellers', link: '/shop?filter=bestseller' },
    { label: 'Offers', link: '/shop?filter=offers' },
  ],
  HELP: [
    { label: 'Contact Us', link: '/contact' },
    { label: 'FAQ', link: '/faq' },
    { label: 'Shipping', link: '/shipping' },
    { label: 'Returns', link: '/returns' },
    { label: 'Track Order', link: '/account/orders' },
    { label: 'Size Guide', link: '/size-guide' },
  ],
  ABOUT: [
    { label: 'About Kirti Garments', link: '/about' },
    { label: 'Our Story', link: '/about' },
    { label: 'Contact', link: '/contact' },
    { label: 'WhatsApp Support', link: 'https://wa.me/919876543210' },
  ],
  LEGAL: [
    { label: 'Privacy Policy', link: '/privacy' },
    { label: 'Terms & Conditions', link: '/terms' },
    { label: 'Refund Policy', link: '/refund' },
    { label: 'Shipping Policy', link: '/shipping' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="bg-neutral-900">
              <Logo light />
            </div>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-xs">
              Premium Indian fashion for every occasion. Crafting elegance with tradition since 2025.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                <Camera size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                <Share2 size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                <Video size={16} />
              </a>
            </div>
          </div>

          {Object.entries(columns).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    {l.link.startsWith('http') ? (
                      <a href={l.link} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-accent transition-colors">
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.link} className="text-sm text-neutral-400 hover:text-accent transition-colors">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">© 2026 Kirti Garments. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500">Secure Payments:</span>
            <div className="flex gap-2 text-xs text-neutral-400">
              <span className="px-2 py-1 border border-neutral-700 rounded">UPI</span>
              <span className="px-2 py-1 border border-neutral-700 rounded">VISA</span>
              <span className="px-2 py-1 border border-neutral-700 rounded">RuPay</span>
              <span className="px-2 py-1 border border-neutral-700 rounded">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
