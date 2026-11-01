/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import { createPageMetadata } from '@/lib/metadata';
import ToolsDirectoryContent from '@/components/tools/ToolsDirectoryContent';

export const metadata = createPageMetadata({
  title: 'Creator Tools Directory',
  description:
    'Find tools for thumbnails, title drafts, Shorts framing, revenue, RPM, watch hours, and creator income scenarios.',
  path: '/tools',
});

export default function ToolsDirectoryPage() {
  return <ToolsDirectoryContent />;
}
