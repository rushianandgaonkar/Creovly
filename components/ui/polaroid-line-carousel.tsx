'use client';

import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ToolIllustration from '@/components/tools/ToolIllustration';
import { clampCard, nearestCard, stringY } from '@/lib/polaroid-navigation';
import type { ToolDefinition } from '@/types';
import { useI18n, LocalizedLink } from '@/lib/i18n';
import styles from './polaroid-line-carousel.module.css';

const nameOf = (tool: ToolDefinition) => tool.title.replace(/^YouTube /, '');

/** Hanging frames and string geometry adapted from the user's Polaroid reference.
 * Native scrolling keeps every tool link available without an animation loop. */
export default function PolaroidLineCarousel({ tools }: { tools: ToolDefinition[] }) {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLUListElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; scroll: number; moved: boolean } | undefined>(undefined);
  const suppressClick = useRef(false);
  const frame = useRef(0);
  const offsets = () => {
    const cards = Array.from(rail.current?.children ?? []) as HTMLElement[];
    return cards.map(card => card.offsetLeft - (cards[0]?.offsetLeft ?? 0));
  };
  const position = () => {
    const node = rail.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const cards = Array.from(node.children) as HTMLElement[];
    const heights = cards.map(card => stringY(card.offsetLeft + card.offsetWidth / 2 - node.scrollLeft, bounds.width, 24));
    cards.forEach((card, index) => card.style.setProperty('--hang-y', `${heights[index]}px`));
    setActive(nearestCard(node.scrollLeft, offsets()));
  };
  const onScroll = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => { frame.current = 0; position(); });
  };
  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    const observer = new ResizeObserver(position);
    observer.observe(node); position();
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); };
    // The registry is static for this surface; measurements refresh on resize.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tools.length]);

  const goTo = (index: number) => {
    const next = clampCard(index, tools.length);
    setActive(next);
    rail.current?.scrollTo({ left: offsets()[next] ?? 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const onKey = (event: KeyboardEvent<HTMLUListElement>) => {
    const focusedCard = (event.target as HTMLElement).closest<HTMLLIElement>('li[data-card]');
    const from = focusedCard ? Number(focusedCard.dataset.card) : active;
    const next = event.key === 'ArrowRight' ? from + 1 : event.key === 'ArrowLeft' ? from - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? tools.length - 1 : undefined;
    if (next === undefined || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const destination = clampCard(next, tools.length);
    if ((event.target as HTMLElement).closest('a')) {
      rail.current?.children[destination]?.querySelector('a')?.focus({ preventScroll: true });
    }
    goTo(destination);
  };
  const onDown = (event: PointerEvent<HTMLUListElement>) => {
    suppressClick.current = false;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, scroll: event.currentTarget.scrollLeft, moved: false };
  };
  const onMove = (event: PointerEvent<HTMLUListElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (!start.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(event.clientY - start.y)) {
      start.moved = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.dataset.dragging = 'true';
    }
    if (!start.moved) return;
    event.preventDefault(); event.currentTarget.scrollLeft = start.scroll - dx;
  };
  const endDrag = (event: PointerEvent<HTMLUListElement>) => {
    const start = drag.current;
    drag.current = undefined;
    event.currentTarget.dataset.dragging = 'false';
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (start?.moved) {
      suppressClick.current = true;
      goTo(nearestCard(event.currentTarget.scrollLeft, offsets()));
    }
  };
  const { t } = useI18n();
  const carousel = t.home.carousel;
  const current = tools[active];
  if (!current) return null;

  return <section className={styles.gallery} aria-labelledby="discover-heading" aria-roledescription="carousel">
    <div className={styles.heading}>
      <div><h2 id="discover-heading">{carousel.heading}</h2><p>{carousel.subheading}</p></div>
      <LocalizedLink href="/tools" className="focus-ring">{carousel.viewDirectory} <span aria-hidden="true">↗</span></LocalizedLink>
    </div>
    <div className={styles.stage}>
      <svg className={styles.string} viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 Q600 48 1200 0" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
      <ul ref={rail} className={`${styles.rail} focus-ring`} tabIndex={0} aria-label={carousel.ariaLabel}
        onScroll={onScroll} onKeyDown={onKey} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={endDrag} onPointerCancel={endDrag}
        onPointerLeave={() => { if (!drag.current?.moved) drag.current = undefined; }}
        onLostPointerCapture={() => { drag.current = undefined; if (rail.current) rail.current.dataset.dragging = 'false'; }}
        onDragStart={event => event.preventDefault()}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
        onFocusCapture={event => {
          const card = (event.target as HTMLElement).closest<HTMLLIElement>('li[data-card]');
          if (card && event.target !== rail.current) setActive(Number(card.dataset.card));
        }}
      >
        {tools.map((tool, index) => <li key={tool.id} data-card={index} className={styles.card} data-selected={active === index}>
          <LocalizedLink href={tool.href} className={`${styles.print} focus-ring`} draggable={false}>
            <div className={styles.picture} data-category={tool.category}>
              <ToolIllustration toolId={tool.id} />
              <span className={styles.category}>{tool.category}</span>
            </div>
            <div className={styles.cardBody}>
              <div>
                <h3>{nameOf(tool)}</h3>
                <p>{tool.description}</p>
              </div>
              <div className={styles.actionRow}>
                <span className={styles.badge}>
                  <span className={styles.badgeDot} aria-hidden="true" />
                  {carousel.localBadge}
                </span>
                <span className={styles.actionBtn} aria-hidden="true">
                  <ArrowUpRight className={styles.actionIcon} />
                </span>
              </div>
            </div>
          </LocalizedLink>
        </li>)}
      </ul>
    </div>
    <div className={styles.controls}>
      <p role="status" aria-live="polite" aria-atomic="true"><span className={styles.count}>{active + 1} / {tools.length}</span> {nameOf(current)}</p>
      <div className={styles.arrows}>
        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={carousel.prevAria} className="focus-ring"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.7" /></svg></button>
        <button type="button" onClick={() => goTo(active + 1)} disabled={active === tools.length - 1} aria-label={carousel.nextAria} className="focus-ring"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" /></svg></button>
      </div>
    </div>
    <div className={styles.index} role="group" aria-label={carousel.jumpAria}>
      {tools.map((tool, index) => <button key={tool.id} type="button" aria-pressed={active === index} onClick={() => goTo(index)} className="focus-ring">{nameOf(tool)}</button>)}
    </div>
    <p className={styles.hint}>{carousel.hint}</p>
  </section>;
}
