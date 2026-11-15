import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types';
import site from '../data/site.json';

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  items: (CartLine & { product: Product })[];
  count: number;
  estimate: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = 'hz-cart-v1';
const products = site.products as Product[];
const byId = new Map(products.map((p) => [p.id, p]));

/** "From ₦35,000" becomes 35000. */
export const priceFrom = (p: Product) => Number((p.priceRange.match(/[\d,]+/) || ['0'])[0].replace(/,/g, '')) || 0;
export const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

const read = (): CartLine[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => byId.has(l.id) && l.qty > 0) : [];
  } catch {
    return [];
  }
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lines, setLines] = useState<CartLine[]>(() => (typeof window === 'undefined' ? [] : read()));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage can be unavailable in private mode; the cart still works for this visit */
    }
  }, [lines]);

  const add = useCallback((id: string) => {
    setLines((cur) => {
      const found = cur.find((l) => l.id === id);
      return found ? cur.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...cur, { id, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((cur) => (qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 99) } : l))));
  }, []);

  const remove = useCallback((id: string) => setLines((cur) => cur.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines.filter((l) => byId.has(l.id)).map((l) => ({ ...l, product: byId.get(l.id)! }));
    return {
      lines,
      items,
      count: items.reduce((n, l) => n + l.qty, 0),
      estimate: items.reduce((n, l) => n + priceFrom(l.product) * l.qty, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, isOpen, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
