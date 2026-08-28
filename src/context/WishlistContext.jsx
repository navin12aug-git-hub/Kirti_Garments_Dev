import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kg_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('kg_wishlist', JSON.stringify(items));
  }, [items]);

  const toggleItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.productId === product.id);
      if (exists) {
        return prev.filter((i) => i.productId !== product.id);
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          category: product.category,
          rating: product.rating,
        },
      ];
    });
  }, []);

  const hasItem = useCallback((productId) => items.some((i) => i.productId === productId), [items]);
  const removeItem = useCallback((productId) => setItems((prev) => prev.filter((i) => i.productId !== productId)), []);
  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{ items, count: items.length, toggleItem, hasItem, removeItem, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
