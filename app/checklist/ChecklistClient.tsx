'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PageHero from '@/components/ui/PageHero';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const checklistData: ChecklistSection[] = [
  {
    title: '01. Visual Packaging & Assets',
    items: [
      {
        id: 'thumb-size',
        title: 'Thumbnail format, dimensions, and file size suit your upload',
        description: 'Use JPEG or PNG and a 16:9 image for standard videos. Mobile video-thumbnail uploads have a 2 MB limit; desktop limits differ.',
      },
      {
        id: 'thumb-mobile',
        title: 'Thumbnail text is readable on mobile devices (small screen check)',
        description: 'Over 70% of YouTube viewership occurs on mobile viewports.',
      },
      {
        id: 'shorts-overlay',
        title: 'Shorts critical captions are outside the right-side UI overlay safe zone',
        description: 'Ensures comments, like buttons, and channel handle do not cover text.',
      },
    ],
  },
  {
    title: '02. Title, Description & Metadata',
    items: [
      {
        id: 'title-hook',
        title: 'Primary hook or keyword is within the first 50 characters of the title',
        description: 'Prevents mobile cutoff in push notifications and recommendation feeds.',
      },
      {
        id: 'timestamps',
        title: 'Timestamps / Video Chapters are accurately formatted (00:00 start)',
        description: 'Required for Google Search key moments indexation.',
      },
      {
        id: 'affiliate-disclosure',
        title: 'Affiliate links include explicit FTC disclosure notice',
        description: 'Mandatory legal compliance for YouTube monetization.',
      },
    ],
  },
];

export const ChecklistClient: React.FC = () => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('creovly-checklist');
      if (stored) {
        setCheckedState(JSON.parse(stored));
      }
    } catch (_) {}
    setIsLoaded(true);
  }, []);

  const toggleItem = (id: string) => {
    setCheckedState((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('creovly-checklist', JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  };

  const handleReset = () => {
    setCheckedState({});
    try {
      localStorage.removeItem('creovly-checklist');
    } catch (_) {}
  };

  const totalItems = checklistData.reduce((acc, sec) => acc + sec.items.length, 0);
  const completedCount = isLoaded
    ? checklistData
        .flatMap((s) => s.items)
        .filter((item) => checkedState[item.id]).length
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <PageHero tone="amber" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Badge variant="new">Retention & Quality</Badge>
              <span className="text-xs font-mono text-[var(--text-muted)]">Pre-Flight Audit</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-ink)]">
              YouTube Pre-Publish Checklist
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-body)] leading-relaxed max-w-2xl">
              Never publish with a typo, an uncompressed thumbnail, or broken affiliate links. Run through this pre-flight checklist before switching your video visibility to Public.
            </p>
          </div>

          {isLoaded && completedCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[var(--text-muted)] hover:text-red-500 transition-colors underline shrink-0 cursor-pointer"
            >
              Reset checklist
            </button>
          )}
        </div>
      </PageHero>

      {/* Progress & Readiness Banner */}
      <div className="mb-6 p-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text-body)]">
            Audit Readiness: <strong className="text-[var(--text-ink)]">{completedCount} of {totalItems} completed</strong>
          </span>
          <span className={completedCount === totalItems ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[var(--brand-accent)] font-bold'}>
            {Math.round((completedCount / totalItems) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--bg-canvas-subtle)] border border-[var(--border-hairline-subtle)] overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              completedCount === totalItems ? 'bg-emerald-500' : 'bg-[var(--brand-accent)]'
            }`}
            style={{ width: `${(completedCount / totalItems) * 100}%` }}
          />
        </div>
      </div>

      {/* 100% Complete Celebration Banner */}
      {isLoaded && completedCount === totalItems && totalItems > 0 && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 flex flex-wrap items-center justify-between gap-3 mb-6 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <strong className="text-xs sm:text-sm font-semibold">100% Pre-Flight Audit Passed — Upload Ready!</strong>
          </div>
          <Button href="/studio" variant="primary" size="sm">
            Package Project in Studio &rarr;
          </Button>
        </div>
      )}

      {/* Interactive Checklist Groups */}
      <div className="space-y-6">
        {checklistData.map((section) => {
          const groupCompleted = section.items.filter((i) => checkedState[i.id]).length;
          const isGroupAllDone = groupCompleted === section.items.length && section.items.length > 0;
          return (
            <div
              key={section.title}
              className={`rounded-xl border transition-all duration-200 bg-[var(--bg-canvas-elevated)] p-6 shadow-2xs ${
                isGroupAllDone
                  ? 'border-emerald-500/30 ring-1 ring-emerald-500/15'
                  : 'border-[var(--border-hairline)]'
              }`}
            >
              <h2 className="text-sm font-semibold tracking-tight text-[var(--text-ink)] pb-3 border-b border-[var(--border-hairline-subtle)] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span>{section.title}</span>
                  {isGroupAllDone && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      ✓ Complete
                    </span>
                  )}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {groupCompleted} / {section.items.length} items
                </span>
              </h2>
              <div className="mt-4 space-y-3">
                {section.items.map((item) => {
                  const isChecked = Boolean(checkedState[item.id]);
                  return (
                    <label
                      key={item.id}
                      className="flex items-start gap-3 cursor-pointer group select-none p-2 rounded-lg hover:bg-[var(--bg-canvas-subtle)] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        className="mt-0.5 w-4 h-4 rounded border-[var(--border-hairline-strong)] accent-[var(--brand-accent)] cursor-pointer"
                      />
                      <div>
                        <span
                          className={`text-sm font-medium transition-colors ${
                            isChecked
                              ? 'line-through text-[var(--text-muted)]'
                              : 'text-[var(--text-ink)] group-hover:text-[var(--brand-accent)]'
                          }`}
                        >
                          {item.title}
                        </span>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-hairline)]">
        <span className="text-xs text-[var(--text-muted)]">
          Checklist progress auto-saves to your local browser storage.
        </span>
        <Button variant="primary" size="md" href="/studio">
          Open Publish Studio &rarr;
        </Button>
      </div>
    </div>
  );
};

export default ChecklistClient;
