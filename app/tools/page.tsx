import { createPageMetadata } from '@/lib/metadata';
import ToolDiscovery from '@/components/tools/ToolDiscovery';
import { toolRegistry } from '@/config/site';

export const metadata = createPageMetadata({
  title: 'Creator Tools Directory',
  description: 'Find tools for thumbnails, title drafts, Shorts framing, revenue, RPM, watch hours, and creator income scenarios.',
  path: '/tools',
});

export default function ToolsDirectoryPage() {
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
    <div className="max-w-2xl mb-6">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Creator tools</h1>
      <p className="mt-3 text-sm text-[var(--text-body)] leading-relaxed">Find the right tool for your next upload. All eight tools run locally in your browser.</p>
    </div>
    <ToolDiscovery tools={toolRegistry} />
  </div>;
}
