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
      educationalContent={
        <>
          <p>
            Choose an existing logo with a solid background, confirm the background color, and adjust tolerance. Select Remove background, inspect the actual before/after images, then download a transparent PNG.
          </p>
          <p>
            This tool removes matching colors connected to the image border. It preserves enclosed areas, including enclosed background inside letters. Similar foreground colors touching the background can also be removed. Complex photos, gradients, shadows, and anti-aliased edges may need a dedicated editor.
          </p>
          <p>
            Processing stays in your browser. Images are not saved between visits. Original dimensions are preserved; PNG output may be larger than your source file.
          </p>
        </>
      }
      faqs={[
        {
          question: 'How to remove background from a logo for free?',
          answer:
            'Upload your logo, select the background color, and click Remove background. Export a clean, transparent PNG directly in your browser with zero fees and no account required.',
        },
        {
          question: 'How to make a logo background transparent?',
          answer:
            'Use this tool to detect and eliminate border-connected background pixels. Exporting as a PNG preserves the alpha channel so your logo overlays cleanly on any background color.',
        },
        {
          question: 'How to remove white background from a logo?',
          answer:
            'Select white as your background color and adjust the tolerance slider to clean edge fringes. Enclosed white lettering stays protected while outer white borders are removed.',
        },
        {
          question: 'How to convert a JPG logo to transparent PNG?',
          answer:
            'Since JPG does not support transparency, simply changing the file extension will not work. Process your JPG through this tool to strip the solid background, then download the resulting PNG.',
        },
        {
          question: 'How to remove logo background without losing quality?',
          answer:
            'Upload your highest-resolution source file and maintain full original dimensions during export. All pixel processing executes locally with lossless canvas operations.',
        },
      ]}
    >
      <LogoBackgroundRemover />
    </ToolPageShell>
  );
}
