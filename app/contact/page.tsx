import { createPageMetadata } from '@/lib/metadata';
import ContactContent from '@/components/contact/ContactContent';

export const metadata = createPageMetadata({
  title: 'Contact Us — Creovly',
  description:
    'Have feedback, a feature suggestion, or questions about Creovly? Reach out to our team and we will get back to you.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactContent />;
}
