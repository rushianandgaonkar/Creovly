/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useState, useId, useMemo } from 'react';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useI18n } from '@/lib/i18n';
import {
  buildDescription,
  TEMPLATE_DEFAULTS,
  type DescriptionTemplate,
  type DescriptionOptions,
} from '@/lib/description-generator';

interface DescriptionGeneratorProps {
  locale?: string;
}

export default function DescriptionGenerator({}: DescriptionGeneratorProps) {
  const { t } = useI18n();
  const dg = t.descriptionGenerator || {
    title: 'YouTube Description Generator',
    templateHeading: 'Description Template',
    templateTutorial: 'Tutorial & How-To',
    templateReview: 'Product Review & Tech',
    templateVlog: 'Vlog & Lifestyle',
    templateGaming: 'Gaming & Let\'s Play',
    templatePodcast: 'Podcast & Interview',
    templateEducational: 'Educational & Deep-Dive',
    videoTitleLabel: 'Video Title / Topic',
    videoTitlePlaceholder: 'e.g., How to Master Next.js 15 in 2026',
    hookSummaryLabel: 'Opening Hook & Summary (First 150–200 Chars)',
    hookSummaryPlaceholder: 'Brief summary explaining exactly what viewers will learn before the "Show More" fold...',
    keyPointsLabel: 'Key Takeaways / Highlights (1 per line)',
    keyPointsPlaceholder: 'e.g.,\n- App Router fundamentals\n- Server Actions best practices\n- Optimizing Core Web Vitals',
    timestampsHeading: 'Video Chapters & Timestamps',
    timestampsPlaceholder: '00:00 Intro\n01:45 Project Setup\n05:20 Server Components\n12:10 Deployment',
    linksHeading: 'Useful Links & Resources',
    websiteLabel: 'Project / Website URL',
    gearLabel: 'Gear / Equipment Mentioned',
    subscribeCallout: 'Subscribe Call to Action',
    socialsHeading: 'Social Handles & Community',
    twitterHandle: 'Twitter / X',
    instagramHandle: 'Instagram',
    discordLink: 'Discord Community',
    hashtagsLabel: 'Hashtags (Top 3)',
    hashtagsPlaceholder: '#NextJS #WebDev #Coding',
    disclaimerLabel: 'Affiliate & Sponsor Disclaimer',
    buttonGenerate: 'Generate Description',
    buttonCopy: 'Copy Full Description',
    buttonCopied: 'Copied to Clipboard!',
    buttonReset: 'Reset Template',
    previewHeading: 'Live Description Preview',
    foldIndicatorLabel: 'Above-the-fold snippet (visible before "...more")',
    charCountLabel: 'YouTube 5,000-Character Limit',
    charCountUsed: 'characters used',
    charLimitExceeded: 'Exceeds YouTube 5,000-character limit!',
    aiBadge: 'Smart Description Builder • 5,000-Char Limit',
    tipTitle: 'YouTube Description Best Practice',
    tipBody: 'Place your most compelling keywords and primary links in the first 150-200 characters. YouTube displays this snippet in mobile feeds and Google search snippets before viewers click "...more".',
  };

  const [activeTemplate, setActiveTemplate] = useState<DescriptionTemplate>('tutorial');
  const [options, setOptions] = useState<DescriptionOptions>(TEMPLATE_DEFAULTS.tutorial);
  const [copied, setCopied] = useState(false);

  const titleInputId = useId();
  const websiteInputId = useId();
  const gearInputId = useId();
  const channelInputId = useId();
  const twitterInputId = useId();
  const instagramInputId = useId();
  const discordInputId = useId();
  const hashtagsInputId = useId();

  const handleSelectTemplate = (template: DescriptionTemplate) => {
    setActiveTemplate(template);
    setOptions(TEMPLATE_DEFAULTS[template]);
  };

  const handleReset = () => {
    setOptions(TEMPLATE_DEFAULTS[activeTemplate]);
  };

  // Live generated description
  const result = useMemo(() => buildDescription(options), [options]);

  const charPercentage = Math.min(100, Math.round((result.totalChars / 5000) * 100));
  const isWarningLimit = result.totalChars >= 4500 && !result.isOverLimit;

  const handleCopy = async () => {
    if (!result.fullText) return;
    try {
      await navigator.clipboard.writeText(result.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = result.fullText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const templates: { id: DescriptionTemplate; label: string }[] = [
    { id: 'tutorial', label: dg.templateTutorial },
    { id: 'review', label: dg.templateReview },
    { id: 'vlog', label: dg.templateVlog },
    { id: 'gaming', label: dg.templateGaming },
    { id: 'podcast', label: dg.templatePodcast },
    { id: 'educational', label: dg.templateEducational },
  ];

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          {/* Header pill */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)] border border-[var(--brand-accent)]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
              {dg.aiBadge}
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-ink)] underline font-medium cursor-pointer"
            >
              {dg.buttonReset}
            </button>
          </div>

          {/* Template Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[var(--text-ink)]">
              {dg.templateHeading}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tpl.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                    activeTemplate === tpl.id
                      ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent-deep)] font-semibold shadow-xs'
                      : 'bg-[var(--bg-canvas-elevated)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:border-[var(--border-hairline-strong)] hover:text-[var(--text-ink)]'
                  }`}
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Video Title / Topic */}
          <div className="space-y-2">
            <Input
              id={titleInputId}
              label={dg.videoTitleLabel}
              type="text"
              value={options.videoTitle}
              onChange={(e) => setOptions((prev) => ({ ...prev, videoTitle: e.target.value }))}
              placeholder={dg.videoTitlePlaceholder}
              className="w-full text-sm font-medium"
            />
          </div>

          {/* Hook & Summary (First 150-200 Chars) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[var(--text-ink)]">
                {dg.hookSummaryLabel}
              </label>
              <span
                className={`text-[10px] font-mono ${
                  options.hookSummary.length > 200 ? 'text-amber-400 font-semibold' : 'text-[var(--text-muted)]'
                }`}
              >
                {options.hookSummary.length} / 200 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={options.hookSummary}
              onChange={(e) => setOptions((prev) => ({ ...prev, hookSummary: e.target.value }))}
              placeholder={dg.hookSummaryPlaceholder}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-control)] bg-[var(--bg-canvas-subtle)] text-[var(--text-ink)] focus:outline-none focus:border-[var(--brand-accent)] font-sans leading-relaxed"
            />
          </div>

          {/* Key Points / Highlights */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-ink)]">
              {dg.keyPointsLabel}
            </label>
            <textarea
              rows={4}
              value={options.keyPoints.join('\n')}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  keyPoints: e.target.value.split('\n'),
                }))
              }
              placeholder={dg.keyPointsPlaceholder}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-control)] bg-[var(--bg-canvas-subtle)] text-[var(--text-ink)] focus:outline-none focus:border-[var(--brand-accent)] font-mono text-[11px] leading-relaxed"
            />
          </div>

          {/* Timestamps / Chapters */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-ink)]">
              {dg.timestampsHeading}
            </label>
            <textarea
              rows={4}
              value={options.timestamps}
              onChange={(e) => setOptions((prev) => ({ ...prev, timestamps: e.target.value }))}
              placeholder={dg.timestampsPlaceholder}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[var(--border-control)] bg-[var(--bg-canvas-subtle)] text-[var(--text-ink)] focus:outline-none focus:border-[var(--brand-accent)] font-mono text-[11px] leading-relaxed"
            />
          </div>

          {/* Links & Resources */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-hairline)]">
            <span className="text-xs font-semibold text-[var(--text-ink)] block">
              {dg.linksHeading}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id={websiteInputId}
                label={dg.websiteLabel}
                type="url"
                value={options.websiteUrl || ''}
                onChange={(e) => setOptions((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                placeholder="https://example.com"
                className="text-xs"
              />
              <Input
                id={gearInputId}
                label={dg.gearLabel}
                type="text"
                value={options.gearLinks || ''}
                onChange={(e) => setOptions((prev) => ({ ...prev, gearLinks: e.target.value }))}
                placeholder="e.g., Camera, Mic, Software"
                className="text-xs"
              />
            </div>
          </div>

          {/* Socials & Subscribe */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-hairline)]">
            <span className="text-xs font-semibold text-[var(--text-ink)] block">
              {dg.socialsHeading}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                id={channelInputId}
                label="YouTube Channel @handle (for subscribe link)"
                type="text"
                value={options.channelHandle || ''}
                onChange={(e) => setOptions((prev) => ({ ...prev, channelHandle: e.target.value }))}
                placeholder="@YourChannel"
                className="text-xs"
              />
              <Input
                id={twitterInputId}
                label={dg.twitterHandle}
                type="text"
                value={options.twitterHandle || ''}
                onChange={(e) => setOptions((prev) => ({ ...prev, twitterHandle: e.target.value }))}
                placeholder="@username"
                className="text-xs"
              />
              <Input
                id={instagramInputId}
                label={dg.instagramHandle}
                type="text"
                value={options.instagramHandle || ''}
                onChange={(e) => setOptions((prev) => ({ ...prev, instagramHandle: e.target.value }))}
                placeholder="@username"
                className="text-xs"
              />
              <Input
                id={discordLinkInputId(discordInputId)}
                label={dg.discordLink}
                type="url"
                value={options.discordLink || ''}
                onChange={(e) => setOptions((prev) => ({ ...prev, discordLink: e.target.value }))}
                placeholder="https://discord.gg/..."
                className="text-xs"
              />
            </div>
          </div>

          {/* Hashtags & Disclaimer */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-hairline)]">
            <Input
              id={hashtagsInputId}
              label={dg.hashtagsLabel}
              type="text"
              value={options.hashtags || ''}
              onChange={(e) => setOptions((prev) => ({ ...prev, hashtags: e.target.value }))}
              placeholder={dg.hashtagsPlaceholder}
              className="text-xs font-mono"
            />
            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={options.includeDisclaimer || false}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, includeDisclaimer: e.target.checked }))
                }
                className="rounded border-[var(--border-control)] accent-[var(--brand-accent)] focus-ring"
              />
              <span className="text-xs text-[var(--text-body)]">
                {dg.disclaimerLabel}
              </span>
            </label>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {/* 5,000-Character Capacity & Copy Bar */}
          <div className="p-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">
                  {dg.charCountLabel}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span
                    className={`text-2xl font-black font-mono tracking-tight ${
                      result.isOverLimit
                        ? 'text-[var(--state-error-text)]'
                        : isWarningLimit
                        ? 'text-[var(--state-warning-text)]'
                        : 'text-[var(--brand-accent)]'
                    }`}
                  >
                    {result.totalChars.toLocaleString()}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">/ 5,000 characters</span>
                </div>
              </div>

              {/* Copy Button */}
              <Button
                type="button"
                variant="primary"
                className={`text-xs py-2 px-4 font-semibold transition-all ${
                  copied
                    ? 'bg-[var(--state-success)] hover:bg-[var(--state-success)] text-white'
                    : result.isOverLimit
                    ? 'bg-[var(--state-warning)] hover:bg-[var(--state-warning)] text-white'
                    : ''
                }`}
                onClick={handleCopy}
              >
                {copied ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {dg.buttonCopied}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {dg.buttonCopy}
                  </span>
                )}
              </Button>
            </div>

            {/* Visual Capacity Meter Bar */}
            <div className="space-y-1">
              <div className="w-full h-2 rounded-full bg-[var(--bg-canvas-inset)] overflow-hidden border border-[var(--border-hairline)]">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    result.isOverLimit
                      ? 'bg-[var(--state-error)]'
                      : isWarningLimit
                      ? 'bg-[var(--state-warning)]'
                      : 'bg-[var(--brand-accent)]'
                  }`}
                  style={{ width: `${charPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)]">
                <span>0</span>
                {result.isOverLimit ? (
                  <span className="text-[var(--state-error-text)] font-bold">{dg.charLimitExceeded}</span>
                ) : (
                  <span className="text-[var(--brand-accent-deep)] font-medium">
                    {(5000 - result.totalChars).toLocaleString()} chars remaining
                  </span>
                )}
                <span>5,000</span>
              </div>
            </div>
          </div>

          {/* Above-The-Fold Preview Card */}
          <div className="p-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-semibold text-[var(--brand-accent-deep)]">
                {dg.foldIndicatorLabel}
              </span>
              <span className="text-[var(--text-muted)]">Search &amp; Mobile Snippet</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-xs text-[var(--text-ink)] leading-relaxed">
              <p className="line-clamp-3 font-sans">
                {result.aboveTheFoldText}
                <span className="text-[var(--brand-accent-deep)] font-semibold cursor-pointer ml-1">...more</span>
              </p>
            </div>
          </div>

          {/* Full Formatted Description Preview (YouTube Studio card style) */}
          <div className="p-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] shadow-[var(--shadow-whisper)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-ink)]">
                {dg.previewHeading}
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                YouTube Studio Ready
              </span>
            </div>
            <pre className="p-4 rounded-xl bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-body)] whitespace-pre-wrap leading-relaxed max-h-[480px] overflow-y-auto selection:bg-[var(--brand-accent-soft)] selection:text-[var(--brand-accent-deep)]">
              {result.fullText}
            </pre>
          </div>

          {/* Best Practice Tip Card */}
          <div className="p-4 rounded-xl bg-[var(--state-warning-bg)] border border-[var(--state-warning-border)] flex items-start gap-3">
            <svg
              className="w-5 h-5 text-[var(--state-warning)] shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-[var(--state-warning-text)] block">
                {dg.tipTitle}
              </span>
              <p className="text-[var(--text-body)] leading-relaxed">
                {dg.tipBody}
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}

function discordLinkInputId(id: string): string {
  return id;
}
