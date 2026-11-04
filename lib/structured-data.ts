import { siteConfig, toolRegistry } from '@/config/site';
import type { Locale } from '@/config/i18n';
import { defaultLocale, translatePath, translations } from '@/config/i18n';

interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Generate BreadcrumbList JSON-LD for any page.
 * Always starts with Home → then each segment.
 */
export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  locale: Locale = defaultLocale,
) {
  const homeLabel = 'Home';
  const homePath = locale === defaultLocale ? '/' : `/${locale}`;

  const allItems: BreadcrumbItem[] = [
    { name: homeLabel, href: homePath },
    ...items,
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(translatePath(item.href, locale), siteConfig.url).toString(),
    })),
  };
}

/**
 * Generate WebApplication JSON-LD for an individual tool page.
 */
export function toolWebApplicationJsonLd(
  toolSlug: string,
  locale: Locale = defaultLocale,
) {
  const tool = toolRegistry.find((t) => t.slug === toolSlug);
  if (!tool) return null;

  const localeData = translations[locale]?.tools?.[toolSlug];
  const title = localeData?.title || tool.title;
  const description = localeData?.description || tool.description;
  const path = translatePath(tool.href, locale);
  const url = new URL(path, siteConfig.url).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name: title,
    url,
    description,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any (Modern Web Browser)',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
  };
}

/**
 * Generate Article JSON-LD for a guide page.
 */
export function guideArticleJsonLd(guide: {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  lastVerified: string;
}, locale: Locale = defaultLocale) {
  const path = translatePath(`/guides/${guide.slug}`, locale);
  const url = new URL(path, siteConfig.url).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.title,
    description: guide.description,
    url,
    image: `${siteConfig.url}/og-image.png`,
    author: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    articleSection: guide.category,
    inLanguage: locale === defaultLocale ? 'en' : locale,
  };
}
