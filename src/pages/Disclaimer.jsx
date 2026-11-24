import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { DISCLAIMER_CONTENT } from '@/lib/legalData';
import { useSEO } from '@/hooks/useSEO';

export default function Disclaimer() {
  useSEO({ title: 'Food & Allergen Information', description: "Important information about allergens, nutrition and storage for KORZAVO MEALS products.", path: '/disclaimer' });
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Food & Allergen Information."
      lastUpdated="Draft — pending review"
      intro="Important information about allergens, nutrition and storage for KORZAVO MEALS products."
      blocks={DISCLAIMER_CONTENT}
    />
  );
}
