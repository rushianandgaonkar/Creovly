import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { nonDefaultLocales, translations, type Locale } from '@/config/i18n';
import { createPageMetadata, createToolMetadata } from '@/lib/metadata';
import { guides, getGuideBySlug } from '@/lib/guides';
import JsonLd from '@/components/seo/JsonLd';
import { toolWebApplicationJsonLd, guideArticleJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

// Import existing page components to avoid duplicate implementations
import StudioPage from '@/app/studio/page';
import ChecklistPage from '@/app/checklist/page';
import ToolsDirectoryPage from '@/app/tools/page';
import ThumbnailToolsPage from '@/app/tools/thumbnail/page';
import LogoBackgroundRemoverPage from '@/app/tools/logo-background-remover/page';
import ThumbnailCompressorPage from '@/app/tools/youtube-thumbnail-compressor/page';
import ThumbnailResizerPage from '@/app/tools/youtube-thumbnail-resizer/page';
import ShortsSafeZonePage from '@/app/tools/youtube-shorts-safe-zone/page';
import TitleCheckerPage from '@/app/tools/youtube-title-checker/page';
import RevenueCalculatorPage from '@/app/tools/youtube-revenue-calculator/page';
import RpmCalculatorPage from '@/app/tools/youtube-rpm-calculator/page';
import WatchHoursCalculatorPage from '@/app/tools/youtube-watch-hours-calculator/page';
import MonetizationCalculatorPage from '@/app/tools/youtube-monetization-calculator/page';
import GuidesPage from '@/app/guides/page';
import GuideArticle from '@/components/guides/GuideArticle';
import AboutPage from '@/app/about/page';
import ContactPage from '@/app/contact/page';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';

const staticSlugs = [
  ['studio'],
  ['checklist'],
  ['tools'],
  ['tools', 'thumbnail'],
  ['tools', 'logo-background-remover'],
  ['tools', 'youtube-thumbnail-compressor'],
  ['tools', 'youtube-thumbnail-resizer'],
  ['tools', 'youtube-shorts-safe-zone'],
  ['tools', 'youtube-title-checker'],
  ['tools', 'youtube-revenue-calculator'],
  ['tools', 'youtube-rpm-calculator'],
  ['tools', 'youtube-watch-hours-calculator'],
  ['tools', 'youtube-monetization-calculator'],
  ['guides'],
  ...guides.map((g) => ['guides', g.slug]),
  ['about'],
  ['contact'],
  ['privacy'],
  ['terms'],
];

export function generateStaticParams() {
  const params: { locale: string; slug: string[] }[] = [];
  for (const locale of nonDefaultLocales) {
    for (const slug of staticSlugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

interface LocalizedCatchAllProps {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: LocalizedCatchAllProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!nonDefaultLocales.includes(locale as Locale)) {
    return {};
  }
  const loc = locale as Locale;
  const content = translations[loc];
  const slugPath = slug.join('/');

  // Tool pages
  if (slug[0] === 'tools' && slug[1] && slug[1] !== 'thumbnail') {
    const toolSlug = slug[1];
    return createToolMetadata(toolSlug, loc);
  }

  // Category: tools/thumbnail
  if (slugPath === 'tools/thumbnail') {
    const t = content.tools['youtube-thumbnail-compressor'];
    return createPageMetadata({
      title: `${content.nav.tools} — ${t?.categoryLabel || 'Thumbnails'}`,
      description: content.toolsDirectory.description,
      path: '/tools/thumbnail',
      locale: loc,
      keywords: t?.keywords,
    });
  }

  // Tools directory
  if (slugPath === 'tools') {
    return createPageMetadata({
      title: content.toolsDirectory.title,
      description: content.toolsDirectory.description,
      path: '/tools',
      locale: loc,
      keywords: [content.toolsDirectory.title, ...Object.values(content.tools).map((x) => x.title)],
    });
  }

  // Studio
  if (slugPath === 'studio') {
    return createPageMetadata({
      title: content.studio.title,
      description: content.studio.description,
      path: '/studio',
      locale: loc,
    });
  }

  // Checklist
  if (slugPath === 'checklist') {
    return createPageMetadata({
      title: content.checklist.title,
      description: content.checklist.description,
      path: '/checklist',
      locale: loc,
    });
  }

  // Guides index
  if (slugPath === 'guides') {
    return createPageMetadata({
      title: `${content.guidesIndex.title}`,
      description: content.guidesIndex.description,
      path: '/guides',
      locale: loc,
    });
  }

  // Individual guides
  if (slug[0] === 'guides' && slug[1]) {
    const guide = getGuideBySlug(slug[1]);
    if (guide) {
      return createPageMetadata({
        title: guide.title,
        description: guide.description,
        path: `/guides/${guide.slug}`,
        locale: loc,
      });
    }
  }

  // About
  if (slugPath === 'about') {
    return createPageMetadata({
      title: content.about.title,
      description: content.about.description,
      path: '/about',
      locale: loc,
    });
  }

  // Contact
  if (slugPath === 'contact') {
    return createPageMetadata({
      title: content.contact.title,
      description: content.contact.description,
      path: '/contact',
      locale: loc,
    });
  }

  // Privacy
  if (slugPath === 'privacy') {
    return createPageMetadata({
      title: content.privacy.title,
      description: content.privacy.description,
      path: '/privacy',
      locale: loc,
    });
  }

  // Terms
  if (slugPath === 'terms') {
    return createPageMetadata({
      title: content.terms.title,
      description: content.terms.description,
      path: '/terms',
      locale: loc,
    });
  }

  return {};
}

export default async function LocalizedPage({ params }: LocalizedCatchAllProps) {
  const { locale, slug } = await params;
  if (!nonDefaultLocales.includes(locale as Locale)) {
    notFound();
  }

  const slugPath = slug.join('/');

  const loc = locale as Locale;

  // Helper to render tool pages with locale-specific structured data
  const toolPageMap: Record<string, React.ReactNode> = {
    'tools/logo-background-remover': <LogoBackgroundRemoverPage />,
    'tools/youtube-thumbnail-compressor': <ThumbnailCompressorPage />,
    'tools/youtube-thumbnail-resizer': <ThumbnailResizerPage />,
    'tools/youtube-shorts-safe-zone': <ShortsSafeZonePage />,
    'tools/youtube-title-checker': <TitleCheckerPage />,
    'tools/youtube-revenue-calculator': <RevenueCalculatorPage />,
    'tools/youtube-rpm-calculator': <RpmCalculatorPage />,
    'tools/youtube-watch-hours-calculator': <WatchHoursCalculatorPage />,
    'tools/youtube-monetization-calculator': <MonetizationCalculatorPage />,
  };

  if (slug[0] === 'tools' && slug[1] && toolPageMap[slugPath]) {
    const toolSlug = slug[1];
    const schemas = [
      toolWebApplicationJsonLd(toolSlug, loc),
      breadcrumbJsonLd([
        { name: 'Tools', href: '/tools' },
        { name: translations[loc]?.tools?.[toolSlug]?.title || toolSlug, href: `/tools/${toolSlug}` },
      ], loc),
    ].filter(Boolean);

    return (
      <>
        <JsonLd data={schemas as Record<string, unknown>[]} />
        {toolPageMap[slugPath]}
      </>
    );
  }

  switch (slugPath) {
    case 'studio':
      return <StudioPage />;
    case 'checklist':
      return <ChecklistPage />;
    case 'tools':
      return <ToolsDirectoryPage />;
    case 'tools/thumbnail':
      return <ThumbnailToolsPage />;
    case 'guides':
      return <GuidesPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    case 'privacy':
      return <PrivacyPage />;
    case 'terms':
      return <TermsPage />;
    default:
      if (slug[0] === 'guides' && slug[1]) {
        const guide = getGuideBySlug(slug[1]);
        if (!guide) notFound();
        const guideSchemas = [
          guideArticleJsonLd(guide, loc),
          breadcrumbJsonLd([
            { name: 'Guides', href: '/guides' },
            { name: guide.title, href: `/guides/${guide.slug}` },
          ], loc),
        ];
        return (
          <>
            <JsonLd data={guideSchemas} />
            <GuideArticle guide={guide} />
          </>
        );
      }
      notFound();
  }
}

