'use client';

import Button from '@/components/ui/Button';
import RippleBackground from '@/components/ui/interactive-ripple-background';
import { toolRegistry } from '@/config/site';
import StudioHeroWorkspace from './StudioHeroWorkspace';
import { useI18n, LocalizedLink } from '@/lib/i18n';

interface CreatorHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  launchStudioText?: string;
  exploreToolsText?: string;
  studioHref?: string;
  toolsHref?: string;
  locale?: string;
}

export default function CreatorHero({
  badge,
  title,
  subtitle,
  description,
  launchStudioText,
  exploreToolsText,
  studioHref = '/studio',
  toolsHref = '#tools',
}: CreatorHeroProps) {
  const { t } = useI18n();
  const count = toolRegistry.filter(tool => tool.status === 'available').length;

  const resolvedBadge = badge || t.home.hero.badge;
  const resolvedTitle = title || t.home.hero.title;
  const resolvedSubtitle = subtitle || t.home.hero.subtitle;
  const resolvedDescription = description || t.home.hero.description;
  const resolvedLaunchStudio = launchStudioText || t.home.hero.launchStudioText;
  const resolvedExploreTools = exploreToolsText || t.home.hero.exploreToolsText.replace('{count}', String(count));

  return (
    <section className="relative overflow-hidden pt-10 pb-6 sm:pt-14 sm:pb-10">
      <RippleBackground className="py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="max-w-3xl mx-auto">
            {/* Ambient Floating Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]/90 backdrop-blur shadow-[var(--shadow-button-elevated)] text-xs text-[var(--text-body)] mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
              <span className="font-medium">{resolvedBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-[var(--text-ink)] leading-[1.08]">
              <span>{resolvedTitle}</span>
              <span className="sr-only"> &mdash; </span>
              <span className="block text-xl sm:text-3xl font-medium text-[var(--text-muted)] mt-2.5 tracking-normal">
                {resolvedSubtitle}
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-body)] max-w-xl mx-auto leading-relaxed">
              {resolvedDescription}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LocalizedLink href={studioHref}>
                <Button variant="primary" size="lg">{resolvedLaunchStudio}</Button>
              </LocalizedLink>
              <Button href={toolsHref} variant="outline" size="lg">{resolvedExploreTools}</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {t.home.hero.clientSide}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" aria-hidden="true" />
                {t.home.hero.noAccount}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                {t.home.hero.zeroUploads}
              </span>
            </div>
          </div>

          {/* Flagship Interactive Studio Workspace Fragment */}
          <div className="pt-2 sm:pt-4">
            <StudioHeroWorkspace />
          </div>
        </div>
      </RippleBackground>
    </section>
  );
}
