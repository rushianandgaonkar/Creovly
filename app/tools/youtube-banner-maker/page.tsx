import { createToolMetadata, getTool } from '@/lib/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { toolSoftwareApplicationJsonLd, toolFaqJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import ContentToolPage from '@/components/tools/ContentToolPage';
import BannerMaker from '@/components/tools/BannerMaker';

const tool = getTool('youtube-banner-maker');
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
      <ContentToolPage slug="youtube-banner-maker">
        <BannerMaker />
      </ContentToolPage>
    </>
  );
}
