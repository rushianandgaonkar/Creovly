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
      educationalContent={
        <>
          <p>
            Enter a draft title and, optionally, an exact topic phrase. Check the length, whitespace, repeated punctuation, and uppercase emphasis. The phrase check ignores case but does not match synonyms or measure search demand.
          </p>
          <p>
            YouTube lists a 100-character title limit. This tool uses a conservative UTF-16 character-unit count, including spaces; some emoji use more than one unit. Check final acceptance in YouTube Studio. The word count splits on whitespace and is less useful for languages that do not use spaces.
          </p>
          <p>
            The preview wraps into two lines at your chosen width. It is an illustration, not a replica of every YouTube surface. Feedback does not predict CTR, rankings, truthfulness, or platform policy compliance.
          </p>
          <p>
            <a
              href="https://support.google.com/youtube/answer/57407?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-accent)] underline focus-ring"
            >
              YouTube’s upload and title guidance
            </a>
          </p>
        </>
      }
      faqs={[
        {
          question: 'How long should a YouTube video title be?',
          answer:
            'Aim for 50–70 characters. While YouTube permits up to 100 characters, mobile search feeds and suggested rails frequently truncate titles after 55–60 characters. Place your primary hook and keywords upfront.',
        },
        {
          question: 'What is the maximum character limit for YouTube titles?',
          answer:
            'YouTube enforces a strict maximum limit of 100 characters, including spaces, numbers, and emojis. Titles exceeding 100 characters will be rejected upon upload in YouTube Studio.',
        },
        {
          question: 'How to write SEO-friendly YouTube titles?',
          answer:
            'Front-load your primary target keyword within the first 40 characters, address user search intent clearly, and eliminate filler words to balance search indexing with high mobile click-through rates.',
        },
        {
          question: 'How to check if a YouTube title is too long?',
          answer:
            'Paste your title draft into Creovly’s Title Checker to inspect the character count and preview mobile two-line truncation widths before finalizing your metadata.',
        },
        {
          question: 'How to make a YouTube title more clickable?',
          answer:
            'Focus on high curiosity, tangible payoff, or contrasting questions without misleading viewers. Ensure the title pairs cohesively with your thumbnail visual to deliver a clear story.',
        },
      ]}
    >
      <TitleChecker />
    </ToolPageShell>
  );
}
