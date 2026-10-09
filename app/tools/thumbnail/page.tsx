import Link from 'next/link';
import { toolRegistry } from '@/config/site';
import { createPageMetadata } from '@/lib/metadata';
import ToolCard from '@/components/ui/ToolCard';
import Button from '@/components/ui/Button';

export const metadata = createPageMetadata({ title: 'Thumbnail Tools', description: 'Prepare your YouTube thumbnail with local resizing and compression, and manual Shorts framing guides.', path: '/tools/thumbnail' });

export default function ThumbnailToolsPage() {
  const tools = toolRegistry.filter((tool) => tool.category === 'thumbnail');
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-xs text-[var(--text-body)] mb-6"><Link href="/tools" className="hover:underline focus-ring">Creator tools</Link> <span aria-hidden="true">/</span> <span aria-current="page">Thumbnail</span></nav>
      <div className="max-w-2xl mb-10">
        <p className="text-xs font-mono text-[var(--brand-accent)] mb-2">Thumbnail preparation</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Get your thumbnail ready.</h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-body)] leading-relaxed">Choose your dimensions and framing, then compress the final image if needed. Resize and compress locally, or review a still Shorts frame with adjustable planning margins.</p>
        <div className="mt-6"><Button href="/tools/youtube-thumbnail-compressor" variant="pill-primary">Compress a thumbnail &rarr;</Button></div>
      </div>
      <section aria-labelledby="thumbnail-tools-heading">
        <h2 id="thumbnail-tools-heading" className="text-lg font-semibold mb-4">Thumbnail tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((tool) => <ToolCard key={tool.id} title={tool.title} description={tool.description} href={tool.href} categoryLabel={tool.categoryLabel} status={tool.status} />)}</div>
      </section>
      <section className="mt-12 pt-8 border-t border-[var(--border-hairline)] max-w-2xl">
        <h2 className="text-lg font-semibold">A simple preparation routine</h2>
        <ol className="mt-4 list-decimal pl-5 space-y-3 text-sm text-[var(--text-body)]">
          <li>Use the resizer to set dimensions and framing, then download your finished canvas.</li>
          <li>Open the resized image in the compressor if you need a target file size. Compare detail before downloading.</li>
          <li>Review your final upload with the <Link href="/checklist" className="text-[var(--brand-accent)] underline focus-ring">pre-publish checklist</Link>.</li>
        </ol>
      </section>
    </div>
  );
}


