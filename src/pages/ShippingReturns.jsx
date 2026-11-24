import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { SHIPPING_CONTENT } from '@/lib/legalData';
import { useSEO } from '@/hooks/useSEO';

export default function ShippingReturns() {
  useSEO({ title: 'Delivery & Refunds', description: "How we deliver KORZAVO MEALS orders, and what happens if something is wrong with your order.", path: '/shipping-returns' });
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Delivery & Refunds."
      lastUpdated="Draft — pending review"
      intro="How we deliver KORZAVO MEALS orders, and what happens if something is wrong with your order."
      blocks={SHIPPING_CONTENT}
    />
  );
}
