import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ShortsSafeZone from '@/components/tools/ShortsSafeZone';
const tool = getTool('youtube-shorts-safe-zone');
export const metadata = createToolMetadata(tool.slug);
export default function ShortsSafeZonePage() {
  return <ToolPageShell title={tool.title} description={tool.description} category="Thumbnail Tools" categoryHref="/tools/thumbnail" toolSlug={tool.slug}
    educationalContent={<><p>Choose a still frame. The tool fits it into a 9:16 canvas, adding black padding when needed. Adjust the reserved margins to approximate the player layout you want to plan around. The defaults are starting assumptions, not official YouTube measurements.</p><p>Enable the content box and position it over your important text or subject. The checker reports whether that box overlaps your chosen margins. It does not detect actual content or analyze a video.</p><p>Create a PNG guide to download a 1080 × 1920 annotated planning reference. The download always includes the guide, even when the on-screen overlay is hidden. Use your clean source for publishing and inspect it in the actual Shorts player.</p></>}
    faqs={[
      { question: 'Does fitting the box guarantee visibility?', answer: 'No. The check compares your manually positioned box with your chosen margins. Player layouts, captions, accessibility settings, and expanded panels vary.' },
      { question: 'Can I upload a video?', answer: 'This version accepts still JPEG, PNG, and WebP frames only, up to 20 MB, 24 megapixels, and 8,192 pixels per side. Export a representative frame from your video first.' },
      { question: 'Does my frame leave my device?', answer: 'No. The preview and guide export are generated in your browser. Reset or leave the page to clear the workspace.' },
    ]}><ShortsSafeZone /></ToolPageShell>;
}
