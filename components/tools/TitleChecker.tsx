'use client';
import { useEffect, useRef, useState } from 'react';
import Input from '@/components/form/Input';
import Slider from '@/components/form/Slider';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';
import MetricCard from '@/components/results/MetricCard';
import ResultSummaryPanel from '@/components/results/ResultSummaryPanel';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { analyzeTitle } from '@/lib/title-analysis';

export default function TitleChecker() {
  const [title, setTitle] = useState(''); const [keyword, setKeyword] = useState(''); const [width, setWidth] = useState(320);
  const [result, setResult] = useState<ReturnType<typeof analyzeTitle>>(); const [error, setError] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  const clear = () => { setResult(undefined); setError(''); };
  return <ToolWorkspaceLayout workspace={<form noValidate className="space-y-5" onSubmit={(event) => { event.preventDefault(); clear(); try { setResult(analyzeTitle(title, keyword)); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Check your title.'); } }}>
    <Input id="draft-title" label="Draft video title" value={title} maxLength={2000} placeholder="Enter your title" onChange={(event) => { clear(); setTitle(event.target.value); }} />
    <p className="text-xs text-[var(--text-body)]">{title.length} / 100 character units. Spaces count; emoji can use more than one unit.</p>
    <Input id="title-keyword" label="Topic phrase (optional)" value={keyword} maxLength={100} placeholder="An exact phrase you want to include" onChange={(event) => { clear(); setKeyword(event.target.value); }} />
    <Slider id="title-preview-width" label="Illustrative preview width" min={240} max={480} value={width} unit=" px" onChange={setWidth} />
    <div ref={errorRef} tabIndex={-1} className="rounded focus-ring">{error && <Alert variant="error" title="Check your title">{error}</Alert>}</div>
    <div className="flex flex-wrap justify-between gap-3"><Button type="button" variant="outline" onClick={() => { clear(); setTitle(''); setKeyword(''); setWidth(320); }}>Reset</Button><Button type="submit">Check title</Button></div>
    <p className="text-xs text-[var(--text-body)]">Basic local text checks, with no AI or performance prediction. Titles are not saved or sent to a server.</p>
    <p role="status" className="text-xs text-[var(--text-body)]">{result ? 'Title checked. Review the notes and illustrative preview.' : 'Enter a draft and check it to see feedback.'}</p>
  </form>} results={<>
    {title.trim() && <div className="space-y-2"><p className="text-xs font-medium">Illustrative two-line preview</p><div style={{ width, maxWidth: '100%' }} className="p-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)]"><p className="text-sm font-semibold line-clamp-2 break-words">{title}</p><p className="mt-2 text-xs text-[var(--text-muted)]">Your channel</p></div><p className="text-xs text-[var(--text-body)]">Actual wrapping varies by YouTube surface, device, font, and language. This is not a fixed character cutoff.</p></div>}
    {result ? <ResultSummaryPanel embedded key={`${title}:${keyword}`} title="Title checks" badge="Heuristic" canCopy onCopy={() => navigator.clipboard.writeText([title, `${result.length} character units`, ...result.notes].join('\n'))}>
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))' }}><MetricCard label="Character units" value={`${result.length} / 100`} subtext={result.withinLimit ? 'Within the conservative length check' : 'Over the length limit'} /><MetricCard label="Space-separated words" value={String(result.words)} /></div>
      <ul className="list-disc pl-4 space-y-2 text-xs text-[var(--text-body)]">{result.notes.map((note) => <li key={note}>{note}</li>)}</ul><p className="text-xs text-[var(--text-body)]">These checks do not assess truthfulness, SEO ranking, policy compliance, or expected click-through rate.</p>
    </ResultSummaryPanel> : !title.trim() && <p className="py-10 text-center text-sm text-[var(--text-body)]">Your title preview and feedback will appear here.</p>}
  </>} />;
}
