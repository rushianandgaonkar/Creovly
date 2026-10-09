import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ThumbnailResizer from '@/components/tools/ThumbnailResizer';

const tool = getTool('youtube-thumbnail-resizer');
export const metadata = createToolMetadata(tool.slug);

export default function ThumbnailResizerPage() {
  return <ToolPageShell title={tool.title} description={tool.description} category="Thumbnail Tools" categoryHref="/tools/thumbnail" toolSlug={tool.slug}
    educationalContent={<><p>Choose a still JPEG, PNG, or WebP image, select your canvas dimensions, and adjust the framing. Crop to fill removes edges without stretching the subject. Fit entire image keeps every edge and adds padding.</p><p>Review the framing preview, select your format and quality, then resize and download the exported image. Inputs are limited to 20 MB, 24 megapixels, and 8,192 pixels per side. Output canvases use the same dimension limits.</p><p>Resizing changes dimensions, not a target file size. Use the thumbnail compressor afterward if you need a smaller file. Enlarging an image cannot recover detail. Exports may remove embedded metadata or change colors. This tool does not sharpen images or identify subjects automatically.</p></>}
    faqs={[
      { question: 'Are my images uploaded?', answer: 'No. Decoding, resizing, and exporting happen in your browser. Images are not stored by this tool, and leaving or resetting clears the workspace.' },
      { question: 'Can I keep transparency?', answer: 'Choose Transparent as the canvas background and export PNG or WebP. JPEG does not support transparency; transparent areas become white.' },
      { question: 'Does the preview match the download?', answer: 'The framing preview shows the crop and padding. After resizing, the output preview uses the actual exported image, including format and quality changes. Review it before downloading.' },
      { question: 'Can I move the crop?', answer: 'Yes. Horizontal and vertical sliders move the crop across available space. When an axis does not need cropping, its slider has no effect. Fit entire image always centers the image.' },
    ]}><ThumbnailResizer /></ToolPageShell>;
}

