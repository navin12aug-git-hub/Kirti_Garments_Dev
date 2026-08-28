import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, ShoppingBag, Heart, Truck, RefreshCw, ShieldCheck, ChevronDown, ChevronRight, Minus, Plus } from 'lucide-react';
import { productsApi } from '../services/api';
import { formatPrice, calculateDiscount, getDeliveryEstimate } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Rating from '../components/Rating';
import Breadcrumb from '../components/Breadcrumb';
import ProductGrid from '../components/ProductGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [zoomed, setZoomed] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  const { addItem, setIsOpen } = useCart();
  const { toggleItem, hasItem } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    setQuantity(1);
    setActiveTab('description');
    window.scrollTo(0, 0);

    productsApi
      .get(id)
      .then((p) => {
        setProduct(p);
        setSelectedSize(p.sizes[0]);
        setSelectedColor(p.colors[0]?.name || '');
        return productsApi.list({ category: p.category });
      })
      .then((res) => {
        setRelated((res?.products || []).filter((rp) => rp.id !== Number(id)).slice(0, 4));
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <LoadingSkeleton type="product" count={1} />
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-6 w-1/2" />
            <div className="skeleton h-24 w-full" />
            <div className="skeleton h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Product not found"
        description="The product you're looking for doesn't exist or may have been removed."
        actionLabel="Continue Shopping"
        actionLink="/shop"
      />
    );
  }

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    if (!selectedSize) { toast('Please select a size', 'error'); return; }
    if (!selectedColor) { toast('Please select a color', 'error'); return; }
    addItem(product, selectedSize, selectedColor, quantity);
    toast(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { toast('Please select a size', 'error'); return; }
    if (!selectedColor) { toast('Please select a color', 'error'); return; }
    addItem(product, selectedSize, selectedColor, quantity);
    window.location.href = '/checkout';
  };

  const inWishlist = hasItem(product.id);

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'specifications', label: 'Specifications' },
    { key: 'shipping', label: 'Shipping & Returns' },
    { key: 'reviews', label: `Reviews (${product.reviews.length})` },
  ];

  return (
    <div className="container-custom py-6 md:py-8">
      <Breadcrumb items={[
        { label: 'Home', link: '/' },
        { label: product.category, link: `/shop?category=${product.category.toLowerCase().replace(/\s+/g, '-')}` },
        { label: product.name },
      ]} />

      <div className="mt-6 grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible no-scrollbar">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`shrink-0 w-20 h-24 border-2 overflow-hidden ${activeImg === i ? 'border-neutral-900' : 'border-neutral-200'}`}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div
            className="flex-1 relative overflow-hidden bg-neutral-100 cursor-zoom-in"
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
          >
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className={`w-full aspect-[3/4] object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`}
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNew && <span className="bg-neutral-900 text-white text-[10px] font-semibold tracking-wider px-2 py-1">NEW</span>}
              {product.isBestSeller && <span className="bg-accent text-white text-[10px] font-semibold tracking-wider px-2 py-1">BEST SELLER</span>}
              {product.isOffer && <span className="bg-danger text-white text-[10px] font-semibold tracking-wider px-2 py-1">SALE</span>}
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs tracking-wider text-neutral-400 uppercase mb-1">{product.category} · {product.subcategory}</p>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">{product.name}</h1>

          <div className="mt-3">
            <Rating value={product.rating} count={product.reviewCount} showCount size={16} />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-semibold text-neutral-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-sm text-danger font-semibold">{discount}% OFF</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-500">Inclusive of all taxes</p>

          <p className="mt-5 text-sm text-neutral-600 leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div className="mt-6">
            <p className="text-sm font-medium text-neutral-900 mb-2">Color: <span className="text-neutral-600">{selectedColor}</span></p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === c.name ? 'border-neutral-900 scale-110' : 'border-neutral-200'}`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                >
                  {selectedColor === c.name && <Check size={16} className={c.name === 'White' ? 'text-neutral-900' : 'text-white'} />}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-neutral-900">Size: <span className="text-neutral-600">{selectedSize}</span></p>
              <button className="text-xs text-accent hover:text-accent-dark">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[48px] h-11 px-3 text-sm border transition-colors ${selectedSize === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-900'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5">
            <p className="text-sm font-medium text-neutral-900 mb-2">Quantity</p>
            <div className="inline-flex items-center border border-neutral-300">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-neutral-50" aria-label="Decrease">
                <Minus size={16} />
              </button>
              <span className="w-14 text-center text-sm font-medium tabular-nums">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="w-11 h-11 flex items-center justify-center hover:bg-neutral-50" aria-label="Increase">
                <Plus size={16} />
              </button>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              {product.stock > 0 ? (
                <span className="text-success">{product.stock} in stock</span>
              ) : (
                <span className="text-danger">Out of stock</span>
              )}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn-accent flex-1">Buy Now</button>
            <button
              onClick={() => { toggleItem(product); toast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist'); }}
              className="w-12 h-12 border border-neutral-300 flex items-center justify-center hover:border-neutral-900 transition-colors"
              aria-label="Toggle wishlist"
            >
              <Heart size={20} className={inWishlist ? 'fill-danger text-danger' : 'text-neutral-700'} />
            </button>
          </div>

          {/* Delivery info */}
          <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5">
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <Truck size={18} className="text-accent" />
              <span>Free delivery by <strong>{getDeliveryEstimate()}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <RefreshCw size={18} className="text-accent" />
              <span>7-day easy returns & exchanges</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-700">
              <ShieldCheck size={18} className="text-accent" />
              <span>100% secure payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 md:mt-16">
        <div className="flex gap-1 border-b border-neutral-200 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-sm text-neutral-700 leading-relaxed">{product.description}</p>
              <p className="mt-4 text-sm text-neutral-700 leading-relaxed">
                Crafted with attention to detail, this {product.name.toLowerCase()} is designed to provide both comfort and style.
                The premium fabric ensures durability while maintaining a luxurious feel. Perfect for {product.subcategory.toLowerCase()} occasions.
              </p>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-neutral-100 pb-2">
                  <span className="text-sm text-neutral-500 capitalize">{key}</span>
                  <span className="text-sm font-medium text-neutral-900">{val}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-2xl text-sm text-neutral-700">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Shipping Information</h4>
                <p>Free shipping on orders above ₹999. Standard delivery in 3-7 business days. Express delivery available at checkout.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Return Policy</h4>
                <p>We offer 7-day easy returns. Items must be unused with original tags intact. Refunds processed within 5-7 business days.</p>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-5 max-w-3xl">
              <div className="flex items-center gap-6 pb-5 border-b border-neutral-200">
                <div className="text-center">
                  <p className="text-4xl font-serif font-bold">{product.rating.toFixed(1)}</p>
                  <Rating value={product.rating} size={16} />
                  <p className="text-xs text-neutral-500 mt-1">{product.reviewCount} reviews</p>
                </div>
              </div>
              {product.reviews.map((rev) => (
                <div key={rev.id} className="border-b border-neutral-100 pb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-semibold text-neutral-700">
                        {rev.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{rev.name}</p>
                        <p className="text-xs text-neutral-400">{rev.date}</p>
                      </div>
                    </div>
                    <Rating value={rev.rating} size={14} />
                  </div>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-12 md:mt-16">
          <h2 className="section-title mb-8">You May Also Like</h2>
          <ProductGrid products={related} onQuickView={setQuickView} />
        </div>
      )}

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
}

import QuickViewModal from '../components/QuickViewModal';
