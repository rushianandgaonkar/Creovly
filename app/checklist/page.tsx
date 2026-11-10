import { createPageMetadata } from '@/lib/metadata';
import ChecklistClient from './ChecklistClient';

export const metadata = createPageMetadata({
  title: 'Pre-Publish Creator Checklist',
  description: 'Prepare your next YouTube upload with an interactive pre-publish checklist covering title, thumbnail, description, tags and settings. Progress is saved in your browser.',
  path: '/checklist',
  noindex: false,
});

export default function ChecklistPage() {
  return <ChecklistClient />;
}
