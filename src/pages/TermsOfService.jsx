import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { TERMS_CONTENT } from '@/lib/legalData';
import { useSEO } from '@/hooks/useSEO';

export default function TermsOfService() {
  useSEO({ title: 'Terms of Service', description: "These Terms of Service govern your use of the KORZAVO MEALS website and purchases made through it.", path: '/terms-of-service' });
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms of Service."
      lastUpdated="Draft — pending review"
      intro="These Terms of Service govern your use of the KORZAVO MEALS website and purchases made through it."
      blocks={TERMS_CONTENT}
    />
  );
}
