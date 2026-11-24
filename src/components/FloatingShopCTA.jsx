import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

export default function FloatingShopCTA() {
  const { pathname } = useLocation();
  if (pathname === '/shop' || pathname.startsWith('/checkout')) return null;
  return (
    <Link
      to="/shop"
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-vital text-ink px-4 py-2.5 rounded-full shadow-lg shadow-black/40 hover:bg-vital-bright transition-colors text-xs font-bold tracking-widest uppercase"
    >
      <UtensilsCrossed size={14} /> Explore Menu
    </Link>
  );
}
