import type { HeroTone } from '@/types';

/** Static decoration; its parent supplies positioning and a readable content layer. */
export function GradientBackground({ tone = 'indigo' }: { tone?: HeroTone }) {
  return <div aria-hidden="true" data-hero-tone={tone} className="page-gradient-background" />;
}

export { GradientBackground as Component };
