import type { MetadataRoute } from 'next';
import { siteConfig, toolRegistry } from '@/config/site';
import { guides } from '@/lib/guides';
import { nonDefaultLocales, getLanguageAlternates } from '@/config/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const baseStaticRoutes = [
    { path: '', lastModified: '2026-11-01', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/studio', lastModified: '2026-11-01', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/checklist', lastModified: '2026-11-01', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/tools', lastModified: '2026-11-01', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/tools/thumbnail', lastModified: '2026-11-01', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/guides', lastModified: '2026-10-31', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/about', lastModified: '2026-11-01', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', lastModified: '2026-11-01', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy', lastModified: '2026-11-01', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/terms', lastModified: '2026-10-31', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const baseToolRoutes = toolRegistry.map((tool) => ({
    path: tool.href,
    lastModified: '2026-11-01',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const baseGuideRoutes = guides.map((guide) => ({
    path: `/guides/${guide.slug}`,
    lastModified: '2026-10-31',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allBaseRoutes = [...baseStaticRoutes, ...baseToolRoutes, ...baseGuideRoutes];

  // 1. English canonical routes
  const englishEntries: MetadataRoute.Sitemap = allBaseRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
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
        changeFrequency: route.changeFrequency,
        priority: Math.max(0.4, Number((route.priority * 0.9).toFixed(2))),
        alternates: {
          languages: getLanguageAlternates(route.path || '/', baseUrl),
        },
      });
    }
  }

  return [...englishEntries, ...localizedEntries];
}
