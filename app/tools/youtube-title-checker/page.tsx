import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import TitleChecker from '@/components/tools/TitleChecker';

const tool = getTool('youtube-title-checker');
export const metadata = createToolMetadata(tool.slug);

export default function TitleCheckerPage() {
  return (
    <ToolPageShell
      title={tool.title}
      description={tool.description}
      category="Title Tools"
      categoryHref="/tools#title"
      toolSlug={tool.slug}
    >
      <TitleChecker />
    </ToolPageShell>
  );
}
