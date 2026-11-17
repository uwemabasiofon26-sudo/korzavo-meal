import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../CartContext';
import Wordmark from '@/components/meals/Wordmark';
import { NAV_LINKS } from '@/lib/brand';
import { ORDERING_OPEN } from '@/lib/productData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkCls = (to) =>
    `text-sm tracking-widest uppercase font-semibold transition-colors ${location.pathname === to ? 'text-vital' : 'text-cream hover:text-vital'}`;

  return (
    <>
      <header className={`fixed top-9 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-ink/95 backdrop-blur border-b border-line' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" aria-label="KORZAVO MEALS home"><Wordmark /></Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => <Link key={l.to} to={l.to} className={linkCls(l.to)}>{l.label}</Link>)}
          </nav>

          <div className="flex items-center gap-4">
            {ORDERING_OPEN && (
              <button onClick={() => setIsOpen(true)} className="relative text-cream hover:text-vital transition-colors" aria-label="Open cart">
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-vital text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>
                )}
              </button>
            )}
            <Link to="/shop" className="hidden md:inline-block bg-vital hover:bg-vital-bright text-ink font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-[40px] transition-colors">
              {ORDERING_OPEN ? 'Order Now' : 'Explore Menu'}
            </Link>
            <button className="lg:hidden text-cream" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={24} /></button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-ink-deep lg:hidden overflow-y-auto">
          <div className="h-16 px-6 flex items-center justify-between border-b border-line">
            <Wordmark />
            <button onClick={() => setMenuOpen(false)} className="text-cream" aria-label="Close menu"><X size={24} /></button>
          </div>
          <nav className="px-6 pt-6 flex flex-col">
            <Link to="/" className="py-4 border-b border-line font-display font-bold text-xl text-cream hover:text-vital">Home</Link>
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="py-4 border-b border-line font-display font-bold text-xl text-cream hover:text-vital">{l.label}</Link>
            ))}
            <Link to="/shop" className="mt-8 bg-vital text-ink font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-[40px] text-center">
              {ORDERING_OPEN ? 'Order Now' : 'Explore Our Menu'}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
