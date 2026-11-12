import type { ReactNode } from 'react';
import type { HeroTone } from '@/types';

/** Paper page hero; `tone` colors the small category tab (see `.page-hero` in globals.css). */
export default function PageHero({ children, tone = 'indigo', className = '' }: { children: ReactNode; tone?: HeroTone; className?: string }) {
  return <div data-hero-tone={tone} className={`page-hero ${className}`}>{children}</div>;
}
