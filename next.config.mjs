import constants from 'next/constants.js';

/** @param {string} phase @returns {import('next').NextConfig} */
export default function nextConfig(phase) {
  const isDev = phase === constants.PHASE_DEVELOPMENT_SERVER;

  return {
    output: 'export',
    reactStrictMode: true,
    // Avoid the development badge's separate UI during local product testing.
    // Framework build/runtime errors remain enabled.
    devIndicators: false,
    // Development must not overwrite the files used by a production preview.
    distDir: isDev ? '.next-dev' : '.next',
    ...(isDev && {
      async redirects() {
        return [
          {
            source: '/sitemap-0.xml',
            destination: '/sitemap.xml',
            permanent: true,
          },
          {
            source: '/sitemap_index.xml',
            destination: '/sitemap.xml',
            permanent: true,
          },
          {
            source: '/media-kit',
            destination: '/about',
            permanent: true,
          },
          {
            source: '/press',
            destination: '/about',
            permanent: true,
          },
        ];
      },
    }),
  };
}
