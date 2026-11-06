import { createPageMetadata } from '@/lib/metadata';
import PrivacyContent from '@/components/pages/PrivacyContent';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'Creovly runs 100% in your browser. See how our tools, local storage, analytics and ads handle your data. Your files never leave your device.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
