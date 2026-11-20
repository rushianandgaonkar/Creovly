'use client';

import Button from '@/components/ui/Button';
import { toolRegistry } from '@/config/site';
import StudioHeroWorkspace from './StudioHeroWorkspace';
import { useI18n, LocalizedLink } from '@/lib/i18n';

interface CreatorHeroProps {
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

  const resolvedTitle = title || t.home.hero.title;
  const resolvedSubtitle = subtitle || t.home.hero.subtitle;
  const resolvedDescription = description || t.home.hero.description;
  const resolvedLaunchStudio = launchStudioText || t.home.hero.launchStudioText;
  const resolvedExploreTools = exploreToolsText || t.home.hero.exploreToolsText.replace('{count}', String(count));

  return (
    <section className="hero-aurora relative overflow-hidden pt-8 pb-4 sm:pt-16 sm:pb-10">
      <div className="relative py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.045em] text-[var(--text-ink)] leading-[1.05]">
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
              <Button href={toolsHref} variant="primary" size="lg">{resolvedExploreTools}</Button>
              <LocalizedLink href={studioHref}>
                <Button variant="outline" size="lg">{resolvedLaunchStudio}</Button>
              </LocalizedLink>
            </div>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[var(--text-muted)]">
              <span>{t.home.hero.clientSide}</span>
              <span className="h-3 w-px bg-[var(--border-hairline-strong)]" aria-hidden="true" />
              <span>{t.home.hero.noAccount}</span>
            </p>
          </div>

          {/* Flagship Interactive Studio Workspace Fragment */}
          <div className="hidden md:block pt-2 sm:pt-4">
            <StudioHeroWorkspace />
          </div>
        </div>
      </div>
    </section>
  );
}
