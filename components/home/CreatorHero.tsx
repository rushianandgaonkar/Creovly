import Button from '@/components/ui/Button';
import { toolRegistry } from '@/config/site';
import StudioHeroWorkspace from './StudioHeroWorkspace';

export default function CreatorHero() {
  const count = toolRegistry.filter(tool => tool.status === 'available').length;
  return (
    <section className="relative overflow-hidden pt-10 pb-6 sm:pt-14 sm:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[var(--text-ink)] leading-[1.06]">
            Create smarter. <span className="block sm:inline">Publish better.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-body)] max-w-xl mx-auto leading-relaxed">
            The pre-publish workspace for YouTube creators. Prepare visuals, calibrate titles,
            and package every upload before releasing.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button href="/studio" variant="primary">Launch Publish Studio</Button>
            <Button href="#tools" variant="outline">Explore {count} creator tools</Button>
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)]">No account required. All processing runs locally in your browser.</p>
        </div>

        {/* Flagship Interactive Studio Workspace Fragment */}
        <div className="pt-2 sm:pt-4">
          <StudioHeroWorkspace />
        </div>
      </div>
    </section>
  );
}
