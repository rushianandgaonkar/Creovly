import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailResizer from '@/components/tools/ThumbnailResizer';
import styles from '@/components/ui/artwork.module.css';

const tool = getTool('youtube-thumbnail-resizer');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailResizerPage() {
  return (
    <ToolPageShell
      className={styles.page}
      title={tool.title}
      description={tool.description}
      category="Thumbnail Tools"
      categoryHref="/tools/thumbnail"
      toolSlug={tool.slug}
    >
      <ThumbnailResizer />
    </ToolPageShell>
  );
}
