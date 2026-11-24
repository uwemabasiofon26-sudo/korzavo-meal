import React from 'react';
import { Link } from 'react-router-dom';
import { EXTRAS_IMAGES, FREE_OFFERS } from '@/lib/productData';

const IMAGES = { breakfast: EXTRAS_IMAGES.breakfastCollage, soup: EXTRAS_IMAGES.soupCollage, dessert: EXTRAS_IMAGES.dessertCollection };
const LINKS = { breakfast: '/shop#breakfast', soup: '/shop#dinner', dessert: '/shop#desserts' };

// The three "included free" offers. compact = text only (no posters).
export default function FreeOffers({ compact = false }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {FREE_OFFERS.map((o) => (
        <Link
          key={o.key}
          to={LINKS[o.key]}
          className="group flex flex-col overflow-hidden rounded-sm border border-line bg-ink-surface card-glow"
        >
          {!compact && (
            <div className="flex aspect-[4/5] items-center justify-center bg-black">
              <img src={IMAGES[o.key]} alt={o.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neon">Included free</div>
            <h3 className="font-display text-xl font-extrabold leading-snug text-cream">{o.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{o.text}</p>
            <span className="mt-5 text-xs font-bold uppercase tracking-widest text-vital">See the options →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
