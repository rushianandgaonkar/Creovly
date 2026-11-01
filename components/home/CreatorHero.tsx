import Button from '@/components/ui/Button';
import RippleBackground from '@/components/ui/interactive-ripple-background';
import { toolRegistry } from '@/config/site';
import StudioHeroWorkspace from './StudioHeroWorkspace';

export default function CreatorHero() {
  const count = toolRegistry.filter(tool => tool.status === 'available').length;
  return (
    <section className="relative overflow-hidden pt-10 pb-6 sm:pt-14 sm:pb-10">
      <RippleBackground className="py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="max-w-3xl mx-auto">
            {/* Ambient Floating Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)]/90 backdrop-blur shadow-[var(--shadow-button-elevated)] text-xs text-[var(--text-body)] mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
              <span className="font-medium">The pre-publish workspace for YouTube creators</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-[var(--text-ink)] leading-[1.08]">
              <span>Free YouTube Creator Tools</span>
              <span className="sr-only"> &mdash; </span>
              <span className="block text-xl sm:text-3xl font-medium text-[var(--text-muted)] mt-2.5 tracking-normal">
                Create Smarter, Publish Better
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-body)] max-w-xl mx-auto leading-relaxed">
              Prepare visuals, calibrate titles, stress-test hooks,
              and package every upload before releasing.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button href="/studio" variant="primary" size="lg">Launch Publish Studio</Button>
              <Button href="#tools" variant="outline" size="lg">Explore {count} creator tools</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                100% Client-side
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" aria-hidden="true" />
                No account required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                Private & zero cloud uploads
              </span>
            </div>
          </div>

          {/* Flagship Interactive Studio Workspace Fragment */}
          <div className="pt-2 sm:pt-4">
            <StudioHeroWorkspace />
          </div>
        </div>
      </RippleBackground>
    </section>
  );
}
