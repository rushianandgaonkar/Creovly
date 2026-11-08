/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useState, useEffect, useId, useMemo } from 'react';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useI18n } from '@/lib/i18n';
import {
  generateTagClusters,
  calculateTagCharacters,
  formatTagsForClipboard,
  type NicheCategory,
  type TagClusterGroup,
  type TagClusterItem,
} from '@/lib/tag-generator';

const EXAMPLE_TOPICS = [
  'iPhone 16 Pro Review',
  'Minecraft Survival Guide',
  'Budget Travel Japan',
  'React Next.js Tutorial',
  'Investing for Beginners',
];

interface TagGeneratorProps {
  locale?: string;
}

export default function TagGenerator({}: TagGeneratorProps) {
  const { t } = useI18n();
  const tg = t.tagGenerator || {
    title: 'YouTube Tag Generator',
    inputLabel: 'Video topic, title, or keywords',
    inputPlaceholder: 'e.g., iPhone 16 review, Minecraft survival guide, personal finance for beginners',
    nicheHeading: 'Content Category',
    nicheGeneral: 'General / All',
    nicheGaming: 'Gaming',
    nicheTech: 'Tech & Software',
    nicheEducation: 'Education & Tutorials',
    nicheVlogs: 'Vlogs & Lifestyle',
    nicheFinance: 'Finance & Business',
    nicheEntertainment: 'Entertainment',
    nicheFitness: 'Fitness & Health',
    nicheCreative: 'Design & Creative',
    buttonGenerate: 'Generate Tags',
    buttonCopyAll: 'Copy All Tags',
    buttonCopied: 'Copied to Clipboard!',
    buttonClear: 'Clear Selection',
    buttonSelectAll: 'Select All',
    buttonAddCustom: 'Add',
    customTagPlaceholder: 'Add custom tag...',
    charCountLabel: 'YouTube Studio 500-Char Limit',
    charLimitSafe: 'characters used',
    charLimitWarning: 'Approaching 500-character limit',
    charLimitExceeded: 'Exceeds YouTube Studio 500-character limit!',
    clustersHeading: 'Generated Tag Clusters',
    clusterPrimary: 'Primary & Exact Match',
    clusterSecondary: 'Variants & Synonyms',
    clusterLongTail: 'Long-Tail & Questions',
    clusterBroad: 'Broad Topic Tags',
    clusterMisspellings: 'Common Misspellings',
    tagTipHeading: 'YouTube Official Tag Advice',
    tagTipBody: 'YouTube notes that tags are primarily useful when viewers commonly misspell your video search terms. Video titles, descriptions, and thumbnails drive the majority of discovery.',
    emptyPrompt: 'Enter your video topic or title above to generate organized keyword clusters and copy comma-separated tags.',
    aiBadge: 'Algorithmic Clustering • 500-Char Limit Meter',
    totalTagsLabel: 'tags selected',
    removeTagAria: 'Remove tag',
    addTagAria: 'Add custom tag',
  };

  const [inputTopic, setInputTopic] = useState('iPhone 16 Pro Review');
  const [niche, setNiche] = useState<NicheCategory>('tech');
  const [clusters, setClusters] = useState<TagClusterGroup[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [customTagInput, setCustomTagInput] = useState('');
  const [copied, setCopied] = useState(false);

  const inputId = useId();
  const customInputId = useId();

  // Run generation on initial mount with default topic
  useEffect(() => {
    const res = generateTagClusters('iPhone 16 Pro Review', 'tech');
    setClusters(res.clusters);
    setSelectedIds(new Set(res.defaultSelectedIds));
  }, []);

  const handleGenerate = (topicToUse?: string, nicheToUse?: NicheCategory) => {
    const targetTopic = topicToUse ?? inputTopic;
    const targetNiche = nicheToUse ?? niche;
    if (!targetTopic.trim()) return;

    const res = generateTagClusters(targetTopic, targetNiche);
    setClusters(res.clusters);
    setSelectedIds(new Set(res.defaultSelectedIds));
  };

  const toggleTag = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    const all = clusters.flatMap((c) => c.tags.map((t) => t.id));
    setSelectedIds(new Set(all));
  };

  const clearAll = () => {
    setSelectedIds(new Set());
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customTagInput.trim().toLowerCase();
    if (!clean) return;

    const customItem: TagClusterItem = {
      id: `custom-${Date.now()}`,
      text: clean,
      charCount: clean.length,
    };

    setClusters((prev) => {
      const primaryGroup = prev.find((c) => c.id === 'primary');
      if (primaryGroup) {
        return prev.map((c) =>
          c.id === 'primary' ? { ...c, tags: [customItem, ...c.tags] } : c,
        );
      }
      return [{ id: 'primary' as const, tags: [customItem] }, ...prev];
    });

    setSelectedIds((prev) => new Set([customItem.id, ...prev]));
    setCustomTagInput('');
  };

  // Compile selected tags list
  const selectedTagStrings = useMemo(() => {
    const idToText = new Map<string, string>();
    for (const cluster of clusters) {
      for (const tag of cluster.tags) {
        idToText.set(tag.id, tag.text);
      }
    }
    const tags: string[] = [];
    for (const id of selectedIds) {
      const text = idToText.get(id);
      if (text) tags.push(text);
    }
    return tags;
  }, [clusters, selectedIds]);

  const totalCharacters = useMemo(
    () => calculateTagCharacters(selectedTagStrings),
    [selectedTagStrings],
  );

  const charLimitPercentage = Math.min(100, Math.round((totalCharacters / 500) * 100));
  const isOverLimit = totalCharacters > 500;
  const isWarningLimit = totalCharacters >= 450 && !isOverLimit;

  const copyTags = async () => {
    if (selectedTagStrings.length === 0) return;
    const textToCopy = formatTagsForClipboard(selectedTagStrings);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = textToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getClusterTitle = (id: TagClusterGroup['id']) => {
    switch (id) {
      case 'primary':
        return tg.clusterPrimary;
      case 'secondary':
        return tg.clusterSecondary;
      case 'longTail':
        return tg.clusterLongTail;
      case 'broad':
        return tg.clusterBroad;
      case 'misspellings':
        return tg.clusterMisspellings;
      default:
        return id;
    }
  };

  const niches: { id: NicheCategory; label: string }[] = [
    { id: 'tech', label: tg.nicheTech },
    { id: 'gaming', label: tg.nicheGaming },
    { id: 'education', label: tg.nicheEducation },
    { id: 'finance', label: tg.nicheFinance },
    { id: 'vlogs', label: tg.nicheVlogs },
    { id: 'entertainment', label: tg.nicheEntertainment },
    { id: 'fitness', label: tg.nicheFitness },
    { id: 'creative', label: tg.nicheCreative },
    { id: 'general', label: tg.nicheGeneral },
  ];

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          {/* Header pill */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              {tg.aiBadge}
            </span>
          </div>

          {/* Topic / Title Input */}
          <div className="space-y-2">
            <Input
              id={inputId}
              label={tg.inputLabel}
              type="text"
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder={tg.inputPlaceholder}
              className="w-full text-sm font-medium"
            />
          </div>

          {/* Quick Idea / Inspiration Pills */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Quick examples:</span>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLE_TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setInputTopic(topic);
                    handleGenerate(topic);
                  }}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                    inputTopic === topic
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:text-[var(--text-ink)] hover:border-[var(--border-hairline-strong)]'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Content Niche Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[var(--text-ink)] uppercase tracking-wider">
              {tg.nicheHeading}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {niches.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setNiche(item.id);
                    handleGenerate(undefined, item.id);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left transition-all ${
                    niche === item.id
                      ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40 shadow-xs'
                      : 'bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:border-[var(--border-hairline-strong)] hover:text-[var(--text-body)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            type="button"
            variant="primary"
            className="w-full justify-center text-sm py-2.5 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
            onClick={() => handleGenerate()}
          >
            {tg.buttonGenerate}
          </Button>

          {/* Add Custom Tag Form */}
          <form onSubmit={handleAddCustomTag} className="pt-4 border-t border-[var(--border-hairline)] space-y-2">
            <label htmlFor={customInputId} className="block text-[11px] font-mono text-[var(--text-muted)]">
              {tg.customTagPlaceholder}
            </label>
            <div className="flex gap-2">
              <input
                id={customInputId}
                type="text"
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                placeholder="e.g., ios 18.2 update"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-ink)] focus:outline-none focus:border-indigo-500"
              />
              <Button type="submit" variant="secondary" className="text-xs py-1.5 px-3">
                {tg.buttonAddCustom}
              </Button>
            </div>
          </form>
        </div>
      }
      results={
        <div className="space-y-6">
          {/* 500-Character Capacity & Copy Bar */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                  {tg.charCountLabel}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span
                    className={`text-2xl font-black font-mono tracking-tight ${
                      isOverLimit
                        ? 'text-red-400'
                        : isWarningLimit
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {totalCharacters}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">/ 500 characters</span>
                  <span className="text-xs text-zinc-500">
                    ({selectedTagStrings.length} {tg.totalTagsLabel})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="primary"
                  className={`text-xs py-2 px-4 font-semibold transition-all shadow-md ${
                    copied
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : isOverLimit
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                  }`}
                  onClick={copyTags}
                  disabled={selectedTagStrings.length === 0}
                >
                  {copied ? (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {tg.buttonCopied}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {tg.buttonCopyAll}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Visual Capacity Meter Bar */}
            <div className="space-y-1">
              <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isOverLimit
                      ? 'bg-red-500'
                      : isWarningLimit
                      ? 'bg-amber-400'
                      : 'bg-indigo-500'
                  }`}
                  style={{ width: `${charLimitPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>0</span>
                {isOverLimit ? (
                  <span className="text-red-400 font-bold">{tg.charLimitExceeded}</span>
                ) : isWarningLimit ? (
                  <span className="text-amber-400 font-medium">{tg.charLimitWarning}</span>
                ) : (
                  <span className="text-emerald-400">
                    {500 - totalCharacters} chars remaining
                  </span>
                )}
                <span>500</span>
              </div>
            </div>

            {/* Sub-toolbar: Select all / Clear */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-400 font-mono">
                Click any tag chip below to toggle inclusion
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium"
                >
                  {tg.buttonSelectAll}
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[11px] text-zinc-400 hover:text-zinc-300 underline font-medium"
                >
                  {tg.buttonClear}
                </button>
              </div>
            </div>
          </div>

          {/* Formatted Paste Preview for YouTube Studio */}
          {selectedTagStrings.length > 0 && (
            <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>YouTube Studio Comma-Separated Format</span>
                <span className="text-zinc-500">Ready to paste</span>
              </div>
              <p className="text-xs font-mono text-zinc-300 bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800/80 break-words leading-relaxed max-h-24 overflow-y-auto">
                {formatTagsForClipboard(selectedTagStrings)}
              </p>
            </div>
          )}

          {/* Tag Clusters */}
          {clusters.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--text-muted)] border border-dashed border-[var(--border-hairline)] rounded-xl">
              {tg.emptyPrompt}
            </div>
          ) : (
            <div className="space-y-5">
              {clusters.map((cluster) => (
                <div key={cluster.id} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-ink)]">
                      {getClusterTitle(cluster.id)}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {cluster.tags.filter((t) => selectedIds.has(t.id)).length} / {cluster.tags.length} selected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cluster.tags.map((tag) => {
                      const isSelected = selectedIds.has(tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag.id)}
                          aria-pressed={isSelected}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 hover:bg-indigo-600/30 shadow-xs'
                              : 'bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] border-[var(--border-hairline)] hover:border-[var(--border-hairline-strong)] hover:text-[var(--text-ink)] opacity-60 hover:opacity-100'
                          }`}
                        >
                          <span>{tag.text}</span>
                          <span
                            className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                              isSelected
                                ? 'bg-indigo-500/30 text-indigo-200'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {tag.charCount}
                          </span>
                          <span
                            className="text-xs ml-0.5"
                            aria-label={isSelected ? tg.removeTagAria : tg.addTagAria}
                          >
                            {isSelected ? '×' : '+'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Official YouTube Guidance Notice Card */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-amber-400 shrink-0 mt-0.5"
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
              <span className="font-semibold text-amber-300 block">
                {tg.tagTipHeading}
              </span>
              <p className="text-zinc-300 leading-relaxed">
                {tg.tagTipBody}
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}

