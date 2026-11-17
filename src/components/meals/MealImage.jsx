import React, { useState } from 'react';

// Shows the meal photo; falls back to a branded placeholder until the
// photo file is added to /public/images/meals/.
export default function MealImage({ product, className = '', imgClassName = 'object-contain' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      {!failed && product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full ${imgClassName}`}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-ink-surface to-vital-dim/40">
          <span className="font-display font-black text-5xl md:text-6xl text-vital/80">{product.number || '★'}</span>
          <span className="mt-3 text-[11px] tracking-[0.25em] uppercase text-ash">Photo coming soon</span>
        </div>
      )}
    </div>
  );
}
