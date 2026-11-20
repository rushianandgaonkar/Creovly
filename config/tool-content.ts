import type { FAQItem } from '@/types';

export interface ToolContent {
  about: string[];
  source?: { href: string; label: string };
  faqs: FAQItem[];
}

export const toolContent: Record<string, ToolContent> = {};
