import type { MetadataRoute } from 'next';
import { siteConfig, toolRegistry } from '@/config/site';
import { guides } from '@/lib/guides';
import { nonDefaultLocales, getLanguageAlternates } from '@/config/i18n';
import { pageLastModified } from '@/config/page-dates';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const basePaths = [
    '',
    '/studio',
    '/checklist',
    '/tools',
    '/tools/thumbnail',
    '/guides',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    ...toolRegistry.map((tool) => tool.href),
    ...guides.map((guide) => `/guides/${guide.slug}`),
  ];

  const allBaseRoutes = basePaths.map((path) => ({ path, lastModified: pageLastModified[path] }));

  // 1. English canonical routes
  const englishEntries: MetadataRoute.Sitemap = allBaseRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    alternates: {
      languages: getLanguageAlternates(route.path || '/', baseUrl),
    },
  }));

  // 2. Localized routes for each non-default language
  const localizedEntries: MetadataRoute.Sitemap = [];
  for (const locale of nonDefaultLocales) {
    for (const route of allBaseRoutes) {
      const locPath = `/${locale}${route.path}`;
      localizedEntries.push({
        url: `${baseUrl}${locPath}`,
        lastModified: route.lastModified,
        alternates: {
          languages: getLanguageAlternates(route.path || '/', baseUrl),
        },
      });
    }
  }

  return [...englishEntries, ...localizedEntries];
}
