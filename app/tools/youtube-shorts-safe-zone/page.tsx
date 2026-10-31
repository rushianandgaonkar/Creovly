import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import ShortsSafeZone from '@/components/tools/ShortsSafeZone';

const tool = getTool('youtube-shorts-safe-zone');
export const metadata = createToolMetadata(tool.slug);

export default function ShortsSafeZonePage() {
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
            Choose a still frame. The tool fits it into a 9:16 canvas, adding black padding when needed. Adjust the reserved margins to approximate the player layout you want to plan around. The defaults are starting assumptions, not official YouTube measurements.
          </p>
          <p>
            Enable the content box and position it over your important text or subject. The checker reports whether that box overlaps your chosen margins. It does not detect actual content or analyze a video.
          </p>
          <p>
            Create a PNG guide to download a 1080 × 1920 annotated planning reference. The download always includes the guide, even when the on-screen overlay is hidden. Use your clean source for publishing and inspect it in the actual Shorts player.
          </p>
        </>
      }
      faqs={[
        {
          question: 'What is the safe zone for YouTube Shorts?',
          answer:
            'The Shorts safe zone is the central 9:16 area clear of native platform overlays—including the bottom title, sound icon, channel avatar, and the right-side like/comment buttons.',
        },
        {
          question: 'How to keep text inside the YouTube Shorts safe zone?',
          answer:
            'Center critical titles and captions in the middle 60% of the screen. Avoid the top 15% (header/search) and bottom 25% (channel info and sound tags) to prevent UI obstruction.',
        },
        {
          question: 'What are the YouTube Shorts safe zone dimensions?',
          answer:
            'Shorts use a 1080 × 1920 canvas (9:16). While exact UI margins shift across phones, reserving ~280px at the bottom, ~140px at the top, and ~120px on the right keeps key content protected across devices.',
        },
        {
          question: 'Where should captions be placed in YouTube Shorts?',
          answer:
            'Position captions in the lower-middle section of the screen, just above the video description bar and indented from the right-hand action column so viewers can read without interference.',
        },
        {
          question: 'How to prevent YouTube Shorts buttons from covering text?',
          answer:
            'Maintain a minimum 120-pixel margin from the right edge of your 1080×1920 canvas. Use Creovly’s interactive overlay tool to test a representative video frame before publishing.',
        },
      ]}
    >
      <ShortsSafeZone />
    </ToolPageShell>
  );
}
