import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { guides, getGuideBySlug } from '@/lib/guides';
import { createPageMetadata } from '@/lib/metadata';
import GuideArticle from '@/components/guides/GuideArticle';

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
      title: 'Guide Not Found — Creovly',
      description: 'The requested creator guide could not be found.',
      path: '/guides',
      noindex: true,
    });
  }

  return createPageMetadata({
    title: `${guide.title} — Creovly`,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return <GuideArticle guide={guide} />;
}
