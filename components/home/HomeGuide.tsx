import { toolRegistry } from '@/config/site';

const availableCount = toolRegistry.filter((tool) => tool.status === 'available').length;

const items = [
  {
    q: 'What is Creovly?',
    a: `Creovly is a pre-publish workspace for YouTube creators. It brings ${availableCount} working tools together: thumbnail compression and resizing, a title length checker, a Shorts safe zone guide, a logo background remover and revenue calculators.`,
  },
  {
    q: 'What should I check before uploading a video?',
    a: 'Confirm the thumbnail is 16:9 and under the 2 MB limit that applies to mobile uploads, keep key text clear of the timestamp badge, and check that the first words of your title still read well when a phone feed truncates it. Publish Studio gathers these checks in one place.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. The tools are free to use without signing up, and the image tools process files in your browser instead of uploading them.',
  },
  {
    q: 'Where do I start?',
    a: 'Pick a single tool from the carousel above for a quick job, or open Publish Studio to prepare a title, description and thumbnail together and export them as a ZIP.',
  },
];

export default function HomeGuide() {
  return (
    <section
      aria-labelledby="home-guide-heading"
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-[var(--border-hairline)]"
    >
      <h2
        id="home-guide-heading"
        className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-ink)] mb-6"
      >
        Common questions
      </h2>
      <dl className="space-y-5">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="text-base font-semibold text-[var(--text-ink)]">{item.q}</dt>
            <dd className="mt-1 text-sm sm:text-base leading-relaxed text-[var(--text-body)]">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
