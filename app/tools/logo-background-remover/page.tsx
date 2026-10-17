import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import LogoBackgroundRemover from '@/components/tools/LogoBackgroundRemover';

const tool = getTool('logo-background-remover');
export const metadata = createToolMetadata(tool.slug);

export default function LogoBackgroundRemoverPage() {
  return <ToolPageShell title={tool.title} description={tool.description} category="Thumbnail Tools" categoryHref="/tools/thumbnail" toolSlug={tool.slug}
    educationalContent={<><p>Choose an existing logo with a solid background, confirm the background color, and adjust tolerance. Select Remove background, inspect the actual before/after images, then download a transparent PNG.</p><p>This tool removes matching colors connected to the image border. It preserves enclosed areas, including enclosed background inside letters. Similar foreground colors touching the background can also be removed. Complex photos, gradients, shadows, and anti-aliased edges may need a dedicated editor.</p><p>Processing stays in your browser. Images are not saved between visits. Original dimensions are preserved; PNG output may be larger than your source file.</p></>}
    faqs={[
      { question: 'Which files and download formats are supported?', answer: 'Select a still JPEG, PNG, or WebP up to 20 MB, 8 megapixels, and 8,192 pixels per side. The result is a PNG at the original dimensions. PNG supports transparency, and its file size can be larger than the input.' },
      { question: 'Does this generate a new logo?', answer: 'No. It removes a solid background from an existing logo. It does not generate designs or identify photo subjects.' },
      { question: 'Will white lettering disappear?', answer: 'Enclosed white areas are preserved. Matching lettering connected to the outer background can disappear, especially with high tolerance. Review the preview and reduce tolerance if needed.' },
      { question: 'Why are some edges or enclosed areas still visible?', answer: 'This version removes border-connected colors only. Enclosed holes stay intact, and compressed or blended edge pixels may differ from the chosen color. Increase tolerance carefully; manual brush refinement is not available.' },
      { question: 'Are my files uploaded?', answer: 'No. Images are decoded, processed, and exported locally in your browser. Resetting or leaving clears this workspace.' },
    ]}><LogoBackgroundRemover /></ToolPageShell>;
}
