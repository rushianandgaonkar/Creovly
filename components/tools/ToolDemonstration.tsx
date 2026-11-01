/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { toolGuidance, titleDemonstration } from '@/config/tool-guidance';
import assets from '@/config/tool-example-assets.json';
import { analyzeTitle } from '@/lib/title-analysis';
import { calculateCreator, calculatorDefinitions, formatCalculatorMetric } from '@/lib/creator-calculators';
import ComparisonSlider from './ComparisonSlider';
import { useI18n } from '@/lib/i18n';
import { toolPlaybookTranslations } from '@/config/tool-guidance-i18n';

export default function ToolDemonstration({ slug }: { slug: string }) {
  const { locale } = useI18n();
  const playbook = toolPlaybookTranslations[locale] || toolPlaybookTranslations.en;
  const demoText = playbook.demonstration;

  const guidance = toolGuidance[slug];
  if (!guidance) return null;
  const example = guidance.image;
  const definition = guidance.calculator ? calculatorDefinitions[guidance.calculator] : undefined;
  const calculation = guidance.calculator && definition ? calculateCreator(guidance.calculator, definition.example) : undefined;

  return (
    <section
      id="tool-example"
      className="mt-14 pt-10 border-t border-[var(--border-hairline)] scroll-mt-20"
      aria-labelledby="example-heading"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand-accent)] font-medium">
          {demoText.badge}
        </span>
      </div>
      <h2
        id="example-heading"
        className="text-xl font-bold tracking-tight text-[var(--text-ink)]"
      >
        {example
          ? demoText.inspectionHeading
          : guidance.titleExample
          ? demoText.titleHeading
          : demoText.calcHeading}
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-[var(--text-body)]">
        {example
          ? demoText.inspectionSubheading
          : guidance.titleExample
          ? demoText.titleSubheading
          : demoText.calcSubheading}
      </p>

      {example && (() => {
        const beforeAsset = assets[example.before as keyof typeof assets];
        const afterAsset = assets[example.after as keyof typeof assets];
        return (
          <div className="mt-6 space-y-4">
            <ComparisonSlider
              beforeSrc={`/examples/${example.before}`}
              afterSrc={`/examples/${example.after}`}
              beforeLabel={example.beforeLabel}
              afterLabel={example.afterLabel}
              width={beforeAsset?.width || 800}
              height={beforeAsset?.height || 480}
              transparentAfter={example.transparent}
              portrait={example.portrait}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-body)] p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)]">
              <span className="font-mono">
                {beforeAsset?.width} × {beforeAsset?.height} px · Demonstration Reference
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`/examples/${example.before}`}
                  download
                  className="font-mono text-xs text-[var(--brand-accent)] hover:underline focus-ring"
                >
                  {demoText.downloadOriginal} {example.before.endsWith('.png') ? 'PNG' : 'JPEG'}
                </a>
                <span className="text-[var(--text-faint)]">·</span>
                <a
                  href={`/examples/${example.after}`}
                  download
                  className="font-mono text-xs text-[var(--brand-accent)] hover:underline focus-ring"
                >
                  {demoText.downloadProcessed} {example.after.endsWith('.png') ? 'PNG' : 'JPEG'}
                </a>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-body)]">{example.note}</p>
          </div>
        );
      })()}

      {guidance.titleExample && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {[titleDemonstration.before, titleDemonstration.after].map((text, index) => {
            const analysis = analyzeTitle(text, titleDemonstration.phrase);
            return (
              <article
                key={text}
                className="min-w-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 sm:p-6 shadow-[var(--shadow-whisper)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-ink)]">
                      {index === 0 ? demoText.beforeDraft : demoText.afterDraft}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        index === 0
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {analysis.characters} units
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[var(--text-ink)] break-words">
                    &ldquo;{text}&rdquo;
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs text-[var(--text-body)] border-t border-[var(--border-hairline-subtle)] pt-3">
                    {analysis.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {definition && calculation && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            <div className="min-w-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 sm:p-6 shadow-[var(--shadow-whisper)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-hairline-subtle)]">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-ink)]">
                  Sample Inputs
                </h3>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">BENCHMARK</span>
              </div>
              <dl className="space-y-3 text-sm">
                {definition.fields.map((field) => (
                  <div key={field.key} className="flex flex-wrap justify-between gap-2">
                    <dt className="text-[var(--text-body)] text-xs">{field.label}</dt>
                    <dd className="font-mono text-xs font-semibold text-[var(--text-ink)]">
                      {Number(definition.example[field.key]).toLocaleString('en-US')}{' '}
                      {field.suffix ?? ''}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="min-w-0 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] p-5 sm:p-6 shadow-[var(--shadow-whisper)]">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-hairline-subtle)]">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-ink)]">
                  Calculated Output
                </h3>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  OUTPUT
                </span>
              </div>
              <dl className="space-y-3 text-sm">
                {calculation.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-wrap justify-between gap-2">
                    <dt className="text-[var(--text-body)] text-xs">{metric.label}</dt>
                    <dd className="font-mono text-xs font-semibold text-[var(--text-ink)]">
                      {formatCalculatorMetric(metric)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="mt-4 text-xs font-mono text-[var(--text-muted)] break-words">
            Formula: {calculation.formula}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--text-body)]">{definition.note}</p>
        </>
      )}
    </section>
  );
}
