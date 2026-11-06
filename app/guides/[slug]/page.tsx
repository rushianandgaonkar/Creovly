import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { guides, getGuideBySlug, getGuideOgImage } from '@/lib/guides';
import { createPageMetadata } from '@/lib/metadata';
import GuideArticle from '@/components/guides/GuideArticle';
import JsonLd from '@/components/seo/JsonLd';
import { guideArticleJsonLd, guideFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return createPageMetadata({
      title: 'Guide Not Found',
      description: 'The requested creator guide could not be found.',
      path: '/guides',
      noindex: true,
    });
  }

  const ogImage = getGuideOgImage(slug);

  return createPageMetadata({
    title: guide.seoTitle || guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    ogImage,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const schemas = [
    guideArticleJsonLd(guide),
    guideFaqJsonLd(guide.slug),
    breadcrumbJsonLd([
      { name: 'Guides', href: '/guides' },
      { name: guide.title, href: `/guides/${guide.slug}` },
    ]),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />
      <GuideArticle guide={guide} />
    </>
  );
}
