import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kg_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('kg_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, size, color, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === product.id && i.size === size && i.color === color
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          size,
          color,
          quantity,
          stock: product.stock,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId, size, color) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.size === size && i.color === color)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId, size, color, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size && i.color === color
          ? { ...i, quantity }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal = items.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0);
  const savings = originalTotal - subtotal;

  const value = {
    items, count, subtotal, originalTotal, savings,
    isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
