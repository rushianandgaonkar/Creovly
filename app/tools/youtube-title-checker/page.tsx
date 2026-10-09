import { createToolMetadata, getTool } from '@/lib/metadata';
import ToolPageShell from '@/components/tools/ToolPageShell';
import TitleChecker from '@/components/tools/TitleChecker';
const tool = getTool('youtube-title-checker');
export const metadata = createToolMetadata(tool.slug);
export default function TitleCheckerPage() {
  return <ToolPageShell title={tool.title} description={tool.description} category="Title Tools" categoryHref="/tools#title" toolSlug={tool.slug}
    educationalContent={<><p>Enter a draft title and, optionally, an exact topic phrase. Check the length, whitespace, repeated punctuation, and uppercase emphasis. The phrase check ignores case but does not match synonyms or measure search demand.</p><p>YouTube lists a 100-character title limit. This tool uses a conservative UTF-16 character-unit count, including spaces; some emoji use more than one unit. Check final acceptance in YouTube Studio. The word count splits on whitespace and is less useful for languages that do not use spaces.</p><p>The preview wraps into two lines at your chosen width. It is an illustration, not a replica of every YouTube surface. Feedback does not predict CTR, rankings, truthfulness, or platform policy compliance.</p><p><a href="https://support.google.com/youtube/answer/57407?hl=en" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] underline focus-ring">YouTube’s upload and title guidance</a></p></>}
    faqs={[
      { question: 'Why is there no CTR score?', answer: 'Text alone cannot produce a trustworthy prediction of clicks. This tool reports transparent, local checks rather than inventing a performance score.' },
      { question: 'Does it rewrite my title?', answer: 'No. It highlights basic issues and exact phrase placement. You retain control of the wording.' },
      { question: 'Does the preview show an exact cutoff?', answer: 'No. Actual wrapping depends on the device, surface, font, and language. Adjust the preview width to explore how the title might wrap.' },
    ]}><TitleChecker /></ToolPageShell>;
}
