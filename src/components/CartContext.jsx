import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { countMeals, breakfastsAllowed, soupsAllowed, dessertsAllowed, sum } from '@/lib/orderRules';

const CartContext = createContext(null);

const EMPTY_EXTRAS = { breakfasts: {}, soups: {}, desserts: {} };
const EMPTY_DELIVERY = { name: '', phone: '', line1: '', suburb: '', postcode: '' };

// Keep a chosen-extras map within its allowed total (trim from the end).
function trim(map, allowed) {
  let remaining = allowed;
  const out = {};
  for (const [slug, qty] of Object.entries(map || {})) {
    const keep = Math.min(qty, remaining);
    if (keep > 0) out[slug] = keep;
    remaining -= keep;
  }
  return out;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [extras, setExtras] = useState(EMPTY_EXTRAS);
  const [delivery, setDeliveryState] = useState(EMPTY_DELIVERY);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('korzavo_meals_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
        else {
          setItems(parsed.items || []);
          setExtras({ ...EMPTY_EXTRAS, ...(parsed.extras || {}) });
          setDeliveryState({ ...EMPTY_DELIVERY, ...(parsed.delivery || {}) });
        }
      }
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('korzavo_meals_cart', JSON.stringify({ items, extras, delivery }));
    } catch (e) { /* ignore */ }
  }, [items, extras, delivery]);

  const lunchCount = useMemo(() => countMeals(items, 'lunch'), [items]);
  const dinnerCount = useMemo(() => countMeals(items, 'dinner'), [items]);
  const breakfastAllowed = breakfastsAllowed(lunchCount);
  const soupAllowed = soupsAllowed(dinnerCount);
  const dessertAllowed = dessertsAllowed(lunchCount, dinnerCount);

  // If the cart changes so fewer extras are allowed, trim the choices to fit.
  useEffect(() => {
    setExtras((prev) => {
      const b = trim(prev.breakfasts, breakfastAllowed);
      const s = trim(prev.soups, soupAllowed);
      const d = trim(prev.desserts, dessertAllowed);
      if (sum(b) === sum(prev.breakfasts) && sum(s) === sum(prev.soups) && sum(d) === sum(prev.desserts)) return prev;
      return { breakfasts: b, soups: s, desserts: d };
    });
  }, [breakfastAllowed, soupAllowed, dessertAllowed]);

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.slug);
      if (existing) {
        return prev.map(i => i.id === product.slug ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        id: product.slug,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image_url: product.image_url,
        qty
      }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  // group is 'breakfasts', 'soups' or 'desserts'; delta is +1 or -1
  const changeExtra = useCallback((group, slug, delta) => {
    setExtras((prev) => {
      const allowed = group === 'breakfasts' ? breakfastAllowed : group === 'soups' ? soupAllowed : dessertAllowed;
      const current = prev[group] || {};
      const next = Math.max(0, (current[slug] || 0) + delta);
      const total = sum(current) - (current[slug] || 0) + next;
      if (total > allowed) return prev;
      const updated = { ...current, [slug]: next };
      if (next === 0) delete updated[slug];
      return { ...prev, [group]: updated };
    });
  }, [breakfastAllowed, soupAllowed, dessertAllowed]);

  const setDelivery = useCallback((patch) => setDeliveryState((prev) => ({ ...prev, ...patch })), []);

  const clearCart = useCallback(() => {
    setItems([]);
    setExtras(EMPTY_EXTRAS);
  }, []);

  const count = items.reduce((total, i) => total + i.qty, 0);
  const subtotal = items.reduce((total, i) => total + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQty, clearCart, count, subtotal, isOpen, setIsOpen,
        extras, changeExtra, delivery, setDelivery,
        lunchCount, dinnerCount, breakfastAllowed, soupAllowed, dessertAllowed,
        breakfastChosen: sum(extras.breakfasts), soupChosen: sum(extras.soups), dessertChosen: sum(extras.desserts),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
