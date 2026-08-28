import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import Breadcrumb from '../components/Breadcrumb';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { productsApi, categoriesApi } from '../services/api';
import { formatPrice } from '../utils/helpers';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'bestselling', label: 'Best Selling' },
  { value: 'toprated', label: 'Top Rated' },
];

const ALL_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'Free Size', '2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'];
const ALL_COLORS = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#f5f5f5' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Maroon', hex: '#6b1d2e' },
  { name: 'Olive', hex: '#5c5c2e' },
  { name: 'Beige', hex: '#d4b896' },
  { name: 'Mustard', hex: '#d4a017' },
  { name: 'Teal', hex: '#1a7a7a' },
  { name: 'Coral', hex: '#e07856' },
  { name: 'Rust', hex: '#a8412a' },
];

const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: '₹2000 - ₹3000', min: 2000, max: 3000 },
  { label: 'Above ₹3000', min: 3000, max: 100000 },
];

const PER_PAGE = 12;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [page, setPage] = useState(1);
  const [quickView, setQuickView] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filter state
  const categoryParam = searchParams.get('category') || '';
  const subcategoryParam = searchParams.get('subcategory') || '';
  const filterParam = searchParams.get('filter') || '';
  const queryParam = searchParams.get('q') || '';

  const [selectedCategories, setSelectedCategories] = useState(categoryParam ? [categoryParam] : []);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [availability, setAvailability] = useState('all');
  const [sort, setSort] = useState('recommended');

  // Sync category from URL
  useEffect(() => {
    if (categoryParam) setSelectedCategories([categoryParam]);
    else setSelectedCategories([]);
  }, [categoryParam]);

  // Fetch products + categories from MongoDB once on mount
  useEffect(() => {
    Promise.all([productsApi.list(), categoriesApi.list()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.products || []);
        setCategories(categoriesRes || []);
      })
      .catch((err) => console.error('Failed to load shop data:', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedGenders, selectedSizes, selectedColors, selectedPriceRanges, availability, sort, searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some((c) => p.category.toLowerCase().replace(/\s+/g, '-') === c || p.subcategory.toLowerCase().replace(/\s+/g, '-') === c)
      );
    }

    // Subcategory
    if (subcategoryParam) {
      result = result.filter((p) => p.subcategory.toLowerCase().replace(/\s+/g, '-') === subcategoryParam);
    }

    // Special filters
    if (filterParam === 'new') result = result.filter((p) => p.isNew);
    if (filterParam === 'bestseller') result = result.filter((p) => p.isBestSeller);
    if (filterParam === 'offers') result = result.filter((p) => p.isOffer);

    // Search query
    if (queryParam) {
      const q = queryParam.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q));
    }

    // Gender
    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender));
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    }

    // Price ranges
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) =>
        selectedPriceRanges.some((r) => {
          const range = PRICE_RANGES.find((pr) => pr.label === r);
          return range && p.price >= range.min && p.price < range.max;
        })
      );
    }

    // Availability
    if (availability === 'in') result = result.filter((p) => p.availability && p.stock > 0);
    if (availability === 'out') result = result.filter((p) => !p.availability || p.stock === 0);

    // Sorting
    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'bestselling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'toprated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategories, subcategoryParam, filterParam, queryParam, selectedGenders, selectedSizes, selectedColors, selectedPriceRanges, availability, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const pageTitle = categoryParam
    ? categories.find((c) => c.slug === categoryParam)?.name || categoryParam
    : filterParam === 'new'
    ? 'New Arrivals'
    : filterParam === 'bestseller'
    ? 'Best Sellers'
    : filterParam === 'offers'
    ? 'Special Offers'
    : queryParam
    ? `Search: "${queryParam}"`
    : 'Shop All';

  const toggleArray = (arr, setArr, value) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRanges([]);
    setAvailability('all');
    setSearchParams({});
  };

  const activeFilterCount = selectedCategories.length + selectedGenders.length + selectedSizes.length + selectedColors.length + selectedPriceRanges.length + (availability !== 'all' ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.filter((c) => !['New Arrivals', 'Offers'].includes(c.name)).map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.slug)}
                onChange={() => toggleArray(selectedCategories, setSelectedCategories, c.slug)}
                className="w-4 h-4 accent-neutral-900"
              />
              <span className="text-sm text-neutral-700 group-hover:text-neutral-900 capitalize">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Gender</h3>
        <div className="space-y-2">
          {['male', 'female', 'kids'].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedGenders.includes(g)}
                onChange={() => toggleArray(selectedGenders, setSelectedGenders, g)}
                className="w-4 h-4 accent-neutral-900"
              />
              <span className="text-sm text-neutral-700 capitalize group-hover:text-neutral-900">{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((r) => (
            <label key={r.label} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(r.label)}
                onChange={() => toggleArray(selectedPriceRanges, setSelectedPriceRanges, r.label)}
                className="w-4 h-4 accent-neutral-900"
              />
              <span className="text-sm text-neutral-700 group-hover:text-neutral-900">{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleArray(selectedSizes, setSelectedSizes, s)}
              className={`min-w-[44px] h-9 px-2 text-xs border transition-colors ${
                selectedSizes.includes(s) ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleArray(selectedColors, setSelectedColors, c.name)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedColors.includes(c.name) ? 'border-neutral-900 scale-110' : 'border-neutral-200'
              }`}
              style={{ backgroundColor: c.hex }}
              aria-label={c.name}
              title={c.name}
            >
              {selectedColors.includes(c.name) && <Check size={14} className={c.name === 'White' ? 'text-neutral-900' : 'text-white'} />}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Availability</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Products' },
            { value: 'in', label: 'In Stock' },
            { value: 'out', label: 'Out of Stock' },
          ].map((a) => (
            <label key={a.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="availability"
                checked={availability === a.value}
                onChange={() => setAvailability(a.value)}
                className="w-4 h-4 accent-neutral-900"
              />
              <span className="text-sm text-neutral-700 group-hover:text-neutral-900">{a.label}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-sm text-accent hover:text-accent-dark font-medium">
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="container-custom py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Home', link: '/' }, { label: pageTitle }]} />

      <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold capitalize">{pageTitle}</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-neutral-700 border border-neutral-300 px-4 py-2"
          >
            <SlidersHorizontal size={16} /> Filters {activeFilterCount > 0 && <span className="bg-neutral-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 border border-neutral-300 px-4 py-2"
            >
              Sort: {SORT_OPTIONS.find((s) => s.value === sort)?.label} <ChevronDown size={16} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-neutral-200 shadow-lg z-30 w-56 animate-slide-down">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors ${sort === opt.value ? 'font-semibold text-neutral-900' : 'text-neutral-600'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-2 text-sm text-neutral-500">{filtered.length} products found</p>

      <div className="mt-6 flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28">
            <FilterContent />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="skeleton h-96 w-full" />
          ) : paged.length === 0 ? (
            <EmptyState
              icon={SlidersHorizontal}
              title="No products found"
              description="Try adjusting your filters or search terms to find what you're looking for."
              actionLabel="Clear Filters"
              onAction={clearAll}
            />
          ) : (
            <>
              <ProductGrid products={paged} onQuickView={setQuickView} />
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white overflow-y-auto animate-slide-down p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-neutral-400">
                <X size={22} />
              </button>
            </div>
            <FilterContent />
            <button onClick={() => setShowFilters(false)} className="btn-primary w-full mt-6">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}

      {quickView && <QuickViewModalLazy product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
}

// Lazy load quick view to avoid circular import issues
import QuickViewModalLazy from '../components/QuickViewModal';
