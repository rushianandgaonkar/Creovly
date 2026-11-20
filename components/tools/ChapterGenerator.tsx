'use client';

import { useState } from 'react';
import Textarea from '@/components/form/Textarea';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { CopyField } from './YouTubeLinkGenerator';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import { fillTemplate } from '@/lib/utils';
import { parseTimestamp } from '@/lib/youtube-links';
import {
  MIN_CHAPTERS,
  MIN_CHAPTER_SECONDS,
  chapterDurations,
  formatChapterTime,
  formatChapters,
  parseChapters,
  sortChapters,
  validateChapters,
  type ChapterIssue,
  type ChapterSeparator,
} from '@/lib/youtube-chapters';
import { formatDuration } from '@/lib/script-length';

const SEPARATORS: ChapterSeparator[] = [' ', ' - ', ' – ', ' | '];

export default function ChapterGenerator() {
  const { t } = useI18n();
  const c = t.chapterGenerator;
  const [text, setText] = useState('');
  const [videoLength, setVideoLength] = useState('');
  const [separator, setSeparator] = useState<ChapterSeparator>(' - ');
  const [padded, setPadded] = useState(false);

  const { chapters, skipped } = parseChapters(text);
  const lengthResult = videoLength.trim() ? parseTimestamp(videoLength) : null;
  const videoSeconds = lengthResult && 'seconds' in lengthResult && lengthResult.seconds > 0 ? lengthResult.seconds : undefined;
  const lengthError = lengthResult && !videoSeconds ? c.videoLengthError : undefined;
  const issues = validateChapters(chapters, videoSeconds);
  const durations = chapterDurations(chapters, videoSeconds);
  const output = chapters.length ? formatChapters(chapters, separator, padded) : '';
  const useHours = chapters.some((chapter) => chapter.seconds >= 3600);
  const outOfOrder = issues.some((issue) => issue.kind === 'not-ascending');

  const describe = (issue: ChapterIssue): string => {
    switch (issue.kind) {
      case 'first-not-zero':
        return c.issueFirstZero;
      case 'too-few':
        return fillTemplate(c.issueTooFew, { count: issue.count, min: MIN_CHAPTERS });
      case 'not-ascending':
        return fillTemplate(c.issueOrder, { line: issue.line });
      case 'too-short':
        return fillTemplate(c.issueTooShort, { line: issue.line, seconds: issue.seconds, min: MIN_CHAPTER_SECONDS });
      case 'past-end':
        return fillTemplate(c.issuePastEnd, { line: issue.line });
      case 'empty-title':
        return fillTemplate(c.issueEmptyTitle, { line: issue.line });
    }
  };

  const sortLines = () => {
    setText(sortChapters(chapters).map((chapter) => `${formatChapterTime(chapter.seconds, useHours, padded)} ${chapter.title}`).join('\n'));
  };

  return (
    <ToolWorkspaceLayout
      workspace={
        <>
          <Textarea
            id="chapters-input"
            label={c.inputLabel}
            placeholder={c.inputPlaceholder}
            rows={10}
            value={text}
            onChange={(event) => setText(event.target.value)}
            hint={c.inputHint}
            className="font-mono"
          />
          <div className="flex flex-wrap gap-2 -mt-3">
            <Button variant="outline" size="sm" onClick={() => setText(c.example)}>{c.loadExample}</Button>
            {text && <Button variant="ghost" size="sm" onClick={() => setText('')}>{c.clear}</Button>}
            {outOfOrder && <Button variant="outline" size="sm" onClick={sortLines}>{c.sortButton}</Button>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              id="chapters-length"
              label={c.videoLengthLabel}
              placeholder="12:30"
              value={videoLength}
              autoComplete="off"
              onChange={(event) => setVideoLength(event.target.value)}
              error={lengthError}
              hint={!lengthError ? c.videoLengthHint : undefined}
            />
            <Select
              id="chapters-separator"
              label={c.separatorLabel}
              value={String(SEPARATORS.indexOf(separator))}
              onChange={(event) => setSeparator(SEPARATORS[Number(event.target.value)])}
              options={[
                { value: '0', label: c.separatorSpace },
                { value: '1', label: '0:00 - …' },
                { value: '2', label: '0:00 – …' },
                { value: '3', label: '0:00 | …' },
              ]}
            />
            <Select
              id="chapters-format"
              label={c.formatLabel}
              value={padded ? 'padded' : 'short'}
              onChange={(event) => setPadded(event.target.value === 'padded')}
              options={[
                { value: 'short', label: useHours ? '0:01:05' : '1:05' },
                { value: 'padded', label: useHours ? '00:01:05' : '01:05' },
              ]}
            />
          </div>
        </>
      }
      results={
        chapters.length ? (
          <div className="space-y-5">
            {issues.length ? (
              <Alert variant="warning" title={c.issuesTitle}>
                <ul className="list-disc space-y-1 pl-4">
                  {issues.map((issue, index) => <li key={index}>{describe(issue)}</li>)}
                </ul>
              </Alert>
            ) : (
              <Alert variant="success">{c.valid}</Alert>
            )}
            {skipped.length > 0 && (
              <p className="text-xs text-[var(--text-body)]">{fillTemplate(c.skippedLines, { lines: skipped.join(', ') })}</p>
            )}

            <CopyField
              id="chapters-output"
              label={c.outputLabel}
              value={output}
              hint={c.outputHint}
              multiline
              labels={{ copy: c.copy, copied: c.copied, copyFailed: c.copyFailed, testLink: '' }}
            />

            <section aria-labelledby="chapters-table" className="space-y-2">
              <h3 id="chapters-table" className="text-xs font-medium text-[var(--text-ink)]">{c.tableHeading}</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[var(--text-muted)]">
                    <th scope="col" className="py-1 pr-2 font-normal">{c.colStart}</th>
                    <th scope="col" className="py-1 pr-2 font-normal">{c.colTitle}</th>
                    <th scope="col" className="py-1 text-right font-normal">{c.colLength}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-hairline)]">
                  {chapters.map((chapter, index) => (
                    <tr key={chapter.line}>
                      <td className="py-1.5 pr-2 font-mono text-[var(--text-ink)]">{formatChapterTime(chapter.seconds, useHours, padded)}</td>
                      <td className="py-1.5 pr-2 text-[var(--text-ink)] break-words">{chapter.title || '—'}</td>
                      <td className="py-1.5 text-right font-mono text-[var(--text-muted)]">
                        {durations[index] !== null ? formatDuration(durations[index] as number) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <p className="text-xs text-[var(--text-body)]">
              {c.nextStep}{' '}
              <LocalizedLink href="/tools/youtube-description-generator" className="font-medium text-[var(--brand-accent-deep)] underline hover:no-underline">
                {c.nextStepLink}
              </LocalizedLink>
            </p>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-body)]">{c.emptyState}</p>
        )
      }
    />
  );
}
