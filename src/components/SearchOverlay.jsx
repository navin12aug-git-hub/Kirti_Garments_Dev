import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import { productsApi, categoriesApi } from '../services/api';
import { formatPrice } from '../utils/helpers';
import { useDebounce } from '../hooks';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 200);
  const inputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
      // Fetch once per open; the overlay filters client-side as the user types.
      productsApi.list().then((data) => setProducts(data.products || [])).catch(() => setProducts([]));
      categoriesApi.list().then(setCategories).catch(() => setCategories([]));
    }
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    if (isOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!debounced.trim()) return [];
    const q = debounced.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [debounced]);

  const matchedCategories = useMemo(() => {
    if (!debounced.trim()) return [];
    const q = debounced.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4);
  }, [debounced]);

  const popularSearches = ['Kurta', 'Saree', 'Jeans', 'Kurti', 'Dresses', 'Ethnic Wear'];
  const recentKey = 'kg_recent_searches';
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem(recentKey)) || []; } catch { return []; }
  });

  const saveRecent = (term) => {
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(next);
    localStorage.setItem(recentKey, JSON.stringify(next));
  };

  const handleSearch = (term) => {
    setQuery(term);
    saveRecent(term);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-white animate-fade-in flex flex-col">
      {/* Search bar */}
      <div className="border-b border-neutral-200 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto py-5 flex items-center gap-3">
          <Search size={22} className="text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) { saveRecent(query); onClose(); window.location.href = `/shop?q=${encodeURIComponent(query)}`; } }}
            placeholder="Search for products, categories..."
            className="flex-1 text-lg bg-transparent outline-none placeholder-neutral-400"
          />
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900">
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          {!debounced.trim() ? (
            <div className="space-y-8">
              {recent.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <button
                        key={r}
                        onClick={() => handleSearch(r)}
                        className="px-4 py-2 bg-neutral-100 text-sm text-neutral-700 hover:bg-neutral-200 transition-colors"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSearch(s)}
                      className="px-4 py-2 bg-neutral-100 text-sm text-neutral-700 hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
                    >
                      <TrendingUp size={14} className="text-accent" /> {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {matchedCategories.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/shop?category=${c.slug}`}
                        onClick={onClose}
                        className="px-4 py-2 bg-neutral-100 text-sm text-neutral-700 hover:bg-neutral-200 transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-3">
                  Products {results.length > 0 && `(${results.length})`}
                </h3>
                {results.length === 0 ? (
                  <p className="text-sm text-neutral-500">No products found. Try a different search term.</p>
                ) : (
                  <div className="space-y-3">
                    {results.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-2 hover:bg-neutral-50 transition-colors group"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-16 h-20 object-cover bg-neutral-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-neutral-500">{p.category} · {p.subcategory}</p>
                          <p className="text-sm font-semibold mt-1">{formatPrice(p.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
