import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: '404 — Page Not Found | Creovly',
  description: 'The requested page or creator tool could not be found.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas-elevated)] text-xs font-mono text-[var(--brand-accent)] font-semibold">
        Error 404
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-ink)]">
        Page Not Found
      </h1>

      <p className="text-sm sm:text-base text-[var(--text-body)] max-w-md mx-auto leading-relaxed">
        The creator tool, guide, or page you are looking for doesn’t exist or may have been moved.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" variant="primary" size="md">
          Return to Home
        </Button>
        <Button href="/tools" variant="outline" size="md">
          Explore All Tools
        </Button>
        <Button href="/studio" variant="outline" size="md">
          Launch Publish Studio
        </Button>
      </div>

      <div className="pt-10 border-t border-[var(--border-hairline)] text-xs text-[var(--text-muted)] font-mono">
        Need help finding something? <Link href="/contact" className="text-[var(--brand-accent)] underline">Contact support</Link>
      </div>
    </div>
  );
}

