import React from 'react';
import { Link } from 'react-router-dom';
import MealImage from '@/components/meals/MealImage';
import OrderButton from '@/components/meals/OrderButton';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }) {
  return (
    <article className="relative group flex flex-col bg-ink-surface border border-line rounded-sm overflow-hidden transition-colors hover:border-neon/70 card-glow">
      {product.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-vital px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ink">{product.badge}</span>}
      <Link to={`/products/${product.slug}`} className="block">
        <MealImage product={product} className="aspect-square" imgClassName="object-cover transition-transform duration-700 group-hover:scale-105" />
      </Link>
      <div className="flex flex-col flex-1 p-6">
        <div className="text-vital text-xs tracking-[0.25em] uppercase mb-2">{product.category} · {product.number}{product.portion_size ? ` — ${product.portion_size}` : ''}</div>
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-display font-extrabold text-xl md:text-2xl text-cream tracking-wide mb-3 hover:text-vital transition-colors">{product.name}</h3>
        </Link>
        <p className="text-ash leading-relaxed text-[15px] mb-6 flex-1">{product.description}</p>
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-line">
          <div>
            {product.portion_size ? (
              <>
                <div className="text-[10px] tracking-widest uppercase text-ash">Portion</div>
                <div className="text-cream text-sm">{product.portion_size}</div>
              </>
            ) : (
              <>
                <div className="text-[10px] tracking-widest uppercase text-neon">Included free</div>
                <div className="text-cream text-sm">Free soup with 3+ dinners</div>
              </>
            )}
          </div>
          <div className="text-right">
            <div className="font-display font-extrabold text-2xl text-neon">{formatPrice(product.price)}</div>
          </div>
        </div>
        <OrderButton product={product} className="mt-5 w-full" />
      </div>
    </article>
  );
}
