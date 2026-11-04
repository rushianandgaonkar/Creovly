import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { nonDefaultLocales, translations, type Locale } from '@/config/i18n';
import { createPageMetadata, createToolMetadata } from '@/lib/metadata';
import { siteConfig, toolRegistry } from '@/config/site';
import { guides, getGuideBySlug } from '@/lib/guides';
import { getLocalizedGuide } from '@/config/guides-i18n';
import JsonLd from '@/components/seo/JsonLd';
import {
  toolSoftwareApplicationJsonLd,
  toolFaqJsonLd,
  guideArticleJsonLd,
  guideFaqJsonLd,
  breadcrumbJsonLd,
} from '@/lib/structured-data';

// Import reusable components
import StudioPage from '@/app/studio/page';
import ChecklistPage from '@/app/checklist/page';
import ToolsDirectoryContent from '@/components/tools/ToolsDirectoryContent';
import ThumbnailToolsContent from '@/components/pages/ThumbnailToolsContent';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailCompressor from '@/components/tools/ThumbnailCompressor';
import ThumbnailResizer from '@/components/tools/ThumbnailResizer';
import styles from '@/components/ui/artwork.module.css';
import LogoBackgroundRemover from '@/components/tools/LogoBackgroundRemover';
import ShortsSafeZone from '@/components/tools/ShortsSafeZone';
import TitleChecker from '@/components/tools/TitleChecker';
import CalculatorPage from '@/components/tools/CalculatorPage';
import GuidesContent from '@/components/guides/GuidesContent';
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
      ogImage: '/og/tools.png',
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
      ogImage: '/og/tools.png',
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
      ogImage: '/og/guides.png',
    });
  }

  // Individual guides
  if (slug[0] === 'guides' && slug[1]) {
    const guide = getGuideBySlug(slug[1]);
    if (guide) {
      const locGuide = getLocalizedGuide(guide.slug, loc);
      const title = locGuide?.title || guide.title;
      const description = locGuide?.description || guide.description;
      const ogImage =
        guide.slug === 'youtube-shorts-safe-zone'
          ? '/og/guide-youtube-shorts-safe-zone.png'
          : `/og/${guide.slug}.png`;
      return createPageMetadata({
        title,
        description,
        path: `/guides/${guide.slug}`,
        locale: loc,
        ogImage,
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
      ogImage: '/og/about.png',
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
  const content = translations[loc];

  // Localized individual tool pages
  if (slug[0] === 'tools' && slug[1] && slug[1] !== 'thumbnail') {
    const toolSlug = slug[1];
    const tool = toolRegistry.find((t) => t.slug === toolSlug);
    if (!tool) notFound();

    const schemas = [
      toolSoftwareApplicationJsonLd(toolSlug, loc),
      toolFaqJsonLd(toolSlug, loc),
      breadcrumbJsonLd([
        { name: content.nav.tools, href: '/tools' },
        { name: translations[loc]?.tools?.[toolSlug]?.title || toolSlug, href: `/tools/${toolSlug}` },
      ], loc),
    ].filter(Boolean);

    let toolComponent: React.ReactNode = null;
    switch (toolSlug) {
      case 'youtube-thumbnail-compressor':
        toolComponent = (
          <ToolPageShell
            title={tool.title}
            description={tool.description}
            category={tool.categoryLabel}
            categoryHref="/tools/thumbnail"
            toolSlug={tool.slug}
          >
            <ThumbnailCompressor />
          </ToolPageShell>
        );
        break;
      case 'youtube-thumbnail-resizer':
        toolComponent = (
          <ToolPageShell
            className={styles.page}
            title={tool.title}
            description={tool.description}
            category="Thumbnail Tools"
            categoryHref="/tools/thumbnail"
            toolSlug={tool.slug}
          >
            <ThumbnailResizer />
          </ToolPageShell>
        );
        break;
      case 'logo-background-remover':
        toolComponent = (
          <ToolPageShell
            title={tool.title}
            description={tool.description}
            category="Thumbnail Tools"
            categoryHref="/tools/thumbnail"
            toolSlug={tool.slug}
          >
            <LogoBackgroundRemover />
          </ToolPageShell>
        );
        break;
      case 'youtube-shorts-safe-zone':
        toolComponent = (
          <ToolPageShell
            title={tool.title}
            description={tool.description}
            category="Thumbnail Tools"
            categoryHref="/tools/thumbnail"
            toolSlug={tool.slug}
          >
            <ShortsSafeZone />
          </ToolPageShell>
        );
        break;
      case 'youtube-title-checker':
        toolComponent = (
          <ToolPageShell
            title={tool.title}
            description={tool.description}
            category="Title Tools"
            categoryHref="/tools#title"
            toolSlug={tool.slug}
          >
            <TitleChecker />
          </ToolPageShell>
        );
        break;
      case 'youtube-revenue-calculator':
        toolComponent = <CalculatorPage kind="revenue" slug="youtube-revenue-calculator" />;
        break;
      case 'youtube-rpm-calculator':
        toolComponent = <CalculatorPage kind="rpm" slug="youtube-rpm-calculator" />;
        break;
      case 'youtube-watch-hours-calculator':
        toolComponent = <CalculatorPage kind="watch-hours" slug="youtube-watch-hours-calculator" />;
        break;
      case 'youtube-monetization-calculator':
        toolComponent = <CalculatorPage kind="monetization" slug="youtube-monetization-calculator" />;
        break;
      default:
        notFound();
    }

    return (
      <>
        <JsonLd data={schemas as Record<string, unknown>[]} />
        {toolComponent}
      </>
    );
  }

  switch (slugPath) {
    case 'studio':
      return <StudioPage />;
    case 'checklist':
      return <ChecklistPage />;
    case 'tools':
      return (
        <>
          <JsonLd data={breadcrumbJsonLd([{ name: content.nav.tools, href: '/tools' }], loc)} />
          <ToolsDirectoryContent />
        </>
      );
    case 'tools/thumbnail': {
      const t = content.tools['youtube-thumbnail-compressor'];
      return (
        <>
          <JsonLd data={breadcrumbJsonLd([
            { name: content.nav.tools, href: '/tools' },
            { name: t?.categoryLabel || 'Thumbnails', href: '/tools/thumbnail' },
          ], loc)} />
          <ThumbnailToolsContent />
        </>
      );
    }
    case 'guides':
      return (
        <>
          <JsonLd data={breadcrumbJsonLd([{ name: content.nav.guides, href: '/guides' }], loc)} />
          <GuidesContent />
        </>
      );
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
        const locGuide = getLocalizedGuide(guide.slug, loc);
        const guideTitle = locGuide?.title || guide.title;
        const guideSchemas = [
          guideArticleJsonLd(guide, loc),
          guideFaqJsonLd(guide.slug, loc),
          breadcrumbJsonLd([
            { name: content.nav.guides || 'Guides', href: '/guides' },
            { name: guideTitle, href: `/guides/${guide.slug}` },
          ], loc),
        ].filter(Boolean);
        return (
          <>
            <JsonLd data={guideSchemas as Record<string, unknown>[]} />
            <GuideArticle guide={guide} />
          </>
        );
      }
      notFound();
  }
}
