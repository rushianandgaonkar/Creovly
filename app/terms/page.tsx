import { createPageMetadata } from '@/lib/metadata';
import TermsContent from '@/components/pages/TermsContent';

export const metadata = createPageMetadata({
  title: 'Terms of Service — Creovly',
  description:
    'Review the terms of service, acceptable use guidelines, and creator intellectual property rights for Creovly.',
  path: '/terms',
});

export default function TermsPage() {
  return <TermsContent />;
}
