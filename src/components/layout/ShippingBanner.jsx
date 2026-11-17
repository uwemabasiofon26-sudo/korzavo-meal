import React from 'react';
import { ORDERING_OPEN } from '@/lib/productData';

export default function ShippingBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-vital text-ink flex items-center justify-center px-4 overflow-hidden">
      <p className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center leading-tight">
        {ORDERING_OPEN ? 'Fresh, high-protein meals · Tauranga, NZ' : 'Launching soon in Tauranga, NZ · Ordering opens soon'}
      </p>
    </div>
  );
}
