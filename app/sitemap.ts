import type { MetadataRoute } from 'next';
import { siteConfig, toolRegistry } from '@/config/site';
import { guides } from '@/lib/guides';
import { nonDefaultLocales, getLanguageAlternates } from '@/config/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const latestVerifiedDate = '2026-11-03';
  const editorialDate = '2026-10-31';

  const baseStaticRoutes = [
    { path: '', lastModified: latestVerifiedDate },
    { path: '/studio', lastModified: latestVerifiedDate },
    { path: '/checklist', lastModified: latestVerifiedDate },
    { path: '/tools', lastModified: latestVerifiedDate },
    { path: '/tools/thumbnail', lastModified: latestVerifiedDate },
    { path: '/guides', lastModified: editorialDate },
    { path: '/about', lastModified: latestVerifiedDate },
    { path: '/contact', lastModified: latestVerifiedDate },
    { path: '/privacy', lastModified: latestVerifiedDate },
    { path: '/terms', lastModified: editorialDate },
  ];

  const baseToolRoutes = toolRegistry.map((tool) => ({
    path: tool.href,
    lastModified: latestVerifiedDate,
  }));

  const baseGuideRoutes = guides.map((guide) => ({
    path: `/guides/${guide.slug}`,
    lastModified: editorialDate,
  }));

  const allBaseRoutes = [...baseStaticRoutes, ...baseToolRoutes, ...baseGuideRoutes];

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
