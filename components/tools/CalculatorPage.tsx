/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
import ToolPageShell from './ToolPageShell';
import CreatorCalculator from './CreatorCalculator';
import { getTool } from '@/lib/metadata';
import { calculatorDefinitions, type CalculatorKind } from '@/lib/creator-calculators';
import { calculatorFaqs } from '@/config/calculator-faqs';

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
      faqs={calculatorFaqs[kind]}
    >
      <CreatorCalculator kind={kind} />
    </ToolPageShell>
  );
}
