import ToolPageShell from './ToolPageShell';
import CreatorCalculator from './CreatorCalculator';
import { getTool } from '@/lib/metadata';
import { calculatorDefinitions, type CalculatorKind } from '@/lib/creator-calculators';

export default function CalculatorPage({ kind, slug }: { kind: CalculatorKind; slug: string }) {
  const tool = getTool(slug); const definition = calculatorDefinitions[kind];
  const watch = kind === 'watch-hours';
  return <ToolPageShell title={tool.title} description={tool.description} category="Money & Growth" categoryHref="/tools#money-growth" toolSlug={slug}
    educationalContent={<><p>Enter values from your own records or planning assumptions, then select Calculate. Load example inputs fills a labelled demonstration; it does not represent your channel. Changing an input clears the previous result.</p><p>{definition.note}</p><p>Calculations happen in this browser. Copy includes the inputs, formulas, and assumptions. No channel connection, currency conversion, or data storage is used.</p><p><a href={watch ? 'https://support.google.com/youtube/answer/72851?hl=en' : 'https://support.google.com/youtube/answer/9314357?hl=en'} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] underline focus-ring">{watch ? 'Read YouTube’s current YPP requirements' : 'Read YouTube’s explanation of RPM and CPM'}</a></p></>}
    faqs={[
      { question: 'Are these results guaranteed?', answer: 'No. They are calculations from the inputs you supply. Future revenue, views, watch time, deals, and costs may change. Annual scenarios repeat the entered monthly assumptions 12 times.' },
      { question: watch ? 'Does this confirm monetization eligibility?' : 'Is another platform revenue share deducted?', answer: watch ? 'No. This is an accumulation scenario, without simulating hours expiring from the rolling window. YPP also has subscriber, policy, region, review, and other requirements. Use YouTube Studio for eligibility.' : 'No. RPM is already after YouTube’s share. This calculator does not deduct another percentage. Use the same revenue scope and view basis throughout, especially engaged views for Shorts.' },
      { question: 'Are my inputs saved?', answer: 'No. Inputs and results stay in memory on this page. Reset or leave the page to clear them. Copy only writes the summary to your clipboard when you choose it.' },
    ]}><CreatorCalculator kind={kind} /></ToolPageShell>;
}
