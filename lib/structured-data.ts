import { siteConfig, toolRegistry } from '@/config/site';
import type { Locale } from '@/config/i18n';
import { defaultLocale, translatePath, translations } from '@/config/i18n';
import { getMessages } from '@/messages';
import { tools as enTools } from '@/messages/en/tools';
import { getLocalizedGuide } from '@/config/guides-i18n';

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
  const messages = getMessages(locale);
  const homeLabel = messages?.tools?.shell?.breadcrumbHome || 'Home';
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
 * Generate WebSite JSON-LD with SearchAction for the homepage.
 */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization JSON-LD with site name, url, logo, and links.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.svg`,
    description: siteConfig.description,
    sameAs: [siteConfig.links.github].filter(Boolean),
  };
}

/**
 * Generate SoftwareApplication JSON-LD for an individual tool page.
 * Follows Google Structured Data guidelines for SoftwareApplication / UtilityApplication.
 */
export function toolSoftwareApplicationJsonLd(
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
    '@type': 'SoftwareApplication',
    '@id': `${url}#app`,
    name: title,
    url,
    description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
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
      logo: `${siteConfig.url}/favicon.svg`,
    },
  };
}

// Backward-compatibility alias
export const toolWebApplicationJsonLd = toolSoftwareApplicationJsonLd;

const slugToFaqKey: Record<string, string> = {
  'youtube-thumbnail-compressor': 'compressor',
  'youtube-thumbnail-resizer': 'resizer',
  'logo-background-remover': 'logoRemover',
  'youtube-shorts-safe-zone': 'shorts',
  'youtube-title-checker': 'titleChecker',
  'youtube-revenue-calculator': 'revenue',
  'youtube-rpm-calculator': 'rpm',
  'youtube-watch-hours-calculator': 'watchHours',
  'youtube-monetization-calculator': 'monetization',
};

/**
 * Generate FAQPage JSON-LD wrapping the FAQ section for an individual tool page.
 */
export function toolFaqJsonLd(toolSlug: string, locale: Locale = defaultLocale) {
  const faqKey = slugToFaqKey[toolSlug];
  if (!faqKey) return null;

  const messages = getMessages(locale);
  const faqs = (messages.tools?.faqs as Record<string, { question: string; answer: string }[]>)?.[faqKey]
    || (enTools.faqs as Record<string, { question: string; answer: string }[]>)[faqKey];

  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
  const locGuide = getLocalizedGuide(guide.slug, locale);
  const headline = locGuide?.title || guide.title;
  const description = locGuide?.description || guide.description;
  const category = locGuide?.category || guide.category;
  const path = translatePath(`/guides/${guide.slug}`, locale);
  const url = new URL(path, siteConfig.url).toString();
  const ogImageSlug = guide.slug === 'youtube-shorts-safe-zone' ? 'guide-youtube-shorts-safe-zone' : guide.slug;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline,
    description,
    url,
    image: `${siteConfig.url}/og/${ogImageSlug}.png`,
    datePublished: '2026-10-01T00:00:00Z',
    dateModified: '2026-11-03T00:00:00Z',
    author: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    inLanguage: locale === defaultLocale ? 'en' : locale,
  };
}

/**
 * Generate FAQPage JSON-LD for a guide page.
 */
export function guideFaqJsonLd(slug: string, locale: Locale = defaultLocale) {
  const locGuide = getLocalizedGuide(slug, locale);
  const faqs = locGuide?.faqs;
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
