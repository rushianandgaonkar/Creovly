import { createToolMetadata, getTool } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { toolSoftwareApplicationJsonLd, toolFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import ContentToolPage from '@/components/tools/ContentToolPage';
import BestTimeToPost from '@/components/tools/BestTimeToPost';

const tool = getTool('best-time-to-post-on-youtube');
export const metadata = createToolMetadata(tool.slug);

export default function Page() {
  const schemas = [
    toolSoftwareApplicationJsonLd(tool.slug),
    toolFaqJsonLd(tool.slug),
    breadcrumbJsonLd([
      { name: 'Tools', href: '/tools' },
      { name: tool.title, href: tool.href },
    ]),
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={schemas as Record<string, unknown>[]} />
      <ContentToolPage slug="best-time-to-post-on-youtube">
        <BestTimeToPost />
      </ContentToolPage>
    </>
  );
}
