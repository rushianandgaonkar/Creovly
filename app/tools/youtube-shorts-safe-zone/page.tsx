import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ShortsSafeZone from '@/components/tools/ShortsSafeZone';

const tool = getTool('youtube-shorts-safe-zone');
export const metadata = createToolMetadata(tool.slug);

export default function ShortsSafeZonePage() {
  return (
    <ToolPageShell
      title={tool.title}
      description={tool.description}
      category="Thumbnail Tools"
      categoryHref="/tools/thumbnail"
      toolSlug={tool.slug}
    >
      <ShortsSafeZone />
    </ToolPageShell>
  );
}
