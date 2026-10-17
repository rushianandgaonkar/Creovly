import type { ReactNode } from 'react';
import type { HeroTone } from '@/types';
import { GradientBackground } from './gradient-background-4';

export default function PageHero({ children, tone = 'indigo', className = '' }: { children: ReactNode; tone?: HeroTone; className?: string }) {
  return <div data-hero-tone={tone} className={`page-hero ${className}`}>
    <GradientBackground tone={tone} />
    <div className="page-hero-content">{children}</div>
  </div>;
}
