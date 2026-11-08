/* Hallmark · genre: modern-minimal · macrostructure: Workbench */
'use client';

import { useState, useEffect, useId } from 'react';
import Input from '@/components/form/Input';
import Button from '@/components/ui/Button';
import ToolWorkspaceLayout from './ToolWorkspaceLayout';
import { useI18n } from '@/lib/i18n';
import {
  generateChannelNames,
  type GeneratedChannelName,
  type NicheCategory,
  type StyleArchetype,
  type NameLength,
} from '@/lib/channel-name-generator';

const FAVORITES_STORAGE_KEY = 'creovly_channel_name_favorites';

interface ChannelNameGeneratorProps {
  locale?: string;
}

export default function ChannelNameGenerator({}: ChannelNameGeneratorProps) {
  const { t } = useI18n();
  const cn = t.channelName || {
    title: 'YouTube Channel Name Generator',
    keywordLabel: 'Topic, niche, or keywords',
    keywordPlaceholder: 'e.g., tech reviews, cozy gaming, daily vlogs, finance',
    nicheHeading: 'Select content category',
    nicheAll: 'All Niches',
    nicheGaming: 'Gaming & Esports',
    nicheTech: 'Tech & Coding',
    nicheVlogs: 'Vlogs & Lifestyle',
    nicheFinance: 'Finance & Business',
    nicheEducation: 'Education & How-To',
    nicheEntertainment: 'Entertainment & Comedy',
    nicheFitness: 'Fitness & Health',
    nicheCreative: 'Creative & Design',
    styleHeading: 'Naming style & archetype',
    styleModern: 'Modern & Punchy',
    styleClassic: 'Classic & Authority',
    styleCreative: 'Creative & Quirky',
    styleMinimal: 'Minimal & Brand',
    lengthHeading: 'Name length',
    lengthAll: 'Any length',
    lengthShort: 'Short (1–2 words)',
    lengthMedium: 'Medium (2–3 words)',
    buttonGenerate: 'Generate Channel Names',
    buttonShuffle: 'Shuffle & Remix',
    buttonCopy: 'Copy',
    buttonCopied: 'Copied!',
    buttonSave: 'Save',
    buttonSaved: 'Saved',
    resultsHeading: 'Generated channel name ideas',
    resultsSubheading: 'Click any name to copy or check handle availability',
    favoritesHeading: 'Saved favorites',
    noFavorites: 'No favorites saved yet. Click the bookmark icon on any name.',
    handleCheckTip: 'Check @handle availability in YouTube Studio or at youtube.com/@handle',
    emptyPrompt: 'Enter your niche or keywords and select a style archetype to generate creative YouTube channel names.',
    aiBadge: 'Algorithmic Generator • 100% Client-Side',
  };

  const [keyword, setKeyword] = useState('');
  const [niche, setNiche] = useState<NicheCategory>('all');
  const [style, setStyle] = useState<StyleArchetype>('modern');
  const [length, setLength] = useState<NameLength>('all');
  const [results, setResults] = useState<GeneratedChannelName[]>([]);
  const [favorites, setFavorites] = useState<GeneratedChannelName[]>([]);
  const [activeTab, setActiveTab] = useState<'results' | 'favorites'>('results');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const inputId = useId();

  // Load initial favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable / private mode
    }
  }, []);

  // Generate an initial starter batch on first mount
  useEffect(() => {
    const initial = generateChannelNames({
      keyword: '',
      niche: 'all',
      style: 'modern',
      length: 'all',
    });
    setResults(initial);
  }, []);

  const handleGenerate = (customKeyword?: string, customNiche?: NicheCategory) => {
    const activeKeyword = customKeyword !== undefined ? customKeyword : keyword;
    const activeNiche = customNiche !== undefined ? customNiche : niche;

    const names = generateChannelNames({
      keyword: activeKeyword,
      niche: activeNiche,
      style,
      length,
    });
    setResults(names);
    setActiveTab('results');
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Failed to copy
    }
  };

  const toggleFavorite = (item: GeneratedChannelName) => {
    const exists = favorites.some((f) => f.name === item.name);
    let updated: GeneratedChannelName[];
    if (exists) {
      updated = favorites.filter((f) => f.name !== item.name);
    } else {
      updated = [item, ...favorites];
    }
    setFavorites(updated);
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  };

  const copyAllFavorites = () => {
    if (favorites.length === 0) return;
    const all = favorites.map((f) => `${f.name} (${f.handle})`).join('\n');
    copyToClipboard(all, 'all-favorites');
  };

  const niches: { id: NicheCategory; label: string }[] = [
    { id: 'all', label: cn.nicheAll },
    { id: 'gaming', label: cn.nicheGaming },
    { id: 'tech', label: cn.nicheTech },
    { id: 'vlogs', label: cn.nicheVlogs },
    { id: 'finance', label: cn.nicheFinance },
    { id: 'education', label: cn.nicheEducation },
    { id: 'entertainment', label: cn.nicheEntertainment },
    { id: 'fitness', label: cn.nicheFitness },
    { id: 'creative', label: cn.nicheCreative },
  ];

  const styles: { id: StyleArchetype; label: string; sub: string }[] = [
    { id: 'modern', label: cn.styleModern, sub: 'Apex, Nova, HQ, Lab' },
    { id: 'classic', label: cn.styleClassic, sub: 'Chronicles, Standard, Academy' },
    { id: 'creative', label: cn.styleCreative, sub: 'Curious, Theory, Velvet' },
    { id: 'minimal', label: cn.styleMinimal, sub: 'OS, Mono, Studio, Base' },
  ];

  const lengths: { id: NameLength; label: string }[] = [
    { id: 'all', label: cn.lengthAll },
    { id: 'short', label: cn.lengthShort },
    { id: 'medium', label: cn.lengthMedium },
  ];

  const sampleKeywords = [
    'Tech Reviews',
    'Retro Gaming',
    'Cozy Coffee',
    'Personal Finance',
    'Fitness Habits',
    'Indie Dev',
  ];

  return (
    <ToolWorkspaceLayout
      workspace={
        <div className="space-y-6">
          {/* AI / Client-side badge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-mono font-medium text-[var(--text-ink)]">
                {cn.aiBadge}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Zero Login
            </span>
          </div>

          {/* Keyword Input */}
          <div className="space-y-2">
            <Input
              id={inputId}
              label={cn.keywordLabel}
              placeholder={cn.keywordPlaceholder}
              value={keyword}
              maxLength={80}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            {/* Quick Inspiration Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-[var(--text-muted)] mr-1">
                Quick ideas:
              </span>
              {sampleKeywords.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => {
                    setKeyword(sample);
                    handleGenerate(sample);
                  }}
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Niche Categories */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              {cn.nicheHeading}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {niches.map((n) => {
                const isSelected = niche === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setNiche(n.id);
                      handleGenerate(keyword, n.id);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 text-[var(--text-ink)] shadow-sm'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:border-[var(--border-subtle)]'
                    }`}
                  >
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style Archetypes */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              {cn.styleHeading}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {styles.map((s) => {
                const isSelected = style === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 text-[var(--text-ink)] shadow-sm'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:border-[var(--border-subtle)]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[var(--text-ink)]">
                      {s.label}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
                      {s.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Length Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              {cn.lengthHeading}
            </label>
            <div className="flex flex-wrap gap-2">
              {lengths.map((l) => {
                const isSelected = length === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLength(l.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 text-[var(--text-ink)]'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] text-[var(--text-muted)] hover:text-[var(--text-ink)]'
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="primary"
              className="flex-1 py-3 text-sm font-semibold shadow-md"
              onClick={() => handleGenerate()}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {cn.buttonGenerate}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="py-3 text-sm font-medium"
              onClick={() => handleGenerate()}
            >
              <svg
                className="w-4 h-4 mr-1.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {cn.buttonShuffle}
            </Button>
          </div>
        </div>
      }
      results={
        <div className="space-y-4">
          {/* Header tabs (Results vs Favorites) */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-hairline)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('results')}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all ${
                  activeTab === 'results'
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
                }`}
              >
                {cn.resultsHeading} ({results.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('favorites')}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'favorites'
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
                }`}
              >
                <span>★ {cn.favoritesHeading}</span>
                {favorites.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] flex items-center justify-center font-mono">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>
            {activeTab === 'favorites' && favorites.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                className="text-xs py-1 px-2 text-[var(--text-muted)] hover:text-[var(--text-ink)]"
                onClick={copyAllFavorites}
              >
                {copiedId === 'all-favorites' ? cn.buttonCopied : 'Copy All'}
              </Button>
            )}
          </div>

          {/* Subheading & Handle Tip */}
          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/80 text-[11px] text-[var(--text-muted)] leading-relaxed flex items-start gap-2">
            <svg
              className="w-4 h-4 text-sky-400 shrink-0 mt-0.5"
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
            <div>
              <p className="font-medium text-zinc-300">{cn.resultsSubheading}</p>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{cn.handleCheckTip}</p>
            </div>
          </div>

          {/* List Content */}
          {activeTab === 'results' ? (
            results.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--text-muted)] border border-dashed border-[var(--border-hairline)] rounded-xl">
                {cn.emptyPrompt}
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                {results.map((item) => {
                  const isFav = favorites.some((f) => f.name === item.name);
                  const isCopied = copiedId === item.id;
                  const handleUrl = `https://www.youtube.com/${item.handle}`;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] hover:border-indigo-500/40 hover:bg-indigo-500/[0.03] transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[var(--text-ink)] truncate tracking-tight">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                            {item.charCount} chars
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={handleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Check handle on YouTube"
                            className="text-xs font-mono text-zinc-400 hover:text-sky-400 flex items-center gap-1 transition-colors"
                          >
                            <span>{item.handle}</span>
                            <span className="text-[10px] opacity-60">↗</span>
                          </a>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Bookmark Favorite */}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(item)}
                          title={isFav ? cn.buttonSaved : cn.buttonSave}
                          aria-label={isFav ? cn.buttonSaved : cn.buttonSave}
                          className={`p-2 rounded-lg border transition-all text-xs ${
                            isFav
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                              : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                          }`}
                        >
                          {isFav ? '★' : '☆'}
                        </button>

                        {/* Copy Button */}
                        <Button
                          type="button"
                          variant="outline"
                          className="text-xs py-1.5 px-3 min-w-[70px]"
                          onClick={() => copyToClipboard(item.name, item.id)}
                        >
                          {isCopied ? (
                            <span className="text-emerald-400 font-semibold">
                              {cn.buttonCopied}
                            </span>
                          ) : (
                            cn.buttonCopy
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Favorites Tab */
            <div>
              {favorites.length === 0 ? (
                <div className="p-8 text-center text-xs text-[var(--text-muted)] border border-dashed border-[var(--border-hairline)] rounded-xl">
                  {cn.noFavorites}
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {favorites.map((item) => {
                    const isCopied = copiedId === item.id;
                    const handleUrl = `https://www.youtube.com/${item.handle}`;

                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-subtle)] flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[var(--text-ink)] truncate tracking-tight">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                              {item.charCount} chars
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={handleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono text-zinc-400 hover:text-sky-400 flex items-center gap-1 transition-colors"
                            >
                              <span>{item.handle}</span>
                              <span className="text-[10px] opacity-60">↗</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleFavorite(item)}
                            title="Remove from favorites"
                            className="p-2 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-400 text-xs hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-400 transition-colors"
                          >
                            ★
                          </button>
                          <Button
                            type="button"
                            variant="outline"
                            className="text-xs py-1.5 px-3 min-w-[70px]"
                            onClick={() => copyToClipboard(item.name, item.id)}
                          >
                            {isCopied ? (
                              <span className="text-emerald-400 font-semibold">
                                {cn.buttonCopied}
                              </span>
                            ) : (
                              cn.buttonCopy
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      }
    />
  );
}

