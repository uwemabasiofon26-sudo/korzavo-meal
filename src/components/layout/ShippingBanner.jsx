import React from 'react';
import { ORDERING_OPEN } from '@/lib/productData';
import { useOrderLocation } from '@/lib/useOrderLocation';

export default function ShippingBanner() {
  const { blocked } = useOrderLocation();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-vital text-ink flex items-center justify-center px-4 overflow-hidden">
      <p className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center leading-tight">
        {blocked ? 'Browse freely · ordering is for Tauranga, NZ only' : ORDERING_OPEN ? 'Fresh, high-protein meals · Tauranga, NZ' : 'Launching soon in Tauranga, NZ'}
      </p>
    </div>
  );
}
