import constants from 'next/constants.js';

/** @param {string} phase @returns {import('next').NextConfig} */
export default function nextConfig(phase) {
  return {
    reactStrictMode: true,
    // Avoid the development badge's separate UI during local product testing.
    // Framework build/runtime errors remain enabled.
    devIndicators: false,
    // Development must not overwrite the files used by a production preview.
    distDir: phase === constants.PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  };
}
