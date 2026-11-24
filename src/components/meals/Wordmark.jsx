import React from 'react';
import { cn } from '@/lib/utils';

// KORZAVO MEALS logo (neon red and cyan, transparent background).
export default function Wordmark({ className = 'h-10 md:h-12' }) {
  return (
    <img
      src="/images/korzavo-meals-logo.png"
      alt="KORZAVO MEALS"
      className={cn('w-auto object-contain', className)}
    />
  );
}
