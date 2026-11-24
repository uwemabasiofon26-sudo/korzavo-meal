import React from 'react';

const ITEMS = ['HEALTHY MEALS. REAL RESULTS.', '3 FREE BREAKFASTS WITH 5+ LUNCHES', 'CHEF-CRAFTED', 'FREE SOUP WITH 3+ DINNERS', 'HIGH PROTEIN', 'BOLD FLAVOURS', 'FRESH · TAURANGA, NZ'];

// Scrolling neon ticker strip under the hero.
export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line bg-black py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee-x">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-display font-black text-sm md:text-base tracking-[0.25em] uppercase text-cream/90">
                {t}
                <span className={`mx-8 inline-block h-2 w-2 rotate-45 ${i % 2 ? 'bg-neon' : 'bg-vital'}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
