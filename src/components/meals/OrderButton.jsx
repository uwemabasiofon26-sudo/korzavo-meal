import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { ORDERING_OPEN, STORE_OUT_OF_STOCK } from '@/lib/productData';

const base =
  'inline-flex items-center justify-center gap-2 bg-vital hover:bg-vital-bright text-ink font-body font-bold text-xs md:text-sm tracking-widest uppercase px-7 py-3.5 rounded-[40px] transition-colors';

// Adds to cart when ordering is open; otherwise sends people to the contact page.
export default function OrderButton({ product, label = 'ORDER NOW', className = '' }) {
  const { addItem } = useCart();
  if (!ORDERING_OPEN || STORE_OUT_OF_STOCK) {
    return (
      <Link to="/contact" className={`${base} ${className}`}>
        Ordering opens soon — Register Interest
      </Link>
    );
  }
  return (
    <button type="button" onClick={() => addItem(product)} className={`${base} ${className}`}>
      <ShoppingBag size={15} /> {label}
    </button>
  );
}
