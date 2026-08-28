import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';
import QuickViewModal from '../components/QuickViewModal';
import { productsApi, categoriesApi, reviewsApi, homeApi } from '../services/api';
import { images } from '../data/images';
import Rating from '../components/Rating';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [home, setHome] = useState(null);

  useEffect(() => {
    Promise.all([
      productsApi.list(),
      categoriesApi.list(),
      reviewsApi.list(),
      homeApi.get(),
    ])
      .then(([productsRes, categoriesRes, reviewsRes, homeRes]) => {
        setProducts(productsRes.products || []);
        setCategories(categoriesRes || []);
        setCustomerReviews(reviewsRes || []);
        setHome(homeRes || null);
      })
      .catch((err) => console.error('Failed to load homepage data:', err))
      .finally(() => setLoading(false));
  }, []);

  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const offers = products.filter((p) => p.isOffer).slice(0, 4);
  const featuredCategories = categories.filter((c) => !['New Arrivals', 'Offers'].includes(c.name)).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden bg-neutral-900">
        <img
          src={home?.heroImage || images.hero}
          alt="Kirti Garments premium fashion collection"
          onLoad={() => setHeroLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroLoaded ? 'opacity-60' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative h-full container-custom flex items-center">
          <div className={`max-w-xl text-white transition-all duration-1000 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-xs tracking-[0.3em] text-accent-light mb-4">PREMIUM INDIAN FASHION</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.05]">
              {home?.heroHeadline || 'Style That Defines You'}
            </h1>
            <p className="mt-6 text-base md:text-lg text-neutral-200 max-w-md">
              {home?.heroDescription || 'Discover premium fashion for every occasion. From ethnic elegance to contemporary chic.'}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/shop?category=men" className="btn-primary">Shop Men</Link>
              <Link to="/shop?category=women" className="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20">Shop Women</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
            { icon: RefreshCw, title: 'Easy Returns', desc: '7-day return policy' },
            { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected checkout' },
            { icon: Headphones, title: '24/7 Support', desc: 'Dedicated assistance' },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <f.icon size={24} className="text-accent shrink-0" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{f.title}</p>
                <p className="text-xs text-neutral-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-accent mb-2">EXPLORE</p>
            <h2 className="section-title">{home?.categoryTitle || 'Shop By Category'}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredCategories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-serif font-semibold">{cat.name}</h3>
                  <p className="text-white/70 text-xs mt-1 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight size={12} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] text-accent mb-2">FRESH DROPS</p>
              <h2 className="section-title">{home?.newArrivalsTitle || 'New Arrivals'}</h2>
            </div>
            <Link to="/shop?filter=new" className="text-sm font-medium text-neutral-700 hover:text-accent flex items-center gap-1 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <div className="skeleton h-96 w-full" />
          ) : (
            <ProductGrid products={newArrivals} onQuickView={setQuickView} />
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <img src={home?.promoImage || images.editorial[0]} alt="New Season Collection" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container-custom text-center text-white">
          <p className="text-xs tracking-[0.3em] text-accent-light mb-3">LIMITED TIME</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold">{home?.promoHeadline || 'New Season Collection'}</h2>
          <p className="mt-4 text-neutral-200 max-w-lg mx-auto">{home?.promoDescription || 'Discover the latest styles from Kirti Garments. Fresh designs that blend tradition with modern aesthetics.'}</p>
          <Link to="/shop" className="btn-primary mt-8">{home?.promoButtonText || 'Shop Now'}</Link>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] text-accent mb-2">CUSTOMER FAVORITES</p>
              <h2 className="section-title">{home?.bestSellersTitle || 'Best Sellers'}</h2>
            </div>
            <Link to="/shop?filter=bestseller" className="text-sm font-medium text-neutral-700 hover:text-accent flex items-center gap-1 transition-colors">
              Shop Best Sellers <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <div className="skeleton h-96 w-full" />
          ) : (
            <ProductGrid products={bestSellers} onQuickView={setQuickView} />
          )}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 md:py-20 bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-accent-light mb-2">DEALS & DISCOUNTS</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">{home?.offersTitle || 'Style More. Spend Less.'}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '₹500 OFF', desc: 'On orders above ₹999', code: 'FIRSTORDER' },
              { label: '10% OFF', desc: 'On all orders', code: 'KIRTI10' },
              { label: '20% OFF', desc: 'Festive collection', code: 'FESTIVAL2026' },
              { label: '25% OFF', desc: 'Orders above ₹2999', code: 'MEGA25' },
            ].map((offer) => (
              <div key={offer.label} className="bg-white/5 border border-white/10 p-6 text-center hover:bg-white/10 transition-colors">
                <p className="text-2xl md:text-3xl font-serif font-bold text-accent-light">{offer.label}</p>
                <p className="text-sm text-neutral-300 mt-2">{offer.desc}</p>
                <p className="text-xs text-neutral-400 mt-3">Code: <span className="font-mono text-accent-light">{offer.code}</span></p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop?filter=offers" className="btn-accent">Shop Offers</Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {home?.showReviews !== false && (
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-accent mb-2">TESTIMONIALS</p>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerReviews.map((review, i) => (
              <div
                key={review.id}
                className="border border-neutral-200 p-6 animate-slide-up hover:shadow-md transition-shadow"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Rating value={review.rating} size={16} />
                <h4 className="mt-3 font-semibold text-neutral-900">{review.title}</h4>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">"{review.comment}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{review.name}</p>
                    <p className="text-xs text-neutral-400">{review.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      <Newsletter />

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
}
