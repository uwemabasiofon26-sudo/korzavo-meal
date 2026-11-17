import React from 'react';
import { cn } from '@/lib/utils';

// KORZAVO MEALS logo (circular). Size it with className, e.g. "h-12 w-12".
export default function Wordmark({ className = 'h-11 w-11 md:h-12 md:w-12' }) {
  return (
    <img
      src="/images/korzavo-meals-logo.jpg"
      alt="KORZAVO MEALS"
      className={cn('rounded-full object-cover', className)}
    />
  );
}
