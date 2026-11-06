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
  ogImage?: string;
}

// Titles get " | Creovly" from the root layout's title template, so drop any
// brand suffix already baked into a title (e.g. "Contacto — Creovly").
const BRAND_SUFFIX = new RegExp(`\\s*[—–|-]\\s*${siteConfig.name}\\s*$`, 'u');

export function stripBrandSuffix(title: string): string {
  return title.replace(BRAND_SUFFIX, '').trim();
}

export function createPageMetadata({
  title,
  description,
  path,
  noindex = false,
  locale = defaultLocale,
  keywords,
  ogImage,
}: PageMetadataOptions): Metadata {
  title = stripBrandSuffix(title);
  const canonicalPath = translatePath(path, locale);
  const url = new URL(canonicalPath, siteConfig.url).toString();
  const isHome = stripLocale(path) === '/';
  const socialTitle = isHome && locale === defaultLocale ? title : `${title} | ${siteConfig.name}`;
  const languageAlternates = getLanguageAlternates(path, siteConfig.url);
  const selectedOgImage = ogImage || '/og-image.png';

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
          url: selectedOgImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [selectedOgImage],
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
  const title = localeData?.seoTitle || tool.seoTitle || localeData?.title || tool.title;
  const description = localeData?.description || tool.description;
  const keywords = localeData?.keywords;

  return createPageMetadata({
    title,
    description,
    path: tool.href,
    noindex: tool.status !== 'available',
    locale,
    keywords,
    ogImage: `/og/${slug}.png`,
  });
}
