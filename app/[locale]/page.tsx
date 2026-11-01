import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { nonDefaultLocales, translations, type Locale } from '@/config/i18n';
import { createPageMetadata } from '@/lib/metadata';
import Button from '@/components/ui/Button';
import PolaroidLineCarousel from '@/components/ui/polaroid-line-carousel';
import CreatorHero from '@/components/home/CreatorHero';
import { toolRegistry } from '@/config/site';
import SpotlightCard from '@/components/ui/SpotlightCard';
import WorkflowShowcase from '@/components/home/WorkflowShowcase';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

interface LocalizedPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!nonDefaultLocales.includes(locale as Locale)) {
    return {};
  }
  const loc = locale as Locale;
  const content = translations[loc];
  return createPageMetadata({
    title: `${content.home.title} | Creovly`,
    description: content.home.description,
    path: `/${loc}`,
    locale: loc,
    keywords: [
      content.home.title,
      content.home.subtitle,
      ...Object.values(content.tools).map((t) => t.title),
    ],
  });
}

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  if (!nonDefaultLocales.includes(locale as Locale)) {
    notFound();
  }
  const loc = locale as Locale;
  const content = translations[loc];

  // Map tool registry with localized titles and descriptions
  const localizedTools = toolRegistry
    .filter((t) => t.status === 'available')
    .map((tool) => {
      const toolTrans = content.tools[tool.slug];
      return {
        ...tool,
        title: toolTrans?.title || tool.title,
        description: toolTrans?.description || tool.description,
        categoryLabel: toolTrans?.categoryLabel || tool.categoryLabel,
        href: `/${loc}${tool.href}`,
      };
    });

  return (
    <>
      <CreatorHero
        badge={content.home.badge}
        title={content.home.title}
        subtitle={content.home.subtitle}
        description={content.home.description}
        launchStudioText={content.home.launchStudio}
        exploreToolsText={content.home.exploreTools}
        studioHref={`/${loc}/studio`}
        toolsHref={`#tools`}
        locale={loc}
      />

      {/* Primary tool discovery */}
      <div id="tools" className="home-tools max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 scroll-mt-6">
        <PolaroidLineCarousel tools={localizedTools} />
      </div>

      <WorkflowShowcase />

      {/* Pre-Publish Workflow Destinations */}
      <section aria-label="Pre-publish workflow options" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[var(--border-hairline)] pt-8">
          <SpotlightCard as="article" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                {content.nav.checklist}
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
              {content.home.checklistTitle}
            </h2>
            <p className="text-sm text-[var(--text-body)] leading-relaxed">
              {content.home.checklistDesc}
            </p>
            <div className="pt-2">
              <Button href={`/${loc}/checklist`} variant="outline">
                {content.home.openChecklist} &rarr;
              </Button>
            </div>
          </SpotlightCard>

          <SpotlightCard as="article" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                {content.nav.studio}
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-ink)]">
              {content.home.studioTitle}
            </h2>
            <p className="text-sm text-[var(--text-body)] leading-relaxed">
              {content.home.studioDesc}
            </p>
            <div className="pt-2">
              <Button href={`/${loc}/studio`} variant="outline">
                {content.home.openStudio} &rarr;
              </Button>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </>
  );
}

