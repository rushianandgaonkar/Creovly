import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import LogoBackgroundRemover from '@/components/tools/LogoBackgroundRemover';

const tool = getTool('logo-background-remover');
export const metadata = createToolMetadata(tool.slug);

export default function LogoBackgroundRemoverPage() {
  return (
    <ToolPageShell
      title={tool.title}
      description={tool.description}
      category="Thumbnail Tools"
      categoryHref="/tools/thumbnail"
      toolSlug={tool.slug}
    >
      <LogoBackgroundRemover />
    </ToolPageShell>
  );
}
