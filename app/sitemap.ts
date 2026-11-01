import type { MetadataRoute } from 'next';
import { siteConfig, toolRegistry } from '@/config/site';
import { guides } from '@/lib/guides';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2026-11-01',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/studio`,
      lastModified: '2026-11-01',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/checklist`,
      lastModified: '2026-11-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: '2026-11-01',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/thumbnail`,
      lastModified: '2026-11-01',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: '2026-10-31',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2026-11-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2026-11-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2026-11-01',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: '2026-10-31',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolRegistry.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: '2026-11-01',
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: '2026-10-31',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...guideRoutes];
}
