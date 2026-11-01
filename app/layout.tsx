import type { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/config/site';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import ConsentBanner from '@/components/feedback/ConsentBanner';
import Footer from '@/components/layout/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import '@/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'YouTube creator tools',
    'YouTube thumbnail compressor',
    'YouTube thumbnail resizer',
    'Shorts safe zone checker',
    'YouTube title checker',
    'YouTube RPM calculator',
    'YouTube revenue calculator',
    'YouTube monetization calculator',
    'YouTube pre-publish checklist',
    'Publish Studio',
    'Creovly',
  ],
  authors: [{ name: 'Creovly' }],
  creator: 'Creovly',
  publisher: 'Creovly',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og-image.png'],
      },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Creovly',
  },
  alternates: {
    canonical: '/',
    languages: {
      en: `${siteConfig.url}/`,
      es: `${siteConfig.url}/es`,
      ja: `${siteConfig.url}/ja`,
      fr: `${siteConfig.url}/fr`,
      de: `${siteConfig.url}/de`,
      pt: `${siteConfig.url}/pt`,
      ko: `${siteConfig.url}/ko`,
      it: `${siteConfig.url}/it`,
      'x-default': `${siteConfig.url}/`,
    },
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${siteConfig.url}/#app`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      image: `${siteConfig.url}/og-image.png`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any (Modern Web Browser)',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'YouTube Thumbnail Compressor with local client-side processing',
        'YouTube Thumbnail Resizer with 16:9 1280x720 framing guides',
        'Logo Background Remover with local transparent PNG export',
        'YouTube Shorts Safe Zone Checker with vertical UI overlays',
        'YouTube Title Checker & Analyzer with mobile wrapping preview',
        'Creator Monetization, RPM, and Watch Hours scenario calculators',
        'Pre-Publish Creator Checklist and Publish Studio project packager',
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/favicon.svg`,
      sameAs: [siteConfig.links.github].filter(Boolean),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) with Google Consent Mode v2 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}var sc=null;try{sc=localStorage.getItem('creovly-consent');}catch(e){}gtag('consent','default',{'analytics_storage':sc==='granted'?'granted':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied'});gtag('js', new Date());gtag('config', 'G-0JBY0X9MY4', { anonymize_ip: true });`,
          }}
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0JBY0X9MY4"
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Creovly" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname.replace(/^\\/+/,'').split('/')[0];var l=['es','ja','fr','de','pt','ko','it'].indexOf(p)!==-1?p:'en';document.documentElement.lang=l;}catch(e){}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('creovly-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-ink)] antialiased selection:bg-[var(--brand-accent)] selection:text-white`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TooltipProvider>
          <Header />
          <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ConsentBanner />
        </TooltipProvider>
      </body>
    </html>
  );
}
