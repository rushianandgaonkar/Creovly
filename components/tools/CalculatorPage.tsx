/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import ToolPageShell from './ToolPageShell';
import CreatorCalculator from './CreatorCalculator';
import { getTool } from '@/lib/metadata';
import { calculatorDefinitions, type CalculatorKind } from '@/lib/creator-calculators';

export default function CalculatorPage({ kind, slug }: { kind: CalculatorKind; slug: string }) {
  const tool = getTool(slug);
  const definition = calculatorDefinitions[kind];
  const watch = kind === 'watch-hours';

  return (
    <ToolPageShell
      title={tool.title}
      description={tool.description}
      category="Money & Growth"
      categoryHref="/tools#money-growth"
      toolSlug={slug}
      educationalContent={
        <div className="space-y-4">
          <p>
            Enter values from your own YouTube Studio records or planning assumptions, then select{' '}
            <strong className="text-[var(--text-ink)] font-semibold">Calculate Scenario</strong>. The{' '}
            <em>Load Example Scenario</em> button fills a labeled demonstration reference; it does not
            represent your channel. Changing any input value clears the previous result.
          </p>
          <div className="p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-xs text-[var(--text-body)]">
            <span className="font-mono font-semibold text-[var(--text-ink)] block mb-1">
              Methodology Notice:
            </span>
            {definition.note}
          </div>
          <p>
            All calculations execute locally in this browser session. The Copy action includes your
            inputs, formulas, and baseline assumptions for external spreadsheets or creator logs. No
            account sync, channel permissions, or cloud databases are required.
          </p>
          <p>
            <a
              href={
                watch
                  ? 'https://support.google.com/youtube/answer/72851?hl=en'
                  : 'https://support.google.com/youtube/answer/9314357?hl=en'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-accent)] font-medium hover:underline focus-ring inline-flex items-center gap-1 text-xs font-mono"
            >
              <span>{watch ? 'YouTube Official YPP Policy Guide' : 'YouTube Official RPM & CPM Guide'}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </p>
        </div>
      }
      faqs={[
        {
          question: 'Which measurement units should I enter?',
          answer: watch
            ? 'Enter watch hours as cumulative hours, monthly pace as hours per month, and average view duration as minutes. Decimal values are supported.'
            : 'Financial inputs use USD ($) and accept decimal numbers. View counts and sponsorship deals require integers. There is no automated currency exchange.',
        },
        {
          question: 'Are calculated revenue numbers guaranteed by YouTube?',
          answer:
            'No. They are mathematical scenarios calculated strictly from your entered assumptions. Seasonal RPM swings, ad inventory changes, and subscriber churn alter real-world income.',
        },
        {
          question: watch
            ? 'Does reaching 4,000 hours guarantee YouTube Partner Program approval?'
            : 'Is YouTube’s platform revenue share deducted from this calculation?',
          answer: watch
            ? 'No. This models an accumulation timeline. Official YPP admission also requires 1,000 subscribers, 2-factor authentication, advanced channel review, and policy compliance.'
            : 'No. RPM (Revenue Per Mille) is already the net amount paid to the creator after YouTube’s 45% platform split has been deducted.',
        },
        {
          question: 'Are my financial assumptions stored anywhere?',
          answer:
            'No. Inputs and results exist exclusively in temporary browser memory. Leaving or refreshing the tab resets the workspace entirely.',
        },
      ]}
    >
      <CreatorCalculator kind={kind} />
    </ToolPageShell>
  );
}
