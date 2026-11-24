import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { PRIVACY_CONTENT } from '@/lib/legalData';
import { useSEO } from '@/hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO({ title: 'Privacy Policy', description: "This Privacy Policy explains how KORZAVO MEALS collects, uses and protects personal information when you visit our website, order meals or contact us.", path: '/privacy-policy' });
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy."
      lastUpdated="Draft — pending review"
      intro="This Privacy Policy explains how KORZAVO MEALS collects, uses and protects personal information when you visit our website, order meals or contact us."
      blocks={PRIVACY_CONTENT}
    />
  );
}
