import type { Metadata } from 'next';
import { siteConfig, toolRegistry } from '@/config/site';
import {
  type Locale,
  defaultLocale,
  getOgLocale,
  getLanguageAlternates,
  stripLocale,
  translatePath,
  translations,
} from '@/config/i18n';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  locale?: Locale;
  keywords?: string[];
}

export function createPageMetadata({
  title,
  description,
  path,
  noindex = false,
  locale = defaultLocale,
  keywords,
}: PageMetadataOptions): Metadata {
  const canonicalPath = translatePath(path, locale);
  const url = new URL(canonicalPath, siteConfig.url).toString();
  const isHome = stripLocale(path) === '/';
  const socialTitle = isHome && locale === defaultLocale ? title : `${title} | ${siteConfig.name}`;
  const languageAlternates = getLanguageAlternates(path, siteConfig.url);

  return {
    title: isHome && locale === defaultLocale ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      siteName: siteConfig.name,
      url,
      title: socialTitle,
      description,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/og-image.png'],
    },
    robots: { index: !noindex, follow: true },
  };
}

export function getTool(slug: string) {
  const tool = toolRegistry.find((entry) => entry.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export function createToolMetadata(slug: string, locale: Locale = defaultLocale): Metadata {
  const tool = getTool(slug);
  const localeData = translations[locale]?.tools?.[slug];
  const title = localeData?.title || tool.title;
  const description = localeData?.description || tool.description;
  const keywords = localeData?.keywords;

  return createPageMetadata({
    title,
    description,
    path: tool.href,
    noindex: tool.status !== 'available',
    locale,
    keywords,
  });
}
