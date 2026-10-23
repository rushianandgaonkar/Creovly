import Button from '@/components/ui/Button';
import { toolRegistry } from '@/config/site';

export default function CreatorHero() {
  const count = toolRegistry.filter(tool => tool.status === 'available').length;
  return <section className="relative overflow-hidden pt-10 pb-2 sm:pt-14 sm:pb-4">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-[var(--text-ink)] leading-[1.06]">
        Create smarter. <span className="block sm:inline">Publish better.</span>
      </h1>
      <p className="mt-5 text-base text-[var(--text-body)] max-w-xl mx-auto leading-relaxed">
        Prepare your visuals, check your title, and plan your next upload.
        A useful little toolkit for every YouTube creator.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href="#tools">Explore {count} creator tools</Button>
        <Button href="/studio" variant="outline">Open Publish Studio</Button>
      </div>
      <p className="mt-5 text-xs text-[var(--text-body)]">No sign-up. Tools run in your browser.</p>
    </div>
  </section>;
}
