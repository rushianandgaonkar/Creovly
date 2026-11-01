import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { nonDefaultLocales, translations, type Locale } from '@/config/i18n';
import { createPageMetadata } from '@/lib/metadata';
import PolaroidLineCarousel from '@/components/ui/polaroid-line-carousel';
import CreatorHero from '@/components/home/CreatorHero';
import { toolRegistry } from '@/config/site';
import WorkflowShowcase from '@/components/home/WorkflowShowcase';
import WorkflowDestinations from '@/components/home/WorkflowDestinations';

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

      <WorkflowDestinations />
    </>
  );
}
