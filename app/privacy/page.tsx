import { createPageMetadata } from '@/lib/metadata';
import PrivacyContent from '@/components/pages/PrivacyContent';

export const metadata = createPageMetadata({
  title: 'Privacy Policy — Creovly',
  description:
    'Creovly is engineered with a strict 100% local, client-side privacy architecture. Learn how our browser tools, local storage, analytics, and advertising policies protect your data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
