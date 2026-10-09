import type { Metadata } from 'next';
import { siteConfig, toolRegistry } from '@/config/site';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export function createPageMetadata({ title, description, path, noindex = false }: PageMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const socialTitle = path === '/' ? title : `${title} | ${siteConfig.name}`;

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.name,
      url,
      title: socialTitle,
      description,
    },
    twitter: { card: 'summary', title: socialTitle, description },
    robots: { index: !noindex, follow: true },
  };
}

export function getTool(slug: string) {
  const tool = toolRegistry.find((entry) => entry.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export function createToolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  return createPageMetadata({
    title: tool.title,
    description: tool.description,
    path: tool.href,
    noindex: tool.status !== 'available',
  });
}
