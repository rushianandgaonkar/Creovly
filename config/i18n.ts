export interface LanguageInfo {
  code: string;
  name: string; // English name
  label: string; // Native language shown in selector
}

export const languages: Record<string, LanguageInfo> = {
  es: { code: 'es', name: 'Spanish', label: 'Español' },
  ja: { code: 'ja', name: 'Japanese', label: '日本語' },
  fr: { code: 'fr', name: 'French', label: 'Français' },
  de: { code: 'de', name: 'German', label: 'Deutsch' },
  pt: { code: 'pt', name: 'Portuguese', label: 'Português' },
  ko: { code: 'ko', name: 'Korean', label: '한국어' },
  it: { code: 'it', name: 'Italian', label: 'Italiano' },
  en: { code: 'en', name: 'English', label: 'English' },
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

// The display order requested by user for the language selector
export const selectorLanguages: LanguageInfo[] = [
  languages.es,
  languages.ja,
  languages.fr,
  languages.de,
  languages.pt,
  languages.ko,
  languages.it,
  languages.en,
];

export const supportedLocales = Object.keys(languages) as Locale[];
export const nonDefaultLocales = supportedLocales.filter((l) => l !== defaultLocale);

export const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  ja: 'ja_JP',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR',
  ko: 'ko_KR',
  it: 'it_IT',
};

export function getOgLocale(locale: Locale): string {
  return ogLocaleMap[locale] || 'en_US';
}

/**
 * Extracts locale from a given pathname (e.g. '/es/tools' -> 'es', '/tools' -> 'en').
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (!pathname) return defaultLocale;
  const segments = pathname.replace(/^\/+/, '').split('/');
  const first = segments[0];
  if (first && first in languages) {
    return first as Locale;
  }
  return defaultLocale;
}

/**
 * Strips any locale prefix from a pathname to get the canonical English path.
 * e.g. '/es/tools/youtube-thumbnail-compressor' -> '/tools/youtube-thumbnail-compressor'
 * e.g. '/es' -> '/'
 */
export function stripLocale(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = clean.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0] in languages) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return clean;
}

/**
 * Translates a pathname for a target locale following the recipe:
 * - If target is defaultLocale ('en'), strips prefix: '/tools'
 * - If target is non-default, prefixes: '/es/tools'
 */
export function translatePath(pathname: string, targetLocale: Locale): string {
  const base = stripLocale(pathname);
  if (targetLocale === defaultLocale) {
    return base;
  }
  return base === '/' ? `/${targetLocale}` : `/${targetLocale}${base}`;
}

const translatedGuideSlugs = [
  'youtube-thumbnail-blueprint',
  'decoding-youtube-rpm',
  'youtube-shorts-safe-zone',
  'youtube-banner-size',
  'youtube-monetization-requirements',
  'how-to-change-youtube-thumbnail',
  'how-much-does-youtube-pay-per-1000-views',
];

/**
 * Generates an alternates dictionary containing canonical and all language alternates for hreflang tags.
 */
export function getLanguageAlternates(pathname: string, baseUrl: string = 'https://creovly.com'): Record<string, string> {
  const base = stripLocale(pathname);
  const cleanBase = base === '/' ? '' : base;
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

  const isGuide = base.startsWith('/guides/');
  const guideSlug = isGuide ? base.replace(/^\/guides\//, '').split('/')[0] : '';
  const isEnglishOnlyGuide = isGuide && guideSlug && !translatedGuideSlugs.includes(guideSlug);

  const alts: Record<string, string> = {};
  if (isEnglishOnlyGuide) {
    alts['en'] = `${normalizedBaseUrl}${cleanBase}`;
    alts['x-default'] = `${normalizedBaseUrl}${cleanBase}`;
    return alts;
  }

  for (const loc of supportedLocales) {
    if (loc === defaultLocale) {
      alts[loc] = `${normalizedBaseUrl}${cleanBase}`;
    } else {
      alts[loc] = `${normalizedBaseUrl}/${loc}${cleanBase}`;
    }
  }
  alts['x-default'] = `${normalizedBaseUrl}${cleanBase}`;
  return alts;
}

export interface ToolTranslation {
  title: string;
  /** Shorter <title> for search results (≤50 chars; layout adds " | Creovly"). */
  seoTitle?: string;
  description: string;
  categoryLabel: string;
  keywords: string[];
}

export interface PageTranslation {
  title: string;
  description: string;
  heading?: string;
  subheading?: string;
}

export interface I18nContent {
  nav: {
    tools: string;
    studio: string;
    checklist: string;
    guides: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    search: string;
    skipToContent: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    launchStudio: string;
    exploreTools: string;
    localBadge: string;
    noAccount: string;
    zeroUploads: string;
    checklistTitle: string;
    checklistDesc: string;
    studioTitle: string;
    studioDesc: string;
    openChecklist: string;
    openStudio: string;
  };
  studio: PageTranslation;
  checklist: PageTranslation;
  toolsDirectory: PageTranslation;
  /** Metadata for /tools/thumbnail (falls back to toolsDirectory when absent). */
  thumbnailCategory?: PageTranslation;
  guidesIndex: PageTranslation;
  about: PageTranslation;
  contact: PageTranslation;
  privacy: PageTranslation;
  terms: PageTranslation;
  tools: Record<string, ToolTranslation>;
}

export const translations: Record<Locale, I18nContent> = {
  en: {
    nav: {
      tools: 'Tools',
      studio: 'Publish Studio',
      checklist: 'Checklist',
      guides: 'Creator Guides',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      search: 'Search tools...',
      skipToContent: 'Skip to main content',
    },
    home: {
      badge: 'The pre-publish workspace for YouTube creators',
      title: 'Free YouTube Creator Tools',
      subtitle: 'Create Smarter, Publish Better',
      description: 'Prepare visuals, calibrate titles, stress-test hooks, and package every upload before releasing.',
      launchStudio: 'Launch Publish Studio',
      exploreTools: 'Explore Creator Tools',
      localBadge: '100% In-Browser Execution',
      noAccount: 'No account required',
      zeroUploads: 'Zero cloud uploads',
      checklistTitle: 'Pre-Publish Checklist',
      checklistDesc: 'Systematically verify thumbnail specs, title character truncation, and upload readiness.',
      studioTitle: 'Publish Studio',
      studioDesc: 'Bring your title, description, and image together in one local workspace.',
      openChecklist: 'Open the checklist',
      openStudio: 'Launch Studio',
    },
    studio: {
      title: 'Publish Studio — Prepare your next YouTube upload',
      description: 'Prepare your title, description, and image in one local workspace. Review publishing checks, save a text draft, and download a project package.',
      heading: 'Creovly Publish Studio',
      subheading: 'Your pre-publish command center for YouTube uploads',
    },
    checklist: {
      title: 'Pre-Publish Creator Checklist',
      description: 'Prepare your next YouTube upload with an interactive pre-publish checklist covering title, thumbnail, description, tags and settings. Progress is saved in your browser.',
      heading: 'Pre-Publish Creator Checklist',
      subheading: 'Systematic pre-flight verification for high-performing uploads',
    },
    toolsDirectory: {
      title: 'Creator Tools Directory',
      description: 'Find tools for thumbnails, title drafts, Shorts framing, revenue, RPM, watch hours, and creator income scenarios.',
      heading: 'Creator Pre-Publish Utilities',
      subheading: 'Zero sign-ups. Zero server uploads. Client-side tools for video creators.',
    },
    guidesIndex: {
      title: 'Creator Guides & Benchmarks — Creovly',
      description: 'Evidence-based guides, platform benchmarks, and technical workflows for YouTube creators.',
      heading: 'Creator Guides & Benchmarks',
      subheading: 'Technical references and platform limits verified for creators',
    },
    about: {
      title: 'About Creovly: Pre-Publish Tools for YouTubers',
      description: 'Learn about Creovly: an independent, privacy-first pre-publish command center offering 100% in-browser YouTube creator tools.',
      heading: 'About Creovly',
      subheading: 'Privacy-first pre-publish workspace engineered for YouTube creators.',
    },
    contact: {
      title: 'Contact Us — Creovly',
      description: 'Have feedback, a feature suggestion, or questions about Creovly? Reach out to our team.',
      heading: 'Get in Touch',
      subheading: 'Feedback, bug reports, and creator feature requests are always welcome.',
    },
    privacy: {
      title: 'Privacy Policy — Creovly',
      description: 'Creovly is engineered with a strict 100% local, client-side privacy architecture. Your files never touch a server.',
      heading: 'Privacy Policy',
      subheading: 'Complete transparency: 100% in-browser client-side execution.',
    },
    terms: {
      title: 'Terms of Service — Creovly',
      description: 'Review the terms of service, acceptable use guidelines, and creator intellectual property rights for Creovly.',
      heading: 'Terms of Service',
      subheading: 'Clear terms for using our client-side creator toolkit.',
    },
    tools: {
      'logo-background-remover': {
        title: 'Remove Background from Logo',
        seoTitle: 'Remove Background from Logo (Free PNG)',
        description: 'Remove the background from any logo for free. Upload your logo, select the background color, and download a transparent PNG with Creovly in your browser.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['remove background from logo', 'logo background remover', 'transparent png maker', 'logo cutout free', 'youtube channel logo tool'],
      },
      'youtube-thumbnail-compressor': {
        title: 'YouTube Thumbnail Compressor',
        seoTitle: 'YouTube Thumbnail Compressor: Get Under 2 MB',
        description: 'Thumbnail file too big? Compress your YouTube thumbnail under the 2 MB size limit in your browser, compare before and after, and download the smaller file.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail compressor', 'compress thumbnail under 2mb', 'reduce thumbnail file size', 'youtube image compressor', 'free thumbnail optimizer'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTube Thumbnail Resizer',
        seoTitle: 'Free YouTube Thumbnail Resizer: Resize to 1280x720',
        description: "Resize any image to a YouTube thumbnail size: 1280x720 or the recommended 3840x2160, both 16:9. Preview the framing and download it free in your browser.",
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail resizer', 'youtube thumbnail size converter', 'youtube thumbnail size', 'youtube thumbnail dimensions', 'youtube thumbnail aspect ratio', 'youtube banner resizer', '1280x720 thumbnail resize', 'youtube cover photo resizer', 'youtube image dimension tool'],
      },
      'youtube-banner-size': {
        title: 'YouTube Banner Size Checker & Resizer',
        seoTitle: 'YouTube Banner Size Checker, Resizer & Template',
        description: 'YouTube banner size checker and resizer: 2560x1440 px, 1546x423 px safe area, 6 MB max. Preview TV, desktop and mobile crops and get a free overlay template.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube banner size', 'youtube banner size for all devices', 'youtube banner size template', 'youtube banner size for mobile', 'youtube banner size converter'],
      },
      'youtube-shorts-safe-zone': {
        title: 'YouTube Shorts Safe Zone Checker',
        seoTitle: 'YouTube Shorts Safe Zone Checker & Template',
        description: 'Check YouTube Shorts safe zones before publishing. Preview guides, keep content clear of player buttons, and download the free transparent PNG template.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube shorts safe zone', 'youtube shorts safe zone template', 'shorts overlay checker', 'shorts safe area template', 'vertical video framing tool', 'shorts ui margins'],
      },
      'youtube-channel-name-generator': {
        title: 'YouTube Channel Name Generator',
        seoTitle: 'Free YouTube Channel Name Generator',
        description: 'Generate catchy YouTube channel names for gaming, vlogs, tech, and business. Free channel name generator that runs 100% in your browser.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube channel name generator', 'channel name ideas', 'youtube name maker', 'cool youtube names', 'gaming channel names', 'creative youtube channel name generator'],
      },
      'youtube-tag-generator': {
        title: 'YouTube Tag Generator',
        seoTitle: 'Free YouTube Tag Generator (SEO & Clusters)',
        description: 'Generate optimized YouTube tags and keyword clusters within the 500-character limit. Free rule-based tag generator with instant comma-separated copy.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube tag generator', 'youtube tags generator', 'youtube tags for views', 'generate tags for youtube', 'youtube seo tags', 'youtube tag extractor and generator'],
      },
      'youtube-description-generator': {
        title: 'YouTube Description Generator',
        seoTitle: 'Free YouTube Description Generator',
        description: 'Generate optimized YouTube video descriptions with timestamps, above-the-fold hooks, and social links. Free video description generator that runs in your browser.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube description generator', 'youtube video description generator', 'youtube description template', 'free youtube description generator', 'youtube description maker'],
      },
      'youtube-title-checker': {
        title: 'Title Checker & Analyzer for YouTube',
        seoTitle: 'Title Checker: Free YouTube Title Length, Hook & Truncation Analyzer',
        description: 'Free title checker and YouTube headline analyzer. Check title length, 50-character mobile truncation cutoff, keyword hooks, and CTR preview before you publish.',
        categoryLabel: 'Title Tools',
        keywords: ['title checker', 'free title checker', 'youtube title checker', 'youtube title analyzer', 'youtube title tester', 'youtube title length checker', 'headline analyzer', 'video title truncation analyzer', 'catchy youtube titles', 'youtube title character counter'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube Money & Revenue Calculator',
        seoTitle: 'YouTube Money Calculator & Revenue Calculator',
        description: 'YouTube money calculator and revenue calculator: estimate monthly and yearly earnings from your views and an RPM range, right in your browser.',
        categoryLabel: 'Money & Growth',
        keywords: ['youtube money calculator', 'youtube revenue calculator', 'youtube video money calculator', 'youtube views to money calculator', 'youtube ad revenue calculator', 'how much youtube pays', 'video view income estimator', 'creator revenue modeler'],
      },
      'youtube-rpm-calculator': {
        title: 'YouTube RPM Calculator',
        seoTitle: 'YouTube RPM Calculator: Earnings per 1,000 Views',
        description: 'Calculate YouTube RPM to find earnings per 1,000 views from your own revenue and views. Free, private, in-browser calculator for YouTube creators.',
        categoryLabel: 'Money & Growth',
        keywords: ['youtube rpm calculator', 'revenue per mille calculator', 'youtube cpm vs rpm', 'creator rpm calculation', 'youtube analytics metrics'],
      },
      'youtube-watch-hours-calculator': {
        title: 'YouTube Watch Hours Calculator',
        seoTitle: 'YouTube Watch Hours Calculator: 4,000-Hour Goal',
        description: 'Calculate YouTube watch hours and estimate views needed to reach the 4,000-hour Partner Program goal. Track remaining hours using average view duration.',
        categoryLabel: 'Money & Growth',
        keywords: ['youtube watch hours calculator', '4000 watch hours tracker', 'youtube monetization hours', 'watch time progress calculator', 'youtube partner program goal'],
      },
      'youtube-monetization-calculator': {
        title: 'YouTube Monetization Calculator',
        seoTitle: 'YouTube Monetization Calculator: Ads and Sponsors',
        description: 'Calculate YouTube channel earnings across all income streams (ads, sponsors, affiliates) minus expenses for true monthly creator earnings.',
        categoryLabel: 'Money & Growth',
        keywords: ['youtube monetization calculator', 'youtube income calculator', 'youtube channel income calculator', 'creator income calculator', 'sponsorship income modeler', 'youtube creator business calculator', 'net creator earnings'],
      },
      'youtube-link-generator': {
        title: 'YouTube Link Generator – Timestamp & Subscribe Links',
        seoTitle: 'YouTube Timestamp Link & Subscribe Link Generator',
        description: 'Make a YouTube timestamp link that starts at the exact second, or a subscribe link with ?sub_confirmation=1 and a QR code. Free, in your browser.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube timestamp link', 'youtube link with timestamp', 'youtube subscribe link', 'youtube subscribe link generator', 'youtube link at specific time', 'youtube embed start time'],
      },
      'youtube-profile-picture-resizer': {
        title: 'YouTube Profile Picture Size & Resizer (800 × 800)',
        seoTitle: 'YouTube Profile Picture Size 2026 – Free 800×800 Resizer',
        description: 'YouTube profile picture size: 800 × 800 px, 1:1, up to 4 MB, shown as a circle. Crop, preview the circle in light and dark mode, and export for free.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube profile picture size', 'youtube profile picture resizer', 'youtube channel icon size', 'youtube pfp size', 'youtube profile picture 800x800'],
      },
      'youtube-thumbnail-downloader': {
        title: 'YouTube Thumbnail Downloader – Max Resolution & HD',
        seoTitle: 'YouTube Thumbnail Downloader – Save HD & Max Res Images',
        description: 'Download any YouTube video thumbnail in max resolution (1280 × 720), SD, HQ and smaller sizes. Paste a video, Shorts or youtu.be link. Free, no sign-up.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'youtube thumbnail download hd', 'youtube thumbnail grabber', 'get youtube thumbnail', 'youtube shorts thumbnail download'],
      },
      'youtube-thumbnail-tester': {
        title: 'YouTube Thumbnail Tester & Preview',
        seoTitle: 'YouTube Thumbnail Tester – Preview Home, Search & Mobile',
        description: 'Preview your YouTube thumbnail in the home feed, search, suggested and mobile layouts, in light and dark mode. Compare two versions. Free, nothing is uploaded.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail tester', 'youtube thumbnail preview', 'thumbnail preview tool', 'youtube thumbnail checker', 'test youtube thumbnail', 'compare youtube thumbnails'],
      },
      'youtube-timestamp-generator': {
        title: 'YouTube Timestamp & Chapters Generator',
        seoTitle: 'YouTube Timestamp Generator – Make & Check Chapters',
        description: 'Make YouTube chapters from your notes: check the 0:00, 3-chapter and 10-second rules, see each chapter’s length and copy a clean timestamp list. Free, in your browser.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube timestamp generator', 'youtube chapter generator', 'youtube chapters', 'youtube timestamps in description', 'how to add chapters to youtube video', 'youtube chapters not showing'],
      },
      'words-to-minutes-calculator': {
        title: 'Words to Minutes Calculator – Script Length & Speaking Time',
        seoTitle: 'Words to Minutes Calculator – Script Length for Videos',
        description: 'Find out how long your script takes to read aloud. Paste text or enter a word count, pick a speaking pace, and see how many words a 5- or 10-minute video needs.',
        categoryLabel: 'Title Tools',
        keywords: ['words to minutes calculator', 'script length calculator', 'how many words per minute speaking', 'how many words for a 10 minute video', 'speech length calculator', 'script timer'],
      },
      'engagement-rate-calculator': {
        title: 'Engagement Rate Calculator for YouTube, Instagram & TikTok',
        seoTitle: 'Engagement Rate Calculator – YouTube, Instagram, TikTok',
        description: 'Free engagement rate calculator for YouTube, Instagram and TikTok. Calculate by views, followers or reach, see the formula, and average up to 20 posts.',
        categoryLabel: 'Money & Growth',
        keywords: ['engagement rate calculator', 'youtube engagement rate calculator', 'instagram engagement rate calculator', 'tiktok engagement rate calculator', 'engagement rate formula'],
      },
    },
  },
  es: {
    nav: {
      tools: 'Herramientas',
      studio: 'Estudio de publicación',
      checklist: 'Lista de verificación',
      guides: 'Guías de creadores',
      about: 'Acerca de',
      contact: 'Contacto',
      privacy: 'Privacidad',
      terms: 'Términos',
      search: 'Buscar herramientas...',
      skipToContent: 'Saltar al contenido principal',
    },
    home: {
      badge: 'El espacio de trabajo previo a publicar para creadores de YouTube',
      title: 'Herramientas gratuitas para creadores de YouTube',
      subtitle: 'Crea de forma inteligente. Publica mejor.',
      description: 'Prepara miniaturas, calibra títulos, prueba ganchos y empaqueta cada subida antes de publicar.',
      launchStudio: 'Abrir Publish Studio',
      exploreTools: 'Explorar herramientas',
      localBadge: 'Ejecución 100% en el navegador',
      noAccount: 'Sin registro ni cuenta',
      zeroUploads: 'Cero subidas a la nube',
      checklistTitle: 'Lista de verificación previa',
      checklistDesc: 'Verifica sistemáticamente especificaciones de miniaturas, títulos y preparación.',
      studioTitle: 'Estudio de publicación',
      studioDesc: 'Reúne título, descripción e imagen en un único entorno de trabajo local.',
      openChecklist: 'Abrir lista de verificación',
      openStudio: 'Abrir Studio',
    },
    studio: {
      title: 'Estudio de publicación para YouTube',
      description: 'Prepara título, descripción e imagen en un único entorno local. Revisa comprobaciones, guarda borradores y descarga tu proyecto.',
      heading: 'Estudio de publicación Creovly',
      subheading: 'Centro de control previo a la publicación para creadores de YouTube',
    },
    checklist: {
      title: 'Lista de verificación para creadores de YouTube',
      description: 'Prepara tu próxima subida con una lista de control interactiva que guarda tu progreso localmente.',
      heading: 'Lista de verificación previa a la publicación',
      subheading: 'Verificación paso a paso para publicaciones de alto rendimiento',
    },
    toolsDirectory: {
      title: 'Directorio de herramientas para creadores',
      description: 'Encuentra herramientas para miniaturas, títulos, encuadre de Shorts, ingresos, RPM y horas de reproducción.',
      heading: 'Utilidades previas a la publicación',
      subheading: 'Herramientas locales para inspeccionar miniaturas, optimizar títulos y modelar ingresos.',
    },
    thumbnailCategory: {
      title: 'Herramientas de miniaturas para YouTube',
      description: 'Prepara tus miniaturas de YouTube con redimensionado y compresión locales, más guías de encuadre para Shorts.',
    },
    guidesIndex: {
      title: 'Guías y referencias para creadores — Creovly',
      description: 'Guías técnicas, límites de plataforma y flujos de trabajo verificados para creadores de YouTube.',
      heading: 'Guías y métricas para creadores',
      subheading: 'Referencias técnicas y especificaciones oficiales verificadas',
    },
    about: {
      title: 'Acerca de Creovly: herramientas para YouTube',
      description: 'Conoce Creovly: espacio de trabajo independiente y privado que ofrece utilidades 100% locales en tu navegador.',
      heading: 'Acerca de Creovly',
      subheading: 'Espacio de trabajo privado diseñado para creadores de YouTube.',
    },
    contact: {
      title: 'Contacto — Creovly',
      description: '¿Tienes comentarios, sugerencias de funciones o preguntas? Contáctanos.',
      heading: 'Ponte en contacto',
      subheading: 'Comentarios, sugerencias y consultas de la comunidad de creadores.',
    },
    privacy: {
      title: 'Política de privacidad — Creovly',
      description: 'Arquitectura 100% del lado del cliente. Tus archivos e imágenes nunca se envían a ningún servidor.',
      heading: 'Política de privacidad',
      subheading: 'Transparencia total: procesamiento seguro en tu propio navegador.',
    },
    terms: {
      title: 'Términos de servicio — Creovly',
      description: 'Consulta los términos de servicio de Creovly: condiciones de uso aceptable y derechos de propiedad intelectual sobre el contenido de los creadores.',
      heading: 'Términos de servicio',
      subheading: 'Condiciones de uso claras para nuestro kit de herramientas.',
    },
    tools: {
      'logo-background-remover': {
        title: 'Quitar fondo de logo',
        seoTitle: 'Quitar fondo de logo (PNG gratis)',
        description: 'Quita el fondo de cualquier logo gratis. Selecciona el color de fondo, previsualiza el recorte y descarga un PNG transparente directo en tu navegador.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['quitar fondo de logo', 'eliminar fondo logo gratis', 'hacer logo transparente', 'fondo transparente png', 'logo canal youtube'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compresor de miniaturas de YouTube',
        seoTitle: 'Compresor de miniaturas de YouTube: menos de 2 MB',
        description: '¿Tu miniatura pesa demasiado? Comprime tu miniatura de YouTube por debajo del límite de 2 MB en tu navegador, compara el antes y el después y descarga el archivo.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['compresor miniaturas youtube', 'comprimir miniatura menos 2mb', 'reducir tamano imagen youtube', 'optimizar imagen youtube', 'compresor png youtube'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionador de miniaturas de YouTube',
        seoTitle: 'Redimensionador de miniaturas de YouTube: 1280x720',
        description: "Redimensiona cualquier imagen a un tamaño de miniatura de YouTube: 1280x720 o el recomendado 3840x2160, ambos 16:9. Revisa el encuadre y descárgala gratis en tu navegador.",
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['redimensionar miniatura youtube', 'convertidor tamano miniatura youtube', 'medidas miniatura youtube 1280x720', 'tamano portada youtube', 'escalar imagen youtube', 'banner youtube medidas'],
      },
      'youtube-banner-size': {
        title: 'Verificador y redimensionador de banner de YouTube',
        seoTitle: 'Tamaño banner YouTube: Redimensionar y plantilla',
        description: 'Tamaño de banner de YouTube: 2560x1440 px, zona segura de 1546x423 px, máx. 6 MB. Revisa el recorte en TV, PC y móvil, redimensiona tu imagen y descarga la plantilla.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['tamano banner youtube', 'medidas banner youtube todos los dispositivos', 'plantilla banner youtube', 'banner youtube movil safe zone', 'convertidor tamano banner youtube'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Verificador de zona segura de YouTube Shorts',
        seoTitle: 'Zona segura de YouTube Shorts y plantilla PNG',
        description: 'Comprueba las zonas seguras de YouTube Shorts antes de publicar. Evita que los botones tapen tu contenido y descarga la plantilla PNG transparente gratis.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['zona segura youtube shorts', 'plantilla shorts youtube', 'margen seguro video vertical', 'shorts safe zone', 'guia encuadre shorts'],
      },
      'youtube-channel-name-generator': {
        title: 'Generador de nombres para canales de YouTube',
        seoTitle: 'Generador de nombres para canal de YouTube',
        description: 'Genera ideas creativas de nombres para tu canal de YouTube en gaming, vlogs y tecnología. Generador gratuito e instantáneo en tu navegador.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['generador de nombres para canales de youtube', 'ideas de nombres para youtube', 'nombres para canales de gaming', 'creador de nombres youtube gratis'],
      },
      'youtube-tag-generator': {
        title: 'Generador de Etiquetas de YouTube',
        seoTitle: 'Generador de Etiquetas para YouTube',
        description: 'Genera etiquetas optimizadas para YouTube y grupos de palabras clave dentro del límite de 500 caracteres. Herramienta SEO gratuita y privada.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['generador de etiquetas de youtube', 'generador de tags youtube', 'etiquetas para youtube', 'tags para videos de youtube', 'generar etiquetas youtube seo'],
      },
      'youtube-description-generator': {
        title: 'Generador de Descripciones de YouTube',
        seoTitle: 'Generador de Descripciones para YouTube',
        description: 'Genera descripciones optimizadas para videos de YouTube con marcas de tiempo, llamadas a la acción y enlaces. Herramienta SEO gratuita y en el navegador.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['generador de descripciones de youtube', 'plantilla descripcion youtube', 'generador de descripciones para videos de youtube', 'crear descripcion youtube'],
      },
      'youtube-title-checker': {
        title: 'Comprobador y analizador de títulos de YouTube',
        seoTitle: 'Comprobador de títulos: Verificador de longitud y CTR',
        description: 'Comprobador de títulos y analizador de vídeos de YouTube gratis. Revisa longitud, 50 caracteres para móviles, palabras clave y CTR antes de publicar.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['comprobador de titulos', 'title checker', 'verificador de titulos', 'analizador titulos youtube', 'longitud titulo youtube', 'comprobar titulo video', 'titulos llamativos youtube', 'contador caracteres youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculadora de dinero e ingresos de YouTube',
        seoTitle: 'Calculadora de dinero e ingresos de YouTube',
        description: 'Calculadora de dinero e ingresos de YouTube: estima ganancias mensuales y anuales con tus visitas y un rango de RPM, directo en tu navegador.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora dinero youtube', 'calculadora ingresos youtube', 'cuanto paga youtube por visitas', 'ganancias youtube estimador', 'simulador ingresos canal'],
      },
      'youtube-rpm-calculator': {
        title: 'Calculadora de RPM de YouTube',
        seoTitle: 'Calculadora de RPM de YouTube: Ganancias por 1.000',
        description: 'Calcula el RPM de YouTube para conocer las ganancias por cada 1.000 visitas a partir de los ingresos y visitas de tu propio canal. Herramienta gratuita.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora rpm youtube', 'calcular rpm youtube', 'diferencia rpm y cpm', 'ingresos por mil visitas', 'metricas analytics youtube'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calculadora de horas de reproducción de YouTube',
        seoTitle: 'Calculadora de horas de YouTube: Meta 4.000 horas',
        description: 'Calcula tus horas de reproducción en YouTube y las visitas que necesitas para alcanzar la meta de 4.000 horas del Programa de Socios.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora horas reproduccion youtube', '4000 horas youtube', 'conseguir 4000 horas de visualizacion', 'monetizar canal youtube', 'tiempo de reproduccion meta'],
      },
      'youtube-monetization-calculator': {
        title: 'Calculadora de monetización integral de YouTube',
        seoTitle: 'Calculadora de monetización YouTube: Ganancias',
        description: 'Calcula ingresos de YouTube en todas las fuentes (anuncios, patrocinios, afiliados) menos costes para conocer tu ganancia neta mensual.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora monetizacion youtube', 'modelo de negocio creador', 'patrocinios youtube calcular', 'ingresos netos creador contenido', 'negocio canal youtube'],
      },
      'youtube-link-generator': {
        title: 'Generador de links de YouTube con minuto exacto y suscripción',
        seoTitle: 'Link de YouTube con minuto exacto y enlace de suscripción',
        description: 'Crea un link de YouTube que empiece en el segundo exacto (t=) o un enlace de suscripción con ?sub_confirmation=1 y código QR. Gratis, en tu navegador.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['link de youtube con minuto', 'link de youtube con tiempo', 'enlace de youtube en un minuto específico', 'enlace de suscripción youtube', 'generador de link de suscripción youtube'],
      },
      'youtube-profile-picture-resizer': {
        title: 'Tamaño de foto de perfil de YouTube (800 × 800) y redimensionador',
        seoTitle: 'Tamaño de foto de perfil de YouTube 2026: 800×800 gratis',
        description: 'Tamaño de la foto de perfil de YouTube: 800 × 800 px, 1:1, hasta 4 MB, mostrada en círculo. Recorta, previsualiza en modo claro y oscuro y exporta gratis.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['tamaño foto de perfil youtube', 'tamaño icono youtube', 'foto de perfil youtube 800x800', 'redimensionar foto de perfil youtube', 'medidas foto de perfil youtube'],
      },
      'youtube-thumbnail-downloader': {
        title: 'Descargar miniatura de YouTube en HD y máxima resolución',
        seoTitle: 'Descargar miniatura de YouTube – HD y máxima resolución',
        description: 'Descarga la miniatura de cualquier vídeo de YouTube en máxima resolución (1280 × 720), SD, HQ y tamaños menores. Pega un enlace de vídeo, Shorts o youtu.be. Gratis.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['descargar miniatura de youtube', 'descargar miniaturas de youtube', 'miniatura youtube hd', 'descargar portada de video youtube', 'descargar thumbnail youtube'],
      },
      'youtube-thumbnail-tester': {
        title: 'Probador y vista previa de miniaturas de YouTube',
        seoTitle: 'Vista previa de miniaturas de YouTube – Inicio y móvil',
        description: 'Previsualiza tu miniatura de YouTube en el inicio, la búsqueda, los sugeridos y el móvil, en modo claro y oscuro. Compara dos versiones. Gratis y sin subir nada.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['vista previa miniatura youtube', 'probar miniatura youtube', 'probador de miniaturas', 'comparar miniaturas youtube', 'cómo se ve mi miniatura en youtube'],
      },
      'youtube-timestamp-generator': {
        title: 'Generador de capítulos y marcas de tiempo para YouTube',
        seoTitle: 'Capítulos de YouTube – Generador de marcas de tiempo',
        description: 'Crea capítulos de YouTube a partir de tus notas: comprueba las reglas de 0:00, 3 capítulos y 10 segundos, ve la duración de cada uno y copia una lista limpia. Gratis.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['capítulos youtube', 'marcas de tiempo youtube', 'cómo poner capítulos en youtube', 'generador de capítulos youtube', 'capítulos de youtube no aparecen'],
      },
      'words-to-minutes-calculator': {
        title: 'Calculadora de palabras a minutos para guiones',
        seoTitle: 'Palabras a minutos – Calculadora de duración de guion',
        description: 'Calcula cuánto dura tu guion leído en voz alta. Pega el texto o escribe las palabras, elige un ritmo y descubre cuántas palabras necesita un vídeo de 5 o 10 minutos.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['palabras a minutos', 'calcular duración de un texto', 'cuántas palabras por minuto se hablan', 'duración de un guion', 'calculadora de tiempo de lectura'],
      },
      'engagement-rate-calculator': {
        title: 'Calculadora de engagement para YouTube, Instagram y TikTok',
        seoTitle: 'Calculadora de engagement – YouTube, Instagram y TikTok',
        description: 'Calculadora de engagement gratis para YouTube, Instagram y TikTok. Calcula la tasa por visualizaciones, seguidores o alcance y la media de hasta 20 publicaciones.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora engagement', 'calculadora de engagement instagram', 'tasa de engagement youtube', 'cómo calcular el engagement', 'calculadora tasa de interacción'],
      },
    },
  },
  ja: {
    nav: {
      tools: 'ツール一覧',
      studio: '公開スタジオ',
      checklist: 'チェックリスト',
      guides: 'ガイド',
      about: 'Creovlyについて',
      contact: 'お問い合わせ',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      search: 'ツールを検索...',
      skipToContent: 'メインコンテンツへスキップ',
    },
    home: {
      badge: 'YouTubeクリエイター向け公開前ワークスペース',
      title: '無料のYouTubeクリエイターツール',
      subtitle: 'よりスマートに制作し、より良く公開する',
      description: '無料のYouTubeクリエイターツール。サムネイルの圧縮・リサイズ、タイトルの長さチェック、Shortsセーフゾーン確認、収益シミュレーションをすべてブラウザ内で実行できます。',
      launchStudio: 'Publish Studioを開く',
      exploreTools: '全ツールを見る',
      localBadge: '100%ブラウザローカル処理',
      noAccount: 'アカウント登録不要',
      zeroUploads: 'クラウドへのアップロードなし',
      checklistTitle: '公開前チェックリスト',
      checklistDesc: 'サムネイル規格、タイトルの途切れ、音声ライセンスを体系的に確認。',
      studioTitle: '公開スタジオ',
      studioDesc: 'タイトル、説明文、サムネイルを1つのワークスペースで統合準備。',
      openChecklist: 'チェックリストを開く',
      openStudio: 'Studioを開く',
    },
    studio: {
      title: '公開スタジオ — YouTube動画の公開前チェック＆準備',
      description: 'タイトル・説明文・サムネイルを1つのローカル環境でまとめてチェック。公開前の確認項目を見直し、テキスト下書きを保存して、プロジェクト一式をダウンロードできます。',
      heading: 'Creovly 公開スタジオ',
      subheading: 'YouTubeクリエイターのための公開前コマンドセンター',
    },
    checklist: {
      title: 'YouTube公開前チェックリスト',
      description: '次のYouTube動画を公開する前に、タイトル・サムネイル・説明文などをインタラクティブなチェックリストで確認。進捗はブラウザに自動保存されます。',
      heading: '公開前クリエイターチェックリスト',
      subheading: '再生回数とクリック率を最大化するための事前検証',
    },
    toolsDirectory: {
      title: 'クリエイターツール一覧ディレクトリ',
      description: 'YouTubeクリエイター向けツール一覧。サムネイルの圧縮・リサイズ、タイトル検証、Shortsフレーミング、収益・RPM・総再生時間の計算ツールを無料で使えます。',
      heading: '公開前クリエイターユーティリティ',
      subheading: 'サインアップ不要。サーバー送信なし。完全クライアントサイド実行ツール。',
    },
    thumbnailCategory: {
      title: 'YouTubeサムネイルツール',
      description: 'ブラウザ内でのリサイズ・圧縮とShortsのフレーミングガイドで、YouTubeサムネイルを公開前に準備。1280×720への調整やファイルサイズの最適化も無料で行えます。',
    },
    guidesIndex: {
      title: 'クリエイターガイド＆プラットフォーム基準 — Creovly',
      description: 'YouTube公式仕様に基づく技術ガイドとサムネイル・収益化ベンチマーク。',
      heading: 'クリエイターガイド＆公式仕様基準',
      subheading: 'クリエイター向けに検証された技術リファレンス',
    },
    about: {
      title: 'Creovlyについて — YouTube公開前ワークスペース',
      description: 'Creovlyは完全ブラウザ実行・プライバシー重視のYouTube制作サポートツールです。',
      heading: 'Creovlyについて',
      subheading: 'プライバシー最優先で設計されたクリエイター専用ツール。',
    },
    contact: {
      title: 'お問い合わせ — Creovly',
      description: 'Creovlyに関するご意見、機能リクエスト、ご質問はお気軽にご連絡ください。',
      heading: 'お問い合わせ',
      subheading: 'フィードバックや新機能のリクエストをお待ちしております。',
    },
    privacy: {
      title: 'プライバシーポリシー — Creovly',
      description: '画像や入力データはサーバーに一切送信されず、すべてブラウザ内で処理されます。',
      heading: 'プライバシーポリシー',
      subheading: '完全な透明性：100%クライアントサイド処理の安心設計。',
    },
    terms: {
      title: '利用規約 — Creovly',
      description: 'Creovlyの利用規約および知的財産権の取り扱いについて。',
      heading: '利用規約',
      subheading: '安心してツールをご利用いただくための利用条件。',
    },
    tools: {
      'logo-background-remover': {
        title: 'ロゴの背景を削除',
        seoTitle: 'ロゴの背景を削除 (無料透過PNG作成)',
        description: 'ロゴの背景を完全無料で透明化。画像をアップロードして色を選択し、プレビュー確認後に透過PNGをブラウザ上でダウンロード。',
        categoryLabel: 'サムネイルツール',
        keywords: ['ロゴ 背景 透過', 'ロゴ 背景 切り抜き 無料', '透過PNG 作成', 'YouTube チャンネル アイコン 透過', '画像 背景 削除'],
      },
      'youtube-thumbnail-compressor': {
        title: 'YouTubeサムネイル圧縮ツール',
        seoTitle: 'YouTubeサムネイル圧縮：2MB未満にする',
        description: 'サムネイルの容量が大きすぎる？ブラウザ上でYouTubeサムネイルを2MBの上限以下に圧縮し、前後を比較して小さくなったファイルをダウンロード。',
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube サムネイル 圧縮', 'サムネ 容量 減らす 2MB以下', 'サムネイル 画質 落とさず 圧縮', 'YouTube 画像 圧縮 無料', 'サムネイル PNG 圧縮'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTubeサムネイルサイズ変更ツール',
        seoTitle: 'YouTubeサムネイルリサイズツール：1280x720に無料変換',
        description: "画像をYouTubeサムネイルのサイズにリサイズ：1280x720または推奨の3840x2160（どちらも16:9）。構図を確認して、ブラウザ上で無料ダウンロード。",
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube サムネイル サイズ 変更', 'YouTube サムネイル サイズ 変換', 'サムネイル 1280 720 リサイズ', 'YouTube バナー サイズ 調整', 'サムネ 比率 16:9', 'チャンネルアート リサイズ'],
      },
      'youtube-banner-size': {
        title: 'YouTubeバナーサイズ確認・リサイズツール',
        seoTitle: 'YouTubeバナーサイズ: 2560x1440リサイズ＆テンプレート',
        description: 'YouTubeバナーのサイズ：2560x1440px、セーフエリア1546x423px、最大6MB。TV・PC・モバイルの表示を確認し、画像をリサイズして無料テンプレートも入手。',
        categoryLabel: 'サムネイルツール',
        keywords: ['youtube バナー サイズ', 'youtube チャンネルアート サイズ', 'youtube ヘッダー サイズ', 'youtube バナー テンプレート', 'youtube バナー セーフゾーン'],
      },
      'youtube-shorts-safe-zone': {
        title: 'YouTube Shortsセーフゾーンチェッカー',
        seoTitle: 'YouTubeショート セーフゾーン確認＆PNGテンプレート',
        description: '公開前にYouTube Shortsのセーフゾーンを確認。配置ガイドをプレビューし、UIの被りを防いで重要コンテンツを守る無料透過PNGテンプレートをダウンロード。',
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube ショート セーフゾーン', 'Shorts UI 被り 確認', 'ショート動画 テロップ 安全領域', '縦型動画 セーフエリア', 'Shorts レイアウト ガイド'],
      },
      'youtube-channel-name-generator': {
        title: 'YouTubeチャンネル名ジェネレーター',
        seoTitle: 'YouTubeチャンネル名ジェネレーター: 無料作成',
        description: 'ゲーム、Vlog、ビジネス向けのYouTubeチャンネル名を即座に自動生成。ログイン不要、完全無料で使えるチャンネル名作成ツール。',
        categoryLabel: 'タイトルツール',
        keywords: ['youtubeチャンネル名ジェネレーター', 'youtubeチャンネル名決め方', 'チャンネル名おすすめ', 'youtube名前自動生成'],
      },
      'youtube-tag-generator': {
        title: 'YouTubeタグジェネレーター',
        seoTitle: 'YouTubeタグ生成ツール（無料SEO）',
        description: 'YouTube動画のSEOに最適なタグを自動生成。500文字制限に準拠し、主要キーワードや類語クラスターを一括カンマ区切りコピー。完全ブラウザ完結。',
        categoryLabel: 'タイトル・SEOツール',
        keywords: ['YouTube タグ 生成', 'youtube タグ ジェネレーター', 'youtube タグ 自動 生成', 'youtube seo タグ', 'youtube タグ おすすめ'],
      },
      'youtube-description-generator': {
        title: 'YouTube概要欄ジェネレーター',
        seoTitle: 'YouTube概要欄作成ツール（無料SEO）',
        description: 'YouTube動画の概要欄を自動生成。検索上位を狙うフック文、目次タイムスタンプ、SNSリンクを簡単に構成できる無料AIテンプレートツール。',
        categoryLabel: 'タイトル・SEOツール',
        keywords: ['YouTube 概要欄 自動生成', 'youtube 説明欄 ジェネレーター', 'youtube 概要欄 テンプレート', 'youtube 概要欄 作り方', 'youtube タイムスタンプ 概要欄'],
      },
      'youtube-title-checker': {
        title: 'タイトルチェッカー＆YouTubeアナライザー',
        seoTitle: 'タイトルチェッカー: YouTube動画タイトル文字数と省略確認',
        description: '無料のタイトルチェッカー＆YouTube分析ツール。動画を公開する前に、文字数、スマホでの50文字省略ライン、キーワード配置、クリック率を的確に分析できます。',
        categoryLabel: 'タイトルツール',
        keywords: ['タイトルチェッカー', 'title checker', 'YouTube タイトル 文字数 チェッカー', '動画 タイトル 切り捨て 確認', 'YouTube タイトル 付け方', 'クリック率 上がる タイトル', 'タイトル プレビュー'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube収益計算ツール',
        seoTitle: 'YouTube収益計算・お金計算ツール',
        description: 'YouTubeの収益計算・お金計算ツール：再生回数とRPMの範囲から月間・年間の収益をブラウザ上で見積もれます。',
        categoryLabel: '収益と成長',
        keywords: ['YouTube 収益 計算', '再生回数 収益 計算 ツール', 'YouTube 月収 シミュレーション', 'YouTube いくら 稼げる', '動画 広告 収入 計算'],
      },
      'youtube-rpm-calculator': {
        title: 'YouTube RPM計算ツール',
        seoTitle: 'YouTube RPM計算ツール: 1,000回再生あたりの収益',
        description: 'YouTubeのRPM（1,000回再生あたりの純収益）を自分の総収益と再生回数から正確に計算。チャンネル分析に最適な無料ツール。',
        categoryLabel: '収益と成長',
        keywords: ['YouTube RPM 計算', 'RPM CPM 違い YouTube', '千回再生 収益 計算', 'YouTube アナリティクス 指標', '広告単価 計算'],
      },
      'youtube-watch-hours-calculator': {
        title: 'YouTube総再生時間計算ツール',
        seoTitle: 'YouTube総再生時間計算ツール: 4,000時間達成予測',
        description: 'YouTubeの総再生時間を計算し、パートナープログラムの4,000時間目標達成に必要な再生回数を試算。平均視聴時間から進捗を把握。',
        categoryLabel: '収益と成長',
        keywords: ['YouTube 再生時間 4000時間 計算', '収益化 条件 達成 シミュレーター', '総再生時間 あと何回', 'YouTube パートナープログラム', '再生時間 増やす 目標'],
      },
      'youtube-monetization-calculator': {
        title: 'YouTube総合収益化シミュレーター',
        seoTitle: 'YouTube総合収益化計算ツール: 広告・企業案件・経費',
        description: '広告収入、企業案件、アフィリエイトなどの全収入から制作経費を差し引いて、純利益を正確にシミュレーションできる無料ツール。',
        categoryLabel: '収益と成長',
        keywords: ['YouTube 収益化 計算機', '案件 収入 計算', 'クリエイター 純利益 計算', 'YouTube ビジネス モデル', 'メンバーシップ 収益 シミュレーション'],
      },
      'youtube-link-generator': {
        title: 'YouTube 時間指定リンク作成ツール｜タイムスタンプ＆チャンネル登録リンク',
        seoTitle: 'YouTube 時間指定リンク作成・チャンネル登録リンク生成',
        description: 'YouTubeの時間指定リンク（t=）を秒単位で作成。チャンネル登録の確認付きリンク（?sub_confirmation=1）とQRコードも無料で作れます。処理はブラウザ内で完結。',
        categoryLabel: 'タイトル・SEOツール',
        keywords: ['youtube 時間指定 リンク', 'youtube タイムスタンプ リンク', 'youtube 途中から 共有', 'youtube チャンネル登録 リンク', 'youtube 登録リンク 作成'],
      },
      'youtube-profile-picture-resizer': {
        title: 'YouTube アイコンサイズ（800×800）と無料リサイズツール',
        seoTitle: 'YouTube アイコン サイズ 2026｜800×800 無料リサイズ',
        description: 'YouTubeアイコンのサイズは800×800px（1:1）、4MBまで、表示は円形。トリミングしてライト・ダークモードの円形プレビューを確認し、無料で書き出せます。',
        categoryLabel: 'サムネイルツール',
        keywords: ['youtube アイコン サイズ', 'youtube アイコン 作成', 'youtube プロフィール画像 サイズ', 'youtube アイコン 800x800', 'youtube アイコン 丸 切り抜き'],
      },
      'youtube-thumbnail-downloader': {
        title: 'YouTube サムネイル ダウンロード（最大解像度・HD）',
        seoTitle: 'YouTube サムネイル ダウンロード – HD・最大解像度で保存',
        description: 'YouTube動画のサムネイルを最大解像度（1280 × 720）、SD、HQなど各サイズで無料ダウンロード。動画・ショート・youtu.beのリンクを貼るだけ。登録不要です。',
        categoryLabel: 'サムネイルツール',
        keywords: ['youtube サムネイル ダウンロード', 'youtube サムネイル 保存', 'サムネイル 取得', 'youtube サムネ 保存', 'youtube サムネイル 高画質'],
      },
      'youtube-thumbnail-tester': {
        title: 'YouTube サムネイル テスター＆プレビュー',
        seoTitle: 'YouTube サムネイル プレビュー – ホーム・検索・スマホで確認',
        description: 'YouTubeのホーム、検索、関連動画、モバイルでのサムネイルの見え方をライト・ダークで確認。2つの案を比較できます。無料で、画像はアップロードされません。',
        categoryLabel: 'サムネイルツール',
        keywords: ['youtube サムネイル プレビュー', 'サムネイル 確認', 'youtube サムネイル テスト', 'サムネイル 比較', 'サムネ 見え方'],
      },
      'youtube-timestamp-generator': {
        title: 'YouTube タイムスタンプ・チャプター作成ツール',
        seoTitle: 'YouTube タイムスタンプ作成 – チャプターの付け方を自動チェック',
        description: 'メモからYouTubeのチャプターを作成。0:00・3つ以上・10秒以上のルールをチェックし、各チャプターの長さを表示して、概要欄に貼れる一覧をコピーできます。無料です。',
        categoryLabel: 'タイトル・SEOツール',
        keywords: ['youtube タイムスタンプ', 'youtube チャプター', 'youtube チャプター 付け方', 'タイムスタンプ 作成', 'youtube チャプター 表示されない'],
      },
      'words-to-minutes-calculator': {
        title: '原稿の文字数・時間計算ツール（読み上げ時間）',
        seoTitle: '原稿 文字数 時間計算 – 何文字で何分？読み上げ時間',
        description: '原稿を読み上げると何分かかるかを計算。原稿を貼るか文字数を入力し、話す速さを選ぶと、5分・10分の動画に必要な文字数もわかります。',
        categoryLabel: 'タイトル・SEOツール',
        keywords: ['原稿 文字数 時間', '文字数 秒数', '原稿 何文字 何分', '読み上げ時間 計算', 'ナレーション 文字数'],
      },
      'engagement-rate-calculator': {
        title: 'エンゲージメント率計算ツール（YouTube・Instagram・TikTok）',
        seoTitle: 'エンゲージメント率 計算ツール｜YouTube・Instagram・TikTok',
        description: 'YouTube・Instagram・TikTokのエンゲージメント率を無料で計算。再生数・フォロワー・リーチで割る計算式を表示し、最大20投稿の平均も出せます。',
        categoryLabel: '収益と成長',
        keywords: ['エンゲージメント率 計算', 'エンゲージメント率 計算ツール', 'インスタ エンゲージメント率', 'youtube エンゲージメント率', 'tiktok エンゲージメント率'],
      },
    },
  },
  fr: {
    nav: {
      tools: 'Outils',
      studio: 'Studio de publication',
      checklist: 'Check-list',
      guides: 'Guides créateurs',
      about: 'À propos',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      search: 'Rechercher un outil...',
      skipToContent: 'Aller au contenu principal',
    },
    home: {
      badge: 'L’espace de pré-publication pour les créateurs YouTube',
      title: 'Outils gratuits pour créateurs YouTube',
      subtitle: 'Créez plus intelligemment. Publiez mieux.',
      description: 'Compressez vos miniatures, calibrez vos titres, vérifiez les zones sûres Shorts et simulez vos revenus dans votre navigateur.',
      launchStudio: 'Lancer Publish Studio',
      exploreTools: 'Découvrir les outils',
      localBadge: 'Exécution 100% dans le navigateur',
      noAccount: 'Aucun compte requis',
      zeroUploads: 'Zéro envoi sur le cloud',
      checklistTitle: 'Check-list avant publication',
      checklistDesc: 'Vérifiez méthodiquement la résolution, les coupures de titre et les autorisations audio.',
      studioTitle: 'Studio de publication',
      studioDesc: 'Rassemblez votre titre, description et miniature dans un espace de travail local unifié.',
      openChecklist: 'Ouvrir la check-list',
      openStudio: 'Lancer Studio',
    },
    studio: {
      title: 'Studio de publication pour YouTube',
      description: 'Préparez votre titre, description et image dans un espace local. Vérifiez les critères et téléchargez votre dossier de projet.',
      heading: 'Studio de publication Creovly',
      subheading: 'Centre de contrôle de pré-publication pour créateurs YouTube',
    },
    checklist: {
      title: 'Check-list de pré-publication pour créateurs',
      description: 'Préparez votre prochaine publication YouTube avec une check-list interactive qui sauvegarde votre progression.',
      heading: 'Check-list avant mise en ligne',
      subheading: 'Vérification complète pour maximiser vos performances vidéo',
    },
    toolsDirectory: {
      title: 'Répertoire des outils créateurs',
      description: 'Outils pour miniatures, titres, cadrage Shorts, revenus, RPM et heures de visionnage.',
      heading: 'Utilitaires créateurs locaux',
      subheading: 'Sans inscription. Zéro transfert de fichiers. Traitement local et sécurisé.',
    },
    thumbnailCategory: {
      title: 'Outils de miniatures YouTube',
      description: 'Préparez vos miniatures YouTube avec redimensionnement et compression locaux, plus des repères de cadrage pour les Shorts.',
    },
    guidesIndex: {
      title: 'Guides créateurs et repères de plateforme — Creovly',
      description: 'Guides techniques, limites officielles et bonnes pratiques vérifiées pour créateurs YouTube.',
      heading: 'Guides et spécifications officielles',
      subheading: 'Références techniques rigoureuses pour créateurs',
    },
    about: {
      title: 'À propos de Creovly — Espace créateur YouTube',
      description: 'Découvrez Creovly : boîte à outils indépendante, privée et 100% exécutée dans votre navigateur web.',
      heading: 'À propos de Creovly',
      subheading: 'Conçu avec une exigence stricte de confidentialité pour les créateurs.',
    },
    contact: {
      title: 'Contact — Creovly',
      description: 'Une suggestion, une remarque ou une question sur Creovly ? Contactez notre équipe.',
      heading: 'Contactez-nous',
      subheading: 'Retours, demandes de fonctionnalités et échanges bienvenus.',
    },
    privacy: {
      title: 'Politique de confidentialité — Creovly',
      description: 'Traitement 100% côté client. Vos fichiers et visuels ne quittent jamais votre navigateur.',
      heading: 'Politique de confidentialité',
      subheading: 'Transparence absolue : zéro serveur, zéro télémétrie abusive.',
    },
    terms: {
      title: 'Conditions d’utilisation — Creovly',
      description: 'Conditions générales d’utilisation et respect de la propriété intellectuelle.',
      heading: 'Conditions d’utilisation',
      subheading: 'Des règles claires pour utiliser nos utilitaires en toute confiance.',
    },
    tools: {
      'logo-background-remover': {
        title: 'Supprimer l\'arrière-plan d\'un logo',
        seoTitle: 'Supprimer l\'arrière-plan d\'un logo (PNG gratuit)',
        description: 'Supprimez le fond de tout logo gratuitement. Choisissez la couleur et téléchargez immédiatement un PNG transparent dans votre navigateur.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['supprimer arriere plan logo', 'enlever fond logo gratuit', 'logo transparent png', 'detourer logo youtube', 'fond transparent logo'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compresseur de miniatures YouTube',
        seoTitle: 'Compresseur de miniatures YouTube : moins de 2 Mo',
        description: 'Miniature trop lourde ? Compressez votre miniature YouTube sous la limite de 2 Mo dans votre navigateur, comparez avant et après, puis téléchargez le fichier allégé.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['compresseur miniature youtube', 'reduire taille miniature youtube 2mo', 'compresser image youtube', 'optimiser miniature youtube', 'compresseur png gratuit'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionneur de miniatures YouTube',
        seoTitle: 'Redimensionneur de miniatures YouTube : 1280x720',
        description: "Redimensionnez n’importe quelle image à une taille de miniature YouTube : 1280x720 ou 3840x2160 recommandé, tous deux en 16:9. Vérifiez le cadrage et téléchargez gratuitement dans votre navigateur.",
        categoryLabel: 'Outils de miniatures',
        keywords: ['redimensionner miniature youtube', 'convertisseur taille miniature youtube', 'taille miniature youtube 1280x720', 'dimensions banniere youtube', 'format image youtube', 'redimensionner photo profil'],
      },
      'youtube-banner-size': {
        title: 'Vérificateur et redimensionneur de bannière YouTube',
        seoTitle: 'Taille bannière YouTube: 2560x1440 et template',
        description: 'Taille de bannière YouTube : 2560x1440 px, zone de sécurité 1546x423 px, 6 Mo max. Vérifiez le rendu TV, ordinateur et mobile, redimensionnez votre image et obtenez le modèle gratuit.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['taille banniere youtube', 'dimension banniere youtube tous appareils', 'template banniere youtube png', 'safe zone banniere youtube mobile', 'convertisseur taille banniere youtube'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Vérificateur de zone sûre YouTube Shorts',
        seoTitle: 'Zone de sécurité YouTube Shorts et template PNG',
        description: 'Vérifiez la zone sûre de vos YouTube Shorts. Évitez les superpositions d’icônes et téléchargez gratuitement le template PNG transparent 1080x1920.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['zone sure youtube shorts', 'template shorts youtube', 'safe zone video verticale', 'shorts overlay checker', 'marges ui shorts'],
      },
      'youtube-channel-name-generator': {
        title: 'Générateur de nom de chaîne YouTube',
        seoTitle: 'Générateur de nom de chaîne YouTube gratuit',
        description: 'Trouvez des idées de noms originales pour votre chaîne YouTube de gaming, vlog ou tech. Générateur gratuit et instantané dans votre navigateur.',
        categoryLabel: 'Outils de titres',
        keywords: ['generateur de nom de chaine youtube', 'idees nom chaine youtube', 'nom chaine youtube gaming', 'trouver nom youtube gratuit'],
      },
      'youtube-tag-generator': {
        title: 'Générateur de Tags YouTube',
        seoTitle: 'Générateur de Tags YouTube (Gratuit)',
        description: 'Générez des tags YouTube optimisés et des grappes de mots-clés dans la limite de 500 caractères. Outil SEO gratuit avec copie rapide par virgules.',
        categoryLabel: 'Outils de titres',
        keywords: ['générateur de tags youtube', 'generateur tag youtube', 'balises youtube', 'tags pour vidéo youtube', 'mots clés youtube'],
      },
      'youtube-description-generator': {
        title: 'Générateur de Description YouTube',
        seoTitle: 'Générateur de Description YouTube',
        description: 'Générez des descriptions YouTube percutantes avec chapitres horodatés, liens et accroches pour le SEO. Outil gratuit dans votre navigateur.',
        categoryLabel: 'Outils de titres',
        keywords: ['générateur de description youtube', 'modele description youtube', 'description video youtube', 'chapitres youtube description'],
      },
      'youtube-title-checker': {
        title: 'Vérificateur et analyseur de titres YouTube',
        seoTitle: 'Testeur de titre: Vérificateur de longueur et troncature YouTube',
        description: 'Vérificateur et testeur de titre YouTube gratuit. Analysez longueur, troncature mobile à 50 caractères, mots-clés et CTR avant de publier votre vidéo.',
        categoryLabel: 'Outils de titres',
        keywords: ['testeur de titre', 'title checker', 'verificateur de titre', 'analyseur titre youtube', 'longueur titre youtube', 'titre accrocheur youtube', 'compteur caracteres youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculateur d’argent et de revenus YouTube',
        seoTitle: 'Calculateur d’argent et de revenus YouTube',
        description: 'Calculateur d’argent et de revenus YouTube : estimez vos gains mensuels et annuels à partir de vos vues et d’une fourchette de RPM, directement dans votre navigateur.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calculateur argent youtube', 'calculateur revenus youtube', 'combien rapporte youtube', 'salaire youtubeur simulateur', 'estimer gains youtube'],
      },
      'youtube-rpm-calculator': {
        title: 'Calculateur de RPM YouTube',
        seoTitle: 'Calculateur RPM YouTube: Revenus pour 1 000 vues',
        description: 'Calculez gratuitement votre RPM YouTube pour connaître vos gains réels pour 1 000 vues à partir de vos données de chaîne. Outil gratuit et privé en ligne.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calculateur rpm youtube', 'calculer rpm youtube', 'difference rpm et cpm', 'revenu pour mille vues', 'analytics youtube revenus'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calculateur d’heures de visionnage YouTube',
        seoTitle: 'Calculateur d\'heures YouTube: Objectif 4 000 h',
        description: 'Calculez vos heures de visionnage YouTube et les vues nécessaires pour atteindre l\'objectif des 4 000 heures du programme partenaire.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calculateur 4000 heures youtube', 'heures de visionnage monétisation', 'combien de vues pour 4000 heures', 'programme partenaire youtube', 'atteindre 4000 heures'],
      },
      'youtube-monetization-calculator': {
        title: 'Calculateur global de monétisation YouTube',
        seoTitle: 'Calculateur monétisation YouTube: Pubs et sponsors',
        description: 'Estimez vos revenus YouTube sur toutes vos sources (pubs, sponsors, affiliation) déduction faite des dépenses pour connaître votre gain mensuel net.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calculateur monetisation youtube', 'revenus sponsoring youtubeur', 'modele financier createur', 'salaire net youtube', 'chiffre daffaires youtubeur'],
      },
      'youtube-link-generator': {
        title: 'Générateur de lien YouTube avec timestamp et lien d’abonnement',
        seoTitle: 'Lien YouTube avec timestamp et lien d’abonnement',
        description: 'Créez un lien YouTube qui démarre à la seconde près (t=) ou un lien d’abonnement avec ?sub_confirmation=1 et son QR code. Gratuit, dans votre navigateur.',
        categoryLabel: 'Outils de titres',
        keywords: ['lien youtube avec timestamp', 'lien youtube à un moment précis', 'partager une vidéo youtube à un moment précis', 'lien d\'abonnement youtube', 'générateur de lien youtube'],
      },
      'youtube-profile-picture-resizer': {
        title: 'Taille de la photo de profil YouTube (800 × 800) et redimensionneur',
        seoTitle: 'Taille photo de profil YouTube 2026 – 800×800 gratuit',
        description: 'Taille de la photo de profil YouTube : 800 × 800 px, 1:1, 4 Mo maximum, affichée en cercle. Recadrez, prévisualisez en mode clair et sombre, exportez gratuitement.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['taille photo de profil youtube', 'taille icône chaîne youtube', 'photo de profil youtube 800x800', 'redimensionner photo de profil youtube', 'format photo de profil youtube'],
      },
      'youtube-thumbnail-downloader': {
        title: 'Télécharger une miniature YouTube en HD et résolution max',
        seoTitle: 'Télécharger une miniature YouTube – HD et résolution max',
        description: 'Téléchargez la miniature de n’importe quelle vidéo YouTube en résolution maximale (1280 × 720), SD, HQ et tailles plus petites. Collez un lien vidéo, Shorts ou youtu.be.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['télécharger miniature youtube', 'miniature youtube hd', 'récupérer miniature youtube', 'télécharger thumbnail youtube', 'miniature vidéo youtube'],
      },
      'youtube-thumbnail-tester': {
        title: 'Testeur et aperçu de miniatures YouTube',
        seoTitle: 'Aperçu de miniature YouTube – Accueil, recherche et mobile',
        description: 'Prévisualisez votre miniature YouTube sur l’accueil, la recherche, les suggestions et le mobile, en mode clair et sombre. Comparez deux versions. Gratuit, rien n’est envoyé.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['aperçu miniature youtube', 'tester miniature youtube', 'testeur de miniature', 'comparer miniatures youtube', 'prévisualiser miniature youtube'],
      },
      'youtube-timestamp-generator': {
        title: 'Générateur de chapitres et d’horodatages YouTube',
        seoTitle: 'Chapitres YouTube – Générateur d’horodatages gratuit',
        description: 'Créez des chapitres YouTube à partir de vos notes : vérifiez les règles 0:00, 3 chapitres et 10 secondes, voyez la durée de chacun et copiez une liste propre. Gratuit.',
        categoryLabel: 'Outils de titres',
        keywords: ['chapitres youtube', 'horodatage youtube', 'comment mettre des chapitres sur youtube', 'générateur chapitres youtube', 'chapitres youtube ne s’affichent pas'],
      },
      'words-to-minutes-calculator': {
        title: 'Calculateur de mots par minute – durée d’un script',
        seoTitle: 'Mots par minute – Calcul du temps de lecture d’un script',
        description: 'Calculez le temps de lecture à voix haute de votre script. Collez le texte ou saisissez le nombre de mots, choisissez un débit et voyez combien de mots il faut pour 5 ou 10 minutes.',
        categoryLabel: 'Outils de titres',
        keywords: ['mots par minute', 'calcul temps de lecture', 'combien de mots par minute à l’oral', 'durée d’un discours', 'calculateur temps de parole'],
      },
      'engagement-rate-calculator': {
        title: 'Calcul du taux d’engagement pour YouTube, Instagram et TikTok',
        seoTitle: 'Calcul taux d’engagement – YouTube, Instagram, TikTok',
        description: 'Calcul du taux d’engagement gratuit pour YouTube, Instagram et TikTok : par vues, abonnés ou portée, avec la formule affichée et la moyenne de 20 publications.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calcul taux d\'engagement', 'calculer taux d\'engagement instagram', 'taux d\'engagement youtube', 'calculateur taux d\'engagement', 'formule taux d\'engagement'],
      },
    },
  },
  de: {
    nav: {
      tools: 'Tools',
      studio: 'Veröffentlichungs-Studio',
      checklist: 'Checkliste',
      guides: 'Leitfäden',
      about: 'Über uns',
      contact: 'Kontakt',
      privacy: 'Datenschutz',
      terms: 'Nutzungsbedingungen',
      search: 'Tools durchsuchen...',
      skipToContent: 'Zum Hauptinhalt springen',
    },
    home: {
      badge: 'Der Pre-Publish-Arbeitsbereich für YouTube-Creator',
      title: 'Kostenlose YouTube-Creator-Tools',
      subtitle: 'Smarter erstellen. Besser veröffentlichen.',
      description: 'Thumbnails komprimieren, Titel-Längen prüfen, Shorts-Safe-Zones testen und Kanal-Umsätze lokal im Browser berechnen.',
      launchStudio: 'Publish Studio öffnen',
      exploreTools: 'Alle Tools entdecken',
      localBadge: '100% Browser-lokale Verarbeitung',
      noAccount: 'Keine Registrierung erforderlich',
      zeroUploads: 'Null Cloud-Uploads',
      checklistTitle: 'Pre-Publish-Checkliste',
      checklistDesc: 'Thumbnail-Vorgaben, Titel-Abschneidung und Upload-Bereitschaft systematisch prüfen.',
      studioTitle: 'Veröffentlichungs-Studio',
      studioDesc: 'Titel, Beschreibung und Thumbnail an einem zentralen Ort bündeln und vorbereiten.',
      openChecklist: 'Checkliste öffnen',
      openStudio: 'Studio starten',
    },
    studio: {
      title: 'Veröffentlichungs-Studio für YouTube',
      description: 'Titel, Beschreibung und Thumbnail lokal abstimmen, Checks durchführen und als fertiges Projektpaket herunterladen.',
      heading: 'Creovly Veröffentlichungs-Studio',
      subheading: 'Die Pre-Publish-Kommandozentrale für erfolgreiche YouTube-Creator',
    },
    checklist: {
      title: 'YouTube Pre-Publish-Checkliste für Creator',
      description: 'Bereite deinen nächsten Upload mit einer interaktiven Checkliste vor, die deinen Fortschritt lokal sichert.',
      heading: 'Pre-Publish-Checkliste',
      subheading: 'Qualitätskontrolle vor dem Klick auf Veröffentlichen',
    },
    toolsDirectory: {
      title: 'Creator-Tool-Verzeichnis',
      description: 'Tools für Thumbnails, Titel-Checks, Shorts-Framing, Einnahmen, RPM und Watchtime.',
      heading: 'Pre-Publish-Werkzeuge',
      subheading: 'Ohne Anmeldung. Keine Server-Uploads. Leistungsstarke Client-Side-Tools.',
    },
    thumbnailCategory: {
      title: 'YouTube-Thumbnail-Tools',
      description: 'Bereite deine YouTube-Thumbnails mit lokaler Größenanpassung und Komprimierung sowie Rahmenhilfen für Shorts vor.',
    },
    guidesIndex: {
      title: 'Creator-Leitfäden & Plattform-Benchmarks — Creovly',
      description: 'Technische Leitfäden und geprüfte Richtlinien für maximale Performance auf YouTube.',
      heading: 'Creator-Guides & Richtlinien',
      subheading: 'Verifizierte Spezifikationen und offizielle Plattform-Vorgaben',
    },
    about: {
      title: 'Über Creovly: Tools für YouTube-Creator',
      description: 'Creovly bietet unabhängige, datenschutzfreundliche Creator-Tools direkt im Webbrowser.',
      heading: 'Über Creovly',
      subheading: 'Entwickelt für maximale Privatsphäre und Effizienz bei der Videoerstellung.',
    },
    contact: {
      title: 'Kontakt — Creovly',
      description: 'Haben Sie Feedback, Fragen oder Vorschläge zu Creovly? Schreiben Sie uns.',
      heading: 'Kontakt aufnehmen',
      subheading: 'Wir freuen uns über Feedback und Feature-Vorschläge der Creator-Community.',
    },
    privacy: {
      title: 'Datenschutzerklärung — Creovly',
      description: 'Strikte Client-Side-Architektur: Ihre Bilder und Daten bleiben immer auf Ihrem Gerät.',
      heading: 'Datenschutzerklärung',
      subheading: 'Vollständige Transparenz: Lokale Verarbeitung ohne Datenspeicherung auf Servern.',
    },
    terms: {
      title: 'Nutzungsbedingungen — Creovly',
      description: 'Rechtliche Rahmenbedingungen und Urheberrechtsrichtlinien von Creovly.',
      heading: 'Nutzungsbedingungen',
      subheading: 'Faire und transparente Bedingungen für die Nutzung unserer Tools.',
    },
    tools: {
      'logo-background-remover': {
        title: 'Logo-Hintergrund entfernen',
        seoTitle: 'Logo-Hintergrund entfernen (Kostenloses PNG)',
        description: 'Logo-Hintergrund kostenlos entfernen. Wähle die Hintergrundfarbe, prüfe das Ergebnis und lade ein transparentes PNG direkt im Browser herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['logo hintergrund entfernen', 'logo freistellen kostenlos', 'transparentes png erstellen', 'youtube kanal logo freistellen', 'bild hintergrund entfernen'],
      },
      'youtube-thumbnail-compressor': {
        title: 'YouTube-Thumbnail-Komprimierer',
        seoTitle: 'YouTube-Thumbnail-Kompressor: unter 2 MB',
        description: 'Thumbnail zu groß? Komprimiere dein YouTube-Thumbnail im Browser unter das 2-MB-Limit, vergleiche Vorher und Nachher und lade die kleinere Datei herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail komprimieren', 'thumbnail unter 2mb verkleinern', 'youtube bild dateigroesse reduzieren', 'thumbnail optimizer kostenlos', 'png bild komprimieren'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTube-Thumbnail-Größe anpassen (Resizer)',
        seoTitle: 'YouTube-Thumbnail-Resizer: Auf 1280x720 skalieren',
        description: "Skaliere jedes Bild auf eine YouTube-Thumbnail-Größe: 1280x720 oder empfohlene 3840x2160, beide 16:9. Prüfe den Ausschnitt und lade es kostenlos im Browser herunter.",
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail groesse aendern', 'thumbnail konverter groesse', 'thumbnail 1280x720 format', 'youtube banner massen', 'youtube bild skalieren', 'kanalbild zuschneiden'],
      },
      'youtube-banner-size': {
        title: 'YouTube-Banner-Größenprüfer & Resizer',
        seoTitle: 'YouTube-Banner-Größe: 2560x1440 Vorlage',
        description: 'YouTube-Banner-Größe: 2560x1440 px, sicherer Bereich 1546x423 px, max. 6 MB. Prüfe TV-, Desktop- und Mobilansicht, passe dein Bild an und lade die kostenlose Vorlage herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube banner groesse', 'youtube banner maße alle geraete', 'youtube banner vorlage png', 'youtube banner safe zone handy', 'youtube banner groesse aendern'],
      },
      'youtube-shorts-safe-zone': {
        title: 'YouTube Shorts Safe-Zone-Prüfer',
        seoTitle: 'YouTube Shorts Safe Zone Prüfer & PNG Vorlage',
        description: 'Prüfe YouTube Shorts Safe-Zones vor dem Upload. Schütze wichtige Inhalte vor UI-Overlays und lade die kostenlose transparente PNG-Vorlage herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube shorts safe zone', 'shorts sicherer bereich vorlage', 'vertikales video framing', 'shorts ui abstaende', 'shorts schablone overlay'],
      },
      'youtube-channel-name-generator': {
        title: 'YouTube-Kanalnamen-Generator',
        seoTitle: 'Kostenloser YouTube-Kanalnamen-Generator',
        description: 'Finde kreative Namen für deinen YouTube-Kanal in Gaming, Vlogs, Tech und Business. Kostenloser Kanalnamen-Generator direkt im Browser.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube kanalnamen generator', 'kanalname finden ideen', 'gaming kanal name generator', 'youtube name erstellen kostenlos'],
      },
      'youtube-tag-generator': {
        title: 'YouTube-Tag-Generator',
        seoTitle: 'Kostenloser YouTube-Tag-Generator',
        description: 'Generiere optimierte YouTube-Tags und Keyword-Cluster innerhalb des 500-Zeichen-Limits. Kostenloser SEO-Tag-Generator mit Direktkopie.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube tag generator', 'youtube tags generieren', 'tags für youtube videos', 'youtube seo tags', 'videotags erstellen'],
      },
      'youtube-description-generator': {
        title: 'YouTube-Videobeschreibungs-Generator',
        seoTitle: 'YouTube-Beschreibungs-Generator',
        description: 'Erstelle optimierte YouTube-Videobeschreibungen mit Zeitstempeln, Hooks und Social-Links. Kostenloser Beschreibungs-Generator ohne Anmeldung.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube beschreibung generator', 'youtube videobeschreibung generator', 'youtube beschreibung vorlage', 'youtube beschreibung erstellen', 'youtube timestamps beschreibung'],
      },
      'youtube-title-checker': {
        title: 'Titel-Checker & YouTube-Analyzer',
        seoTitle: 'Titel-Checker: YouTube-Titellänge & Mobil-Vorschau prüfen',
        description: 'Kostenloser Titel-Checker und YouTube-Analyzer. Prüfe Titellänge, 50-Zeichen-Mobilgrenze, Keywords und CTR-Optimierung vor dem Video-Upload.',
        categoryLabel: 'Titel-Tools',
        keywords: ['title checker', 'titel checker', 'youtube titel pruefen', 'youtube titel laenge pruefen', 'video titel zeichenzaehler', 'youtube titel optimieren', 'klickstarke titel erstellen'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube Geld- und Einnahmenrechner',
        seoTitle: 'YouTube Geldrechner & Einnahmenrechner',
        description: 'YouTube Geldrechner und Einnahmenrechner: Schätze monatliche und jährliche Einnahmen aus deinen Aufrufen und einer RPM-Spanne direkt im Browser.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['youtube geldrechner', 'youtube einnahmen rechner', 'wieviel zahlt youtube pro aufruf', 'youtube geld verdienen rechner', 'kanal umsatz simulieren'],
      },
      'youtube-rpm-calculator': {
        title: 'YouTube-RPM-Rechner',
        seoTitle: 'YouTube-RPM-Rechner: Einnahmen pro 1.000 Views',
        description: 'Berechne deinen YouTube-RPM, um deinen Verdienst pro 1.000 Aufrufe aus deinen echten Kanalwerten zu ermitteln. 100 % browserbasiert und privat.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['youtube rpm rechner', 'rpm vs cpm youtube', 'umsatz pro 1000 aufrufe berechnen', 'analytics creator kennzahlen', 'youtube rpm berechnung'],
      },
      'youtube-watch-hours-calculator': {
        title: 'YouTube-Wiedergabestunden-Rechner',
        seoTitle: 'YouTube-Watchtime-Rechner: 4.000-Stunden-Ziel',
        description: 'Berechne deine YouTube-Wiedergabestunden und schätze die nötigen Aufrufe, um das 4.000-Stunden-Ziel des Partnerprogramms zu erreichen.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['youtube 4000 stunden rechner', 'wiedergabezeit monetarisierung berechnen', 'wie viele views fuer 4000 stunden', 'youtube partnerprogramm watchtime', 'monetarisierung ziel'],
      },
      'youtube-monetization-calculator': {
        title: 'YouTube-Gesamteinnahmen-Simulator',
        seoTitle: 'YouTube-Monetarisierungsrechner: Ads und Sponsoren',
        description: 'Berechne deine gesamten YouTube-Kanal-Einnahmen aus allen Quellen (Werbung, Sponsoring, Affiliates) abzüglich Ausgaben für dein Nettoeinkommen.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['youtube monetarisierungsrechner', 'creator einkommen kalkulieren', 'sponsoring einnahmen youtube', 'netto creator gewinn', 'kanal geschaeftsmodell'],
      },
      'youtube-link-generator': {
        title: 'YouTube Link mit Zeitstempel & Abo-Link erstellen',
        seoTitle: 'YouTube Link mit Zeitstempel erstellen – Abo-Link Generator',
        description: 'Erstellen Sie einen YouTube Link mit Zeitstempel, der sekundengenau startet (t=), oder einen Abo-Link mit ?sub_confirmation=1 samt QR-Code. Kostenlos im Browser.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube link mit zeitstempel', 'youtube link mit zeit', 'youtube video ab bestimmter stelle teilen', 'youtube abo link', 'youtube abonnieren link erstellen'],
      },
      'youtube-profile-picture-resizer': {
        title: 'YouTube Profilbild Größe (800 × 800) & Profilbild-Resizer',
        seoTitle: 'YouTube Profilbild Größe 2026 – 800×800 kostenlos anpassen',
        description: 'YouTube Profilbild Größe: 800 × 800 px, 1:1, bis 4 MB, als Kreis angezeigt. Zuschneiden, den Kreis im hellen und dunklen Modus prüfen und kostenlos exportieren.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube profilbild größe', 'youtube kanalbild größe', 'youtube profilbild 800x800', 'youtube profilbild zuschneiden', 'youtube profilbild format'],
      },
      'youtube-thumbnail-downloader': {
        title: 'YouTube Thumbnail herunterladen – HD & maximale Auflösung',
        seoTitle: 'YouTube Thumbnail herunterladen – HD & max. Auflösung',
        description: 'Lade das Thumbnail jedes YouTube-Videos in maximaler Auflösung (1280 × 720), SD, HQ und kleineren Größen herunter. Video-, Shorts- oder youtu.be-Link einfügen. Kostenlos.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail herunterladen', 'youtube thumbnail downloader', 'youtube vorschaubild herunterladen', 'youtube thumbnail speichern', 'youtube thumbnail hd'],
      },
      'youtube-thumbnail-tester': {
        title: 'YouTube Thumbnail Tester & Vorschau',
        seoTitle: 'YouTube Thumbnail Vorschau – Startseite, Suche & Handy',
        description: 'Sieh dein YouTube-Thumbnail auf Startseite, Suche, Vorschlägen und Handy, im hellen und dunklen Design. Vergleiche zwei Versionen. Kostenlos, nichts wird hochgeladen.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail vorschau', 'youtube thumbnail testen', 'thumbnail tester', 'youtube thumbnails vergleichen', 'youtube vorschaubild testen'],
      },
      'youtube-timestamp-generator': {
        title: 'YouTube Kapitel & Zeitstempel erstellen',
        seoTitle: 'YouTube Kapitel erstellen – Zeitstempel-Generator',
        description: 'Erstelle YouTube-Kapitel aus deinen Notizen: Prüfe die Regeln 0:00, 3 Kapitel und 10 Sekunden, sieh die Länge jedes Kapitels und kopiere eine saubere Liste. Kostenlos.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube kapitel erstellen', 'youtube zeitstempel', 'youtube kapitel', 'youtube kapitel werden nicht angezeigt', 'youtube zeitstempel beschreibung'],
      },
      'words-to-minutes-calculator': {
        title: 'Wörter pro Minute Rechner – Redezeit berechnen',
        seoTitle: 'Redezeit berechnen – Wörter pro Minute für Skripte',
        description: 'Berechne, wie lange dein Skript laut gelesen dauert. Text einfügen oder Wortzahl eingeben, Tempo wählen und sehen, wie viele Wörter ein 5- oder 10-Minuten-Video braucht.',
        categoryLabel: 'Titel-Tools',
        keywords: ['wörter pro minute', 'redezeit berechnen', 'wie viele wörter pro minute sprechen', 'sprechzeit rechner', 'skript länge berechnen'],
      },
      'engagement-rate-calculator': {
        title: 'Engagement Rate berechnen für YouTube, Instagram & TikTok',
        seoTitle: 'Engagement Rate berechnen – YouTube, Instagram, TikTok',
        description: 'Engagement Rate berechnen für YouTube, Instagram und TikTok: nach Aufrufen, Followern oder Reichweite, mit sichtbarer Formel und Durchschnitt über bis zu 20 Beiträge.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['engagement rate berechnen', 'engagement rate rechner', 'instagram engagement rate berechnen', 'youtube engagement rate', 'engagement rate formel'],
      },
    },
  },
  pt: {
    nav: {
      tools: 'Ferramentas',
      studio: 'Estúdio de publicação',
      checklist: 'Checklist',
      guides: 'Guias de criadores',
      about: 'Sobre',
      contact: 'Contato',
      privacy: 'Privacidade',
      terms: 'Termos',
      search: 'Pesquisar ferramentas...',
      skipToContent: 'Pular para o conteúdo principal',
    },
    home: {
      badge: 'O espaço de trabalho pré-publicação para criadores do YouTube',
      title: 'Ferramentas gratuitas para criadores do YouTube',
      subtitle: 'Crie com inteligência. Publique melhor.',
      description: 'Comprima miniaturas, teste títulos, valide zonas seguras dos Shorts e calcule receitas no seu navegador.',
      launchStudio: 'Abrir Publish Studio',
      exploreTools: 'Ver ferramentas',
      localBadge: '100% processamento no navegador',
      noAccount: 'Sem necessidade de cadastro',
      zeroUploads: 'Zero uploads para a nuvem',
      checklistTitle: 'Checklist pré-publicação',
      checklistDesc: 'Verifique especificações de miniatura, quebras de título e prontidão de envio.',
      studioTitle: 'Estúdio de publicação',
      studioDesc: 'Reúna título, descrição e thumbnail em um único espaço de trabalho local.',
      openChecklist: 'Abrir checklist',
      openStudio: 'Iniciar Studio',
    },
    studio: {
      title: 'Estúdio de publicação para YouTube',
      description: 'Prepare título, descrição e imagem localmente. Revise verificações essenciais e baixe seu projeto compactado.',
      heading: 'Estúdio de publicação Creovly',
      subheading: 'Centro de comando pré-publicação para criadores de conteúdo',
    },
    checklist: {
      title: 'Checklist pré-publicação para criadores',
      description: 'Prepare seus vídeos com um checklist interativo que salva seu progresso localmente no navegador.',
      heading: 'Checklist pré-publicação',
      subheading: 'Verificação minuciosa para garantir o melhor alcance e retenção',
    },
    toolsDirectory: {
      title: 'Diretório de ferramentas para criadores',
      description: 'Utilitários para miniaturas, análise de títulos, Shorts, receita, RPM e horas de exibição.',
      heading: 'Utilitários pré-publicação',
      subheading: 'Sem login. Sem envio de dados. Execução segura direto no seu navegador.',
    },
    thumbnailCategory: {
      title: 'Ferramentas de miniaturas do YouTube',
      description: 'Prepare suas miniaturas do YouTube com redimensionamento e compressão locais, além de guias de enquadramento para Shorts.',
    },
    guidesIndex: {
      title: 'Guias e benchmarks para criadores — Creovly',
      description: 'Guias técnicos com fontes oficiais e limites de plataforma comprovados para o YouTube.',
      heading: 'Guias técnicos e métricas de plataforma',
      subheading: 'Especificações comprovadas e boas práticas para criadores',
    },
    about: {
      title: 'Sobre o Creovly — Espaço de trabalho para YouTube',
      description: 'Conheça o Creovly: conjunto de ferramentas focado em privacidade e execução 100% no navegador.',
      heading: 'Sobre o Creovly',
      subheading: 'Ferramentas de alta performance com privacidade absoluta.',
    },
    contact: {
      title: 'Contato — Creovly',
      description: 'Sugestões, dúvidas ou feedback sobre o Creovly? Fale com nossa equipe.',
      heading: 'Entre em contato',
      subheading: 'Feedback da comunidade de criadores é sempre bem-vindo.',
    },
    privacy: {
      title: 'Política de privacidade — Creovly',
      description: 'Privacidade de ponta a ponta: seus arquivos e imagens nunca saem da sua máquina.',
      heading: 'Política de privacidade',
      subheading: 'Processamento totalmente local sem coleta invasiva de dados.',
    },
    terms: {
      title: 'Termos de serviço — Creovly',
      description: 'Termos de uso e diretrizes de propriedade intelectual do Creovly.',
      heading: 'Termos de serviço',
      subheading: 'Condições transparentes para você criar com total segurança.',
    },
    tools: {
      'logo-background-remover': {
        title: 'Remover fundo de logo',
        seoTitle: 'Remover fundo de logo (PNG transparente grátis)',
        description: 'Remova o fundo de qualquer logo gratuitamente. Envie seu arquivo, escolha a cor, visualize a transparência e baixe o PNG direto no navegador.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['remover fundo de logo', 'tirar fundo do logo gratis', 'fazer logo transparente', 'png transparente gratis', 'logo canal youtube'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compressor de miniaturas do YouTube',
        seoTitle: 'Compressor de miniaturas do YouTube: menos de 2 MB',
        description: 'Miniatura pesada demais? Comprima sua miniatura do YouTube abaixo do limite de 2 MB no navegador, compare antes e depois e baixe o arquivo menor.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['compressor miniatura youtube', 'diminuir tamanho thumb youtube 2mb', 'comprimir imagem youtube', 'otimizar miniatura youtube', 'comprimir png gratis'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionador de miniaturas do YouTube',
        seoTitle: 'Redimensionador de miniaturas do YouTube: 1280x720',
        description: "Redimensione qualquer imagem para um tamanho de miniatura do YouTube: 1280x720 ou o recomendado 3840x2160, ambos 16:9. Confira o enquadramento e baixe grátis no navegador.",
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['redimensionar miniatura youtube', 'conversor tamanho miniatura youtube', 'tamanho miniatura youtube 1280x720', 'dimensoes banner youtube', 'mudar tamanho foto canal', 'escala imagem youtube'],
      },
      'youtube-banner-size': {
        title: 'Verificador e redimensionador de banner do YouTube',
        seoTitle: 'Tamanho de banner do YouTube: 2560x1440 e molde',
        description: 'Tamanho do banner do YouTube: 2560x1440 px, área segura de 1546x423 px, máx. 6 MB. Veja o corte em TV, desktop e celular, redimensione sua imagem e baixe o modelo grátis.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['tamanho banner youtube', 'dimensoes banner youtube todos dispositivos', 'gabarito banner youtube', 'banner youtube safe zone celular', 'redimensionar banner youtube'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Verificador de zona segura do YouTube Shorts',
        seoTitle: 'Zona segura de YouTube Shorts e template PNG',
        description: 'Verifique a zona segura do YouTube Shorts antes de publicar. Evite sobreposições de ícones e baixe o modelo PNG transparente de 1080x1920 grátis.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['zona segura youtube shorts', 'safe zone shorts youtube', 'gabarito shorts video vertical', 'margem segura shorts', 'overlay shorts checker'],
      },
      'youtube-channel-name-generator': {
        title: 'Gerador de nomes para canais do YouTube',
        seoTitle: 'Gerador de nomes para canal do YouTube',
        description: 'Gere nomes criativos e marcantes para seu canal do YouTube em games, vlogs e negócios. Gerador gratuito e instantâneo no navegador.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['gerador de nomes para canais do youtube', 'ideias de nomes para canal youtube', 'nomes para canal de jogos', 'criar nome para youtube gratis'],
      },
      'youtube-tag-generator': {
        title: 'Gerador de Tags para YouTube',
        seoTitle: 'Gerador de Tags para YouTube (SEO)',
        description: 'Gere tags otimizadas para YouTube e clusters de palavras-chave no limite de 500 caracteres. Gerador de tags gratuito com cópia rápida separada por vírgula.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['gerador de tags para youtube', 'gerador de tags youtube', 'tags para videos youtube', 'como gerar tags youtube', 'tags seo youtube'],
      },
      'youtube-description-generator': {
        title: 'Gerador de Descrição para YouTube',
        seoTitle: 'Gerador de Descrição para YouTube',
        description: 'Crie descrições completas para vídeos do YouTube com capítulos, links sociais e introduções otimizadas para SEO. Ferramenta gratuita no navegador.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['gerador de descricao para youtube', 'modelo de descricao youtube', 'como fazer descricao youtube', 'timestamps descricao youtube'],
      },
      'youtube-title-checker': {
        title: 'Verificador e analisador de títulos para YouTube',
        seoTitle: 'Verificador de títulos: Teste de tamanho e CTR para YouTube',
        description: 'Verificador de títulos gratuito e analisador para YouTube. Avalie tamanho, corte de 50 caracteres no celular, palavras-chave e CTR antes de publicar.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['verificador de titulos', 'title checker', 'analisador de titulos', 'tamanho ideal titulo youtube', 'contador caracteres titulo youtube', 'titulos chamativos youtube', 'testar titulo video'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculadora de dinheiro e receita do YouTube',
        seoTitle: 'Calculadora de dinheiro e receita do YouTube',
        description: 'Calculadora de dinheiro e receita do YouTube: estime ganhos mensais e anuais com suas visualizações e uma faixa de RPM, direto no navegador.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora dinheiro youtube', 'calculadora receita youtube', 'quanto o youtube paga por visualizacao', 'ganhos youtube simulador', 'renda canal youtube calcular'],
      },
      'youtube-rpm-calculator': {
        title: 'Calculadora de RPM do YouTube',
        seoTitle: 'Calculadora RPM YouTube: Ganhos por 1.000 views',
        description: 'Calcule seu RPM do YouTube para saber seus ganhos por 1.000 visualizações com base na receita e views do seu próprio canal.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora rpm youtube', 'calcular rpm youtube', 'diferenca rpm e cpm', 'ganhos por mil visualizacoes', 'metricas youtube analytics'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calculadora de horas de exibição do YouTube',
        seoTitle: 'Calculadora de horas do YouTube: Meta 4.000 h',
        description: 'Calcule suas horas de exibição no YouTube e as views para alcançar a meta de 4.000 horas do Programa de Parcerias.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora 4000 horas youtube', 'horas de exibicao monetizacao', 'quantas views para 4000 horas', 'programa de parcerias youtube', 'meta monetizar canal'],
      },
      'youtube-monetization-calculator': {
        title: 'Calculadora de monetização integrada do YouTube',
        seoTitle: 'Calculadora monetização YouTube: Ads e Sponsor',
        description: 'Calcule os ganhos totais do canal no YouTube em todas as fontes (anúncios, patrocínios, afiliados) menos despesas para saber sua renda líquida.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora monetizacao youtube', 'ganhos patrocinio youtube', 'modelo financeiro criador', 'lucro liquido canal youtube', 'faturamento youtube'],
      },
      'youtube-link-generator': {
        title: 'Gerador de link do YouTube com minuto exato e link de inscrição',
        seoTitle: 'Link do YouTube com minuto exato e link de inscrição',
        description: 'Crie um link do YouTube que começa no segundo exato (t=) ou um link de inscrição com ?sub_confirmation=1 e QR code. Grátis, direto no navegador.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['link do youtube com minuto', 'link do youtube com tempo', 'compartilhar vídeo do youtube em um minuto específico', 'link de inscrição youtube', 'gerador de link de inscrição youtube'],
      },
      'youtube-profile-picture-resizer': {
        title: 'Tamanho da foto de perfil do YouTube (800 × 800) e redimensionador',
        seoTitle: 'Tamanho da foto de perfil do YouTube 2026: 800×800 grátis',
        description: 'Tamanho da foto de perfil do YouTube: 800 × 800 px, 1:1, até 4 MB, exibida em círculo. Recorte, veja o círculo no modo claro e escuro e exporte grátis.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['tamanho foto de perfil youtube', 'tamanho ícone youtube', 'foto de perfil youtube 800x800', 'redimensionar foto de perfil youtube', 'medidas foto de perfil youtube'],
      },
      'youtube-thumbnail-downloader': {
        title: 'Baixar thumbnail do YouTube em HD e resolução máxima',
        seoTitle: 'Baixar thumbnail do YouTube – HD e resolução máxima',
        description: 'Baixe a thumbnail de qualquer vídeo do YouTube em resolução máxima (1280 × 720), SD, HQ e tamanhos menores. Cole um link de vídeo, Shorts ou youtu.be. Grátis.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['baixar thumbnail do youtube', 'baixar miniatura do youtube', 'thumbnail youtube hd', 'baixar capa de video do youtube', 'pegar thumbnail do youtube'],
      },
      'youtube-thumbnail-tester': {
        title: 'Testador e prévia de thumbnail do YouTube',
        seoTitle: 'Prévia de thumbnail do YouTube – início, busca e celular',
        description: 'Veja sua thumbnail do YouTube na página inicial, na busca, nos sugeridos e no celular, nos modos claro e escuro. Compare duas versões. Grátis, nada é enviado.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['prévia thumbnail youtube', 'testar thumbnail youtube', 'testador de thumbnail', 'comparar thumbnails youtube', 'como fica minha thumbnail no youtube'],
      },
      'youtube-timestamp-generator': {
        title: 'Gerador de capítulos e timestamps do YouTube',
        seoTitle: 'Capítulos do YouTube – Gerador de timestamps grátis',
        description: 'Crie capítulos do YouTube a partir das suas anotações: confira as regras de 0:00, 3 capítulos e 10 segundos, veja a duração de cada um e copie uma lista limpa. Grátis.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['capítulos youtube', 'timestamps youtube', 'como colocar capítulos no youtube', 'gerador de capítulos youtube', 'capítulos do youtube não aparecem'],
      },
      'words-to-minutes-calculator': {
        title: 'Calculadora de palavras por minuto e tempo de leitura',
        seoTitle: 'Palavras por minuto – Calcular tempo de leitura do roteiro',
        description: 'Calcule quanto tempo seu roteiro leva lido em voz alta. Cole o texto ou digite as palavras, escolha um ritmo e veja quantas palavras um vídeo de 5 ou 10 minutos precisa.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['palavras por minuto', 'calcular tempo de leitura', 'quantas palavras por minuto falamos', 'tempo de leitura de texto', 'duração de roteiro'],
      },
      'engagement-rate-calculator': {
        title: 'Calculadora de engajamento para YouTube, Instagram e TikTok',
        seoTitle: 'Calculadora de engajamento – YouTube, Instagram, TikTok',
        description: 'Calculadora de engajamento grátis para YouTube, Instagram e TikTok: calcule a taxa por visualizações, seguidores ou alcance, veja a fórmula e a média de até 20 posts.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora de engajamento', 'taxa de engajamento instagram', 'como calcular taxa de engajamento', 'taxa de engajamento youtube', 'calculadora de engajamento tiktok'],
      },
    },
  },
  ko: {
    nav: {
      tools: '도구 모음',
      studio: '게시 스튜디오',
      checklist: '체크리스트',
      guides: '크리에이터 가이드',
      about: '소개',
      contact: '문의하기',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      search: '도구 검색...',
      skipToContent: '본문으로 건너뛰기',
    },
    home: {
      badge: 'YouTube 크리에이터를 위한 사전 발행 워크스페이스',
      title: '무료 YouTube 크리에이터 도구',
      subtitle: '더 똑똑하게 만들고, 더 완벽하게 게시하세요',
      description: '썸네일 압축 및 리사이징, 제목 검사, 쇼츠 안전 구역 확인 및 예상 수익 계산을 브라우저에서 안전하게 실행하세요.',
      launchStudio: 'Publish Studio 실행',
      exploreTools: '도구 둘러보기',
      localBadge: '100% 브라우저 로컬 처리',
      noAccount: '회원가입 필요 없음',
      zeroUploads: '클라우드 업로드 제로',
      checklistTitle: '발행 전 체크리스트',
      checklistDesc: '썸네일 규격, 모바일 제목 잘림 현상, 음원 저작권 표기를 체계적으로 점검합니다.',
      studioTitle: '게시 스튜디오',
      studioDesc: '제목, 설명, 썸네일을 로컬 환경에서 한 번에 검토하고 패키징합니다.',
      openChecklist: '체크리스트 열기',
      openStudio: 'Studio 열기',
    },
    studio: {
      title: '게시 스튜디오 — YouTube 영상 게시 전 준비 및 체크',
      description: '제목, 설명, 이미지를 단일 로컬 환경에서 통합 준비하고 검증 후 프로젝트 파일로 다운로드하세요.',
      heading: 'Creovly 게시 스튜디오',
      subheading: 'YouTube 크리에이터를 위한 사전 발행 사령탑',
    },
    checklist: {
      title: 'YouTube 발행 전 크리에이터 체크리스트',
      description: '진행 상황이 브라우저에 자동 저장되는 인터랙티브 체크리스트로 완벽한 업로드를 준비하세요.',
      heading: '발행 전 검증 체크리스트',
      subheading: '조회수와 클릭률을 극대화하기 위한 필수 사전 점검',
    },
    toolsDirectory: {
      title: '크리에이터 도구 디렉터리',
      description: '썸네일, 제목 검사, 쇼츠 화면 비율, 수익, RPM 및 시청 시간 계산 도구 모음.',
      heading: '발행 전 크리에이터 유틸리티',
      subheading: '가입 불필요. 서버 업로드 없음. 안전한 100% 클라이언트 사이드 도구.',
    },
    thumbnailCategory: {
      title: 'YouTube 썸네일 도구',
      description: '브라우저에서 바로 리사이즈·압축하고 Shorts 프레이밍 가이드로 YouTube 썸네일을 준비하세요.',
    },
    guidesIndex: {
      title: '크리에이터 가이드 및 플랫폼 기준 — Creovly',
      description: 'YouTube 공식 기준에 기반한 기술 가이드, 썸네일 규격 및 수익화 벤치마크.',
      heading: '크리에이터 가이드 및 벤치마크',
      subheading: '크리에이터를 위해 검증된 공식 사양 및 테크니컬 레퍼런스',
    },
    about: {
      title: 'Creovly 소개 — YouTube 크리에이터 워크스페이스',
      description: 'Creovly는 사용자의 개인정보를 최우선으로 생각하는 100% 브라우저 기반 크리에이터 툴킷입니다.',
      heading: 'Creovly 소개',
      subheading: '크리에이터의 프라이버시와 작업 효율을 위해 개발되었습니다.',
    },
    contact: {
      title: '문의하기 — Creovly',
      description: 'Creovly에 대한 피드백, 기능 제안 또는 질문이 있으신가요? 언제든 연락주세요.',
      heading: '문의하기',
      subheading: '크리에이터 여러분의 소중한 피드백과 기능 제안을 환영합니다.',
    },
    privacy: {
      title: '개인정보처리방침 — Creovly',
      description: '완벽한 클라이언트 사이드 아키텍처: 업로드하신 이미지와 텍스트는 서버로 전송되지 않습니다.',
      heading: '개인정보처리방침',
      subheading: '완벽한 투명성: 외부 서버 통신 없는 안전한 로컬 브라우저 처리.',
    },
    terms: {
      title: '이용약관 — Creovly',
      description: 'Creovly 서비스 이용 조건 및 크리에이터 지적 재산권 보호 규정.',
      heading: '이용약관',
      subheading: '안심하고 도구를 사용하실 수 있는 명확한 이용 규칙.',
    },
    tools: {
      'logo-background-remover': {
        title: '로고 배경 제거',
        seoTitle: '로고 배경 제거: 무료 투명 PNG 만들기',
        description: '어떤 로고든 배경을 무료로 제거하세요. 단색 배경을 투명하게 만들어 유튜브 프로필, 썸네일, 채널아트용 고화질 투명 PNG로 즉시 다운로드할 수 있습니다.',
        categoryLabel: '썸네일 도구',
        keywords: ['로고 배경 제거', '로고 누끼 따기 무료', '투명 png 만들기', '유튜브 채널 로고 배경', '이미지 배경 지우기'],
      },
      'youtube-thumbnail-compressor': {
        title: '유튜브 썸네일 압축기',
        seoTitle: '유튜브 썸네일 압축: 2MB 이하로 줄이기',
        description: '썸네일 용량이 너무 큰가요? 브라우저에서 유튜브 썸네일을 2MB 제한 이하로 압축하고, 전후를 비교한 뒤 작아진 파일을 다운로드하세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 압축', '썸네일 2mb 이하 줄이기', '유튜브 이미지 용량 줄이기', '썸네일 화질 손실없이 압축', 'png 무료 압축'],
      },
      'youtube-thumbnail-resizer': {
        title: '유튜브 썸네일 크기 조절기 (리사이저)',
        seoTitle: '유튜브 썸네일 리사이저: 1280x720 무료 변환',
        description: "이미지를 유튜브 썸네일 크기로 조정하세요: 1280x720 또는 권장 3840x2160, 모두 16:9. 구도를 확인하고 브라우저에서 무료로 다운로드하세요.",
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 크기 조절', '썸네일 1280 720 사이즈', '유튜브 배너 규격', '유튜브 채널아트 리사이즈', '유튜브 비율 16 9'],
      },
      'youtube-banner-size': {
        title: '유튜브 배너 사이즈 확인기 및 리사이저',
        seoTitle: '유튜브 배너 사이즈: 2560x1440 크기 조절 & 템플릿',
        description: '유튜브 배너 크기: 2560x1440px, 안전 영역 1546x423px, 최대 6MB. TV·PC·모바일 표시를 확인하고 이미지를 리사이즈한 뒤 무료 템플릿을 받으세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 배너 사이즈', '유튜브 채널아트 규격', '유튜브 배너 크기 조절', '유튜브 배너 세이프존 템플릿', '유튜브 헤더 사이즈'],
      },
      'youtube-shorts-safe-zone': {
        title: '유튜브 쇼츠 안전 구역 검사기',
        seoTitle: '유튜브 쇼츠 세이프존 확인기 & 투명 PNG 템플릿',
        description: 'YouTube Shorts 안전 구역을 실시간으로 확인하세요. 구독 버튼 및 UI 가림을 방지하고 1080x1920 무료 투명 PNG 가이드 오버레이 템플릿을 다운로드하세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 쇼츠 세이프존', '쇼츠 자막 안전영역', '쇼츠 오버레이 가림 확인', '세로 영상 비율 템플릿', '쇼츠 ui 규격'],
      },
      'youtube-channel-name-generator': {
        title: '유튜브 채널 이름 생성기',
        seoTitle: '유튜브 채널 이름 생성기: 무료 아이디어',
        description: '게임, 브이로그, 테크 등 다양한 분야의 유튜브 채널 이름을 무료로 추천받으세요. 브라우저에서 바로 작동하는 스마트 이름 생성기.',
        categoryLabel: '제목 도구',
        keywords: ['유튜브 채널 이름 생성기', '유튜브 이름 추천', '유튜브 채널명 짓기', '유튜브 닉네임 생성기'],
      },
      'youtube-tag-generator': {
        title: '유튜브 태그 생성기',
        seoTitle: '유튜브 태그 생성기 (무료 SEO 추천)',
        description: '유튜브 알고리즘 및 검색 최적화에 맞는 태그를 자동 생성합니다. 500자 글자수 제한 확인, 연관 검색어 클러스터링 및 쉼표 구분 복사 제공.',
        categoryLabel: '제목 및 검색 도구',
        keywords: ['유튜브 태그 생성기', '유튜브 태그 추천', '유튜브 태그 복사', '유튜브 seo 태그', '유튜브 해시태그 태그'],
      },
      'youtube-description-generator': {
        title: '유튜브 설명란 생성기',
        seoTitle: '유튜브 설명란 생성기 (무료 템플릿)',
        description: '유튜브 동영상 설명란을 자동으로 작성합니다. 상단 노출용 요약문, 챕터 타임스탬프, 채널 구독 링크 및 소셜 링크 템플릿을 무료로 제공합니다.',
        categoryLabel: '제목 및 검색 도구',
        keywords: ['유튜브 설명란 생성기', '유튜브 설명 템플릿', '유튜브 타임스탬프 생성', '유튜브 더보기 란 작성', '유튜브 설명란 양식'],
      },
      'youtube-title-checker': {
        title: '제목 검사기 및 유튜브 제목 분석기',
        seoTitle: '제목 검사기: 유튜브 영상 제목 글자수 및 모바일 말줄임',
        description: '무료 제목 검사기이자 유튜브 영상 제목 분석기. 글자 수 50자 모바일 말줄임 한도, 키워드 배치, 클릭률(CTR) 최적화 요소를 미리 점검하세요.',
        categoryLabel: '제목 도구',
        keywords: ['제목 검사기', 'title checker', '유튜브 제목 글자수 검사기', '유튜브 제목 자르기 확인', '클릭률 높은 유튜브 제목', '유튜브 영상 제목 추천', '제목 바이트 계산'],
      },
      'youtube-revenue-calculator': {
        title: '유튜브 수익 계산기',
        seoTitle: '유튜브 수익 계산기 & 머니 계산기',
        description: '유튜브 머니 계산기이자 수익 계산기: 조회수와 RPM 범위로 월간·연간 예상 수익을 브라우저에서 바로 계산하세요.',
        categoryLabel: '수익 및 성장',
        keywords: ['유튜브 수익 계산기', '조회수당 수익 계산', '유튜브 조회수 10만 수익', '유튜브 돈 버는 법 계산', '유튜버 수입 시뮬레이터'],
      },
      'youtube-rpm-calculator': {
        title: '유튜브 RPM 계산기',
        seoTitle: '유튜브 RPM 계산기: 1,000회 조회당 순수익 계산',
        description: 'YouTube RPM을 무료로 정확히 계산하세요. 총 수익과 조회수를 입력하여 1,000회 조회수당 실제 순수익을 확인하고 채널의 광고 가치를 분석하세요.',
        categoryLabel: '수익 및 성장',
        keywords: ['유튜브 rpm 계산기', 'cpm rpm 차이', '1000회 조회수당 수익', '유튜브 분석 지표 계산', '유튜브 광고 단가'],
      },
      'youtube-watch-hours-calculator': {
        title: '유튜브 시청 시간 계산기',
        seoTitle: '유튜브 시청 시간 계산기: 4,000시간 달성 예측',
        description: 'YouTube 수익 창출을 위한 4,000 시청 시간 달성을 무료로 계산하세요. 평균 시청 지속 시간과 주간 업로드 빈도를 분석하여 파트너 프로그램 자격 도달일을 예측합니다.',
        categoryLabel: '수익 및 성장',
        keywords: ['유튜브 4000시간 계산기', '수익창출 조건 달성', '시청시간 계산', '유튜브 파트너 프로그램 자격', '4000시간 달성 팁'],
      },
      'youtube-monetization-calculator': {
        title: '유튜브 종합 수익화 시뮬레이터',
        seoTitle: '유튜브 종합 수익화 계산기: 광고·협찬·비용 정산',
        description: '광고 수익, 유료 스폰서십, 제휴 마케팅, 채널 멤버십 및 제작 비용을 통합 분석하여 YouTube 채널의 월간 순수익을 정확하게 모델링하세요.',
        categoryLabel: '수익 및 성장',
        keywords: ['유튜브 수익화 계산기', '유튜브 협찬 수익 계산', '크리에이터 순이익 모델링', '유튜브 채널 비즈니스', '유튜버 연봉 계산'],
      },
      'youtube-link-generator': {
        title: '유튜브 시간 지정 링크 & 구독 링크 생성기',
        seoTitle: '유튜브 시간 지정 링크 만들기 · 구독 링크 생성기',
        description: '원하는 초부터 재생되는 유튜브 시간 지정 링크(t=)와 ?sub_confirmation=1 구독 링크, QR 코드를 무료로 만드세요. 브라우저에서 바로 처리됩니다.',
        categoryLabel: '제목 및 검색 도구',
        keywords: ['유튜브 시간 링크', '유튜브 타임스탬프 링크', '유튜브 특정 시간 공유', '유튜브 구독 링크', '유튜브 구독 링크 만들기'],
      },
      'youtube-profile-picture-resizer': {
        title: '유튜브 프로필 사진 크기 (800×800) & 무료 리사이저',
        seoTitle: '유튜브 프로필 사진 크기 2026 – 800×800 무료 변환',
        description: '유튜브 프로필 사진 크기는 800×800px(1:1), 최대 4MB이며 원형으로 표시됩니다. 자르고 라이트·다크 모드 원형 미리보기를 확인한 뒤 무료로 내보내세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 프로필 사진 크기', '유튜브 프로필 사진 사이즈', '유튜브 채널 아이콘 크기', '유튜브 프로필 800x800', '유튜브 프로필 사진 자르기'],
      },
      'youtube-thumbnail-downloader': {
        title: '유튜브 썸네일 다운로드 (최대 해상도·HD)',
        seoTitle: '유튜브 썸네일 다운로드 – HD·최대 해상도로 저장',
        description: '모든 유튜브 동영상의 썸네일을 최대 해상도(1280 × 720), SD, HQ 등 여러 크기로 무료 다운로드하세요. 동영상, 쇼츠, youtu.be 링크만 붙여 넣으면 됩니다.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 다운로드', '유튜브 썸네일 추출', '유튜브 썸네일 저장', '유튜브 썸네일 고화질', '썸네일 다운로드 사이트'],
      },
      'youtube-thumbnail-tester': {
        title: '유튜브 썸네일 테스터 & 미리 보기',
        seoTitle: '유튜브 썸네일 미리 보기 – 홈·검색·모바일에서 확인',
        description: '유튜브 홈, 검색, 추천, 모바일에서 썸네일이 어떻게 보이는지 라이트·다크 모드로 확인하세요. 두 버전을 비교할 수 있습니다. 무료이며 업로드되지 않습니다.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 미리보기', '썸네일 테스트', '유튜브 썸네일 확인', '썸네일 비교', '썸네일 미리보기 사이트'],
      },
      'youtube-timestamp-generator': {
        title: '유튜브 타임스탬프·챕터 생성기',
        seoTitle: '유튜브 타임스탬프 만들기 – 챕터 규칙 자동 확인',
        description: '메모로 유튜브 챕터를 만드세요. 0:00, 3개 이상, 10초 이상 규칙을 확인하고, 챕터별 길이를 보고, 설명란에 넣을 깔끔한 목록을 복사할 수 있습니다. 무료입니다.',
        categoryLabel: '제목 및 검색 도구',
        keywords: ['유튜브 타임스탬프', '유튜브 챕터', '유튜브 챕터 만들기', '유튜브 타임스탬프 만들기', '유튜브 챕터 안 나옴'],
      },
      'words-to-minutes-calculator': {
        title: '대본 글자수·시간 계산기',
        seoTitle: '대본 글자수 시간 계산기 – 몇 자면 몇 분?',
        description: '대본을 소리 내어 읽는 데 걸리는 시간을 계산하세요. 대본을 붙여 넣거나 글자수를 입력하고 속도를 고르면 5분, 10분 동영상에 필요한 분량도 알 수 있습니다.',
        categoryLabel: '제목 및 검색 도구',
        keywords: ['글자수 시간 계산', '대본 시간 계산', '발표 시간 계산', '말하기 속도 계산', '대본 분량'],
      },
      'engagement-rate-calculator': {
        title: '참여율 계산기 – 유튜브·인스타그램·틱톡 인게이지먼트',
        seoTitle: '참여율 계산기 – 유튜브, 인스타그램, 틱톡',
        description: '유튜브·인스타그램·틱톡 참여율(인게이지먼트)을 무료로 계산하세요. 조회수·팔로워·도달로 나누는 공식을 보여 주고 최대 20개 게시물 평균도 냅니다.',
        categoryLabel: '수익 및 성장',
        keywords: ['참여율 계산기', '인스타 참여율 계산', '유튜브 참여율', '인게이지먼트 계산', '틱톡 참여율'],
      },
    },
  },
  it: {
    nav: {
      tools: 'Strumenti',
      studio: 'Studio di pubblicazione',
      checklist: 'Checklist',
      guides: 'Guide per creator',
      about: 'Chi siamo',
      contact: 'Contatti',
      privacy: 'Privacy',
      terms: 'Termini',
      search: 'Cerca strumenti...',
      skipToContent: 'Salta al contenuto principale',
    },
    home: {
      badge: 'L’area di lavoro pre-pubblicazione per creator di YouTube',
      title: 'Strumenti gratuiti per creator di YouTube',
      subtitle: 'Crea con intelligenza. Pubblica al meglio.',
      description: 'Comprimi miniature, analizza titoli, verifica le zone sicure degli Shorts e calcola i tuoi ricavi direttamente nel browser.',
      launchStudio: 'Apri Publish Studio',
      exploreTools: 'Esplora tutti gli strumenti',
      localBadge: '100% elaborazione locale nel browser',
      noAccount: 'Nessuna registrazione richiesta',
      zeroUploads: 'Zero caricamenti su server cloud',
      checklistTitle: 'Checklist pre-pubblicazione',
      checklistDesc: 'Verifica in modo sistematico specifiche delle miniature, troncamento dei titoli e prontezza al rilascio.',
      studioTitle: 'Studio di pubblicazione',
      studioDesc: 'Unisci titolo, descrizione e miniatura in un unico ambiente di lavoro locale.',
      openChecklist: 'Apri la checklist',
      openStudio: 'Avvia Studio',
    },
    studio: {
      title: 'Studio di pubblicazione per YouTube',
      description: 'Organizza titolo, descrizione e miniatura in locale. Esegui controlli prima della pubblicazione e scarica il pacchetto di progetto.',
      heading: 'Studio di pubblicazione Creovly',
      subheading: 'Centro di controllo pre-pubblicazione per creator di YouTube',
    },
    checklist: {
      title: 'Checklist pre-pubblicazione per creator',
      description: 'Prepara il tuo prossimo video con una checklist interattiva che memorizza i tuoi progressi nel browser.',
      heading: 'Checklist di controllo pre-pubblicazione',
      subheading: 'Verifica accurata per massimizzare CTR e visualizzazioni',
    },
    toolsDirectory: {
      title: 'Directory degli strumenti per creator',
      description: 'Strumenti per miniature, titoli, inquadratura Shorts, entrate, RPM e ore di visualizzazione.',
      heading: 'Utility pre-pubblicazione',
      subheading: 'Zero registrazioni. Nessun invio dati. Strumenti client-side veloci e sicuri.',
    },
    thumbnailCategory: {
      title: 'Strumenti per miniature YouTube',
      description: 'Prepara le miniature YouTube con ridimensionamento e compressione locali, più guide di inquadratura per gli Shorts.',
    },
    guidesIndex: {
      title: 'Guide e standard per creator — Creovly',
      description: 'Guide tecniche basate sui dati e limiti di piattaforma verificati per YouTube.',
      heading: 'Guide tecniche e standard per creator',
      subheading: 'Specifiche ufficiali verificate e best practice per video maker',
    },
    about: {
      title: 'Chi siamo — Creovly per creator di YouTube',
      description: 'Scopri Creovly: un kit di strumenti indipendente, riservato ed eseguito al 100% nel tuo browser.',
      heading: 'Informazioni su Creovly',
      subheading: 'Sviluppato per garantire la massima privacy e produttività ai creator.',
    },
    contact: {
      title: 'Contatti — Creovly',
      description: 'Hai suggerimenti, domande o richieste di nuove funzionalità? Contattaci.',
      heading: 'Mettiti in contatto',
      subheading: 'Feedback e richieste della community di creator sono sempre graditi.',
    },
    privacy: {
      title: 'Informativa sulla privacy — Creovly',
      description: 'Architettura rigorosamente client-side: le tue immagini e i tuoi testi non lasciano mai il tuo computer.',
      heading: 'Informativa sulla privacy',
      subheading: 'Massima trasparenza: elaborazione sicura senza memorizzazione remota.',
    },
    terms: {
      title: 'Termini di servizio — Creovly',
      description: 'Condizioni d’uso e tutela della proprietà intellettuale su Creovly.',
      heading: 'Termini di servizio',
      subheading: 'Regole semplici e trasparenti per creare in totale serenità.',
    },
    tools: {
      'logo-background-remover': {
        title: 'Rimuovere sfondo da logo',
        seoTitle: 'Rimuovere sfondo da logo (PNG gratis)',
        description: 'Rimuovi gratuitamente lo sfondo da qualsiasi logo. Converti sfondi a tinta unita in PNG trasparenti ad alta risoluzione per YouTube, miniature e avatar.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['rimuovere sfondo logo', 'togliere sfondo logo gratis', 'rendere logo trasparente', 'png trasparente gratis', 'logo canale youtube'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compressore miniature YouTube',
        seoTitle: 'Compressore miniature YouTube: sotto i 2 MB',
        description: 'Miniatura troppo pesante? Comprimi la tua miniatura YouTube sotto il limite di 2 MB nel browser, confronta prima e dopo e scarica il file più leggero.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['compressore miniature youtube', 'ridurre dimensione miniatura sotto 2mb', 'comprimere immagini youtube', 'ottimizzare miniatura youtube', 'comprimere png gratis'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Ridimensionatore miniature YouTube',
        seoTitle: 'Ridimensionatore miniature YouTube: 1280x720',
        description: "Ridimensiona qualsiasi immagine a una dimensione di miniatura YouTube: 1280x720 o il consigliato 3840x2160, entrambi 16:9. Controlla l’inquadratura e scaricala gratis nel browser.",
        categoryLabel: 'Strumenti miniatura',
        keywords: ['ridimensionare miniatura youtube', 'dimensioni miniatura youtube 1280x720', 'formato copertina youtube', 'scalare immagine youtube', 'banner youtube misure'],
      },
      'youtube-banner-size': {
        title: 'Verifica e ridimensiona banner YouTube',
        seoTitle: 'Dimensioni banner YouTube: 2560x1440 e template',
        description: 'Dimensioni banner YouTube: 2560x1440 px, area sicura 1546x423 px, max 6 MB. Controlla TV, desktop e mobile, ridimensiona l’immagine e scarica il modello gratuito.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['dimensioni banner youtube', 'misure banner youtube tutti i dispositivi', 'template banner youtube', 'banner youtube safe zone cellulare', 'convertitore dimensioni banner youtube'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Controllo zona sicura YouTube Shorts',
        seoTitle: 'Safe Zone YouTube Shorts e template PNG',
        description: 'Verifica la safe zone di YouTube Shorts. Evita sovrapposizioni UI e scarica il template overlay PNG trasparente gratuito a 1080x1920.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['zona sicura youtube shorts', 'safe zone shorts youtube', 'layout video verticale shorts', 'margini ui shorts', 'griglia shorts youtube'],
      },
      'youtube-channel-name-generator': {
        title: 'Generatore di nomi per canali YouTube',
        seoTitle: 'Generatore di nomi per canali YouTube',
        description: 'Trova idee originali per il nome del tuo canale YouTube in gaming, vlog e tecnologia. Generatore gratuito e immediato nel tuo browser.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['generatore di nomi per canali youtube', 'idee nome canale youtube', 'nomi canali youtube gaming', 'trovare nome canale youtube'],
      },
      'youtube-tag-generator': {
        title: 'Generatore di Tag per YouTube',
        seoTitle: 'Generatore di Tag YouTube (SEO)',
        description: 'Genera tag YouTube ottimizzati e cluster di parole chiave nel limite dei 500 caratteri. Strumento SEO gratuito con copia istantanea separata da virgole.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['generatore tag youtube', 'tag per video youtube', 'generatore di tag youtube', 'come mettere tag youtube', 'tag youtube seo'],
      },
      'youtube-description-generator': {
        title: 'Generatore di Descrizioni per YouTube',
        seoTitle: 'Generatore Descrizioni YouTube',
        description: 'Crea descrizioni video YouTube ottimizzate con capitoli con timestamp, hook introduttivi e link social. Generatore gratuito attivo nel tuo browser.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['generatore di descrizioni per youtube', 'template descrizione youtube', 'descrizione video youtube', 'timestamp descrizione youtube'],
      },
      'youtube-title-checker': {
        title: 'Verifica titoli e analizzatore per YouTube',
        seoTitle: 'Verifica titoli: Analizzatore lunghezza e CTR per YouTube',
        description: 'Verifica titoli gratis e analizzatore video per YouTube. Controlla troncamento a 50 caratteri su smartphone, hook e massimizza il CTR.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['verifica titoli', 'title checker', 'analizzatore titoli', 'analizzatore titoli youtube', 'lunghezza ideale titolo youtube', 'contatore caratteri youtube', 'titoli accattivanti youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'Calcolatore di guadagni e ricavi YouTube',
        seoTitle: 'Calcolatore di guadagni e ricavi YouTube',
        description: 'Calcolatore di guadagni e ricavi YouTube: stima i guadagni mensili e annuali da visualizzazioni e un intervallo di RPM, direttamente nel browser.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore entrate youtube', 'quanto paga youtube per visualizzazione', 'guadagni youtube simulatore', 'stimare stipendio youtube', 'soldi per view youtube'],
      },
      'youtube-rpm-calculator': {
        title: 'Calcolatore RPM YouTube',
        seoTitle: 'Calcolatore RPM YouTube: Guadagni per 1.000 views',
        description: 'Calcola l\'RPM di YouTube gratis. Inserisci ricavi e visualizzazioni per scoprire il guadagno netto per 1.000 view e analizzare le entrate del canale.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore rpm youtube', 'calcolo rpm youtube', 'differenza rpm e cpm', 'entrate ogni 1000 visualizzazioni', 'metriche analytics youtube'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calcolatore ore di visualizzazione YouTube',
        seoTitle: 'Calcolatore ore YouTube: Obiettivo 4.000 ore',
        description: 'Calcola le ore di visualizzazione per la monetizzazione YouTube. Stima quante views e settimane mancano per raggiungere il traguardo delle 4.000 ore.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore 4000 ore youtube', 'ore di visualizzazione monetizzazione', 'quante visualizzazioni per 4000 ore', 'programma partner youtube', 'raggiungere 4000 ore'],
      },
      'youtube-monetization-calculator': {
        title: 'Calcolatore di monetizzazione integrata YouTube',
        seoTitle: 'Calcolatore monetizzazione YouTube: Ads e Sponsor',
        description: 'Modella le entrate YouTube da annunci, sponsor e affiliazioni. Sottrai i costi di produzione per calcolare il vero utile netto mensile del creator.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore monetizzazione youtube', 'guadagni sponsorizzazioni youtube', 'modello economico creator', 'utile netto canale youtube', 'quanto guadagna uno youtuber'],
      },
      'youtube-link-generator': {
        title: 'Generatore di link YouTube al minuto esatto e link di iscrizione',
        seoTitle: 'Link YouTube al minuto esatto e link di iscrizione',
        description: 'Crea un link YouTube che parte al secondo esatto (t=) o un link di iscrizione con ?sub_confirmation=1 e codice QR. Gratis, direttamente nel browser.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['link youtube con minuto', 'link youtube minuto preciso', 'condividere video youtube da un minuto', 'link iscrizione youtube', 'generatore link iscrizione youtube'],
      },
      'youtube-profile-picture-resizer': {
        title: 'Dimensioni immagine del profilo YouTube (800 × 800) e ridimensionatore',
        seoTitle: 'Dimensioni immagine profilo YouTube 2026 – 800×800 gratis',
        description: 'Dimensioni dell’immagine del profilo YouTube: 800 × 800 px, 1:1, fino a 4 MB, mostrata in un cerchio. Ritaglia, controlla il cerchio in modalità chiara e scura ed esporta.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['dimensioni immagine profilo youtube', 'dimensioni foto profilo youtube', 'icona canale youtube dimensioni', 'immagine profilo youtube 800x800', 'ridimensionare foto profilo youtube'],
      },
      'youtube-thumbnail-downloader': {
        title: 'Scarica miniatura YouTube in HD e risoluzione massima',
        seoTitle: 'Scarica miniatura YouTube – HD e risoluzione massima',
        description: 'Scarica la miniatura di qualsiasi video YouTube in risoluzione massima (1280 × 720), SD, HQ e dimensioni minori. Incolla un link video, Shorts o youtu.be. Gratis.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['scaricare miniatura youtube', 'scarica miniatura youtube', 'miniatura youtube hd', 'scaricare copertina video youtube', 'scaricare thumbnail youtube'],
      },
      'youtube-thumbnail-tester': {
        title: 'Tester e anteprima miniature YouTube',
        seoTitle: 'Anteprima miniatura YouTube – home, ricerca e mobile',
        description: 'Guarda la tua miniatura YouTube nella home, nella ricerca, nei suggeriti e su mobile, in modalità chiara e scura. Confronta due versioni. Gratis, non si carica nulla.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['anteprima miniatura youtube', 'testare miniatura youtube', 'tester miniature', 'confrontare miniature youtube', 'come appare la miniatura su youtube'],
      },
      'youtube-timestamp-generator': {
        title: 'Generatore di capitoli e timestamp YouTube',
        seoTitle: 'Capitoli YouTube – Generatore di timestamp gratis',
        description: 'Crea i capitoli YouTube dai tuoi appunti: controlla le regole 0:00, 3 capitoli e 10 secondi, vedi la durata di ogni capitolo e copia un elenco pulito. Gratis.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['capitoli youtube', 'timestamp youtube', 'come mettere i capitoli su youtube', 'generatore capitoli youtube', 'capitoli youtube non compaiono'],
      },
      'words-to-minutes-calculator': {
        title: 'Calcolatore parole al minuto e tempo di lettura',
        seoTitle: 'Calcolo tempo di lettura – Parole al minuto per copioni',
        description: 'Calcola quanto dura il tuo copione letto ad alta voce. Incolla il testo o inserisci le parole, scegli un ritmo e scopri quante parole servono per un video di 5 o 10 minuti.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['calcolo tempo di lettura', 'parole al minuto', 'quante parole al minuto si parla', 'durata di un discorso', 'calcolatore tempo di lettura'],
      },
      'engagement-rate-calculator': {
        title: 'Calcolo engagement rate per YouTube, Instagram e TikTok',
        seoTitle: 'Calcolo engagement rate – YouTube, Instagram, TikTok',
        description: 'Calcolo engagement rate gratuito per YouTube, Instagram e TikTok: per visualizzazioni, follower o copertura, con la formula in chiaro e la media fino a 20 post.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolo engagement rate', 'calcolare engagement rate instagram', 'engagement rate youtube', 'calcolatore engagement', 'formula engagement rate'],
      },
    },
  },
};

/**
 * Returns the localized tool description for a locale, falling back to the
 * English text from the tool registry when no translation exists.
 */
export function getToolDescription(locale: Locale, toolId: string, fallback: string): string {
  return translations[locale]?.tools?.[toolId]?.description || fallback;
}

/**
 * Short spec chips shown on tool cards, per locale and tool id.
 */
export const toolFeatureTags: Record<Locale, Record<string, string>> = {
  en: {
    'logo-background-remover': 'Transparent PNG • Canvas',
    'youtube-thumbnail-compressor': '< 2MB Payload • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • All Devices Safe Area',
    'youtube-shorts-safe-zone': '9:16 Safe Zone • Mask',
    'youtube-channel-name-generator': 'AI Formulas • Niche Styles',
    'youtube-tag-generator': '500-Char Limit • Smart Clusters',
    'youtube-description-generator': '5,000-Char Limit • Smart Templates',
    'youtube-title-checker': 'Mobile ~50 Chars • Truncation',
    'youtube-revenue-calculator': 'Dynamic RPM • Modeler',
    'youtube-rpm-calculator': 'Net Earnings / 1K Views',
    'youtube-watch-hours-calculator': '4,000 Hr Goal • Pace',
    'youtube-monetization-calculator': 'Multi-Stream Revenue',
    'youtube-link-generator': 'Timestamp • Subscribe • QR',
    'youtube-profile-picture-resizer': '800×800 • Circle Preview',
    'youtube-thumbnail-downloader': 'Max res 1280×720 • JPG',
    'youtube-thumbnail-tester': 'Home • Search • Mobile • A/B',
    'youtube-timestamp-generator': '0:00 • 3+ chapters • 10 s rule',
    'words-to-minutes-calculator': 'Words → minutes • Target length',
    'engagement-rate-calculator': 'Views • Followers • Reach',
  },
  es: {
    'logo-background-remover': 'PNG transparente • Canvas',
    'youtube-thumbnail-compressor': 'Menos de 2 MB • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • Área segura en todos los dispositivos',
    'youtube-shorts-safe-zone': 'Zona segura 9:16 • Máscara',
    'youtube-channel-name-generator': 'Fórmulas IA • Estilos por nicho',
    'youtube-tag-generator': 'Límite de 500 caracteres • Grupos inteligentes',
    'youtube-description-generator': 'Límite de 5.000 caracteres • Plantillas inteligentes',
    'youtube-title-checker': 'Móvil ~50 caracteres • Truncado',
    'youtube-revenue-calculator': 'RPM dinámico • Simulador',
    'youtube-rpm-calculator': 'Ingresos netos / 1000 vistas',
    'youtube-watch-hours-calculator': 'Meta de 4.000 h • Ritmo',
    'youtube-monetization-calculator': 'Ingresos multifuente',
    'youtube-link-generator': 'Minuto exacto • Suscripción • QR',
    'youtube-profile-picture-resizer': '800×800 • Vista circular',
    'youtube-thumbnail-downloader': 'Máx. 1280×720 • JPG',
    'youtube-thumbnail-tester': 'Inicio • Búsqueda • Móvil • A/B',
    'youtube-timestamp-generator': '0:00 • 3+ capítulos • regla de 10 s',
    'words-to-minutes-calculator': 'Palabras → minutos • Duración objetivo',
    'engagement-rate-calculator': 'Vistas • Seguidores • Alcance',
  },
  ja: {
    'logo-background-remover': '透過PNG • キャンバス',
    'youtube-thumbnail-compressor': '2MB未満 • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • 全デバイス対応セーフエリア',
    'youtube-shorts-safe-zone': '9:16セーフゾーン • マスク',
    'youtube-channel-name-generator': 'AI式 • ジャンル別スタイル',
    'youtube-tag-generator': '500文字制限 • スマートクラスター',
    'youtube-description-generator': '5,000文字制限 • スマートテンプレート',
    'youtube-title-checker': 'モバイル約50文字 • 省略表示',
    'youtube-revenue-calculator': '可変RPM • シミュレーター',
    'youtube-rpm-calculator': '純収益 / 1,000回再生',
    'youtube-watch-hours-calculator': '4,000時間目標 • ペース',
    'youtube-monetization-calculator': '複数収益源の合算',
    'youtube-link-generator': '時間指定 • 登録リンク • QR',
    'youtube-profile-picture-resizer': '800×800 • 円形プレビュー',
    'youtube-thumbnail-downloader': '最大1280×720 • JPG',
    'youtube-thumbnail-tester': 'ホーム • 検索 • スマホ • A/B',
    'youtube-timestamp-generator': '0:00 • 3つ以上 • 10秒ルール',
    'words-to-minutes-calculator': '文字数 → 分 • 目標の長さ',
    'engagement-rate-calculator': '再生数 • フォロワー • リーチ',
  },
  fr: {
    'logo-background-remover': 'PNG transparent • Canvas',
    'youtube-thumbnail-compressor': 'Moins de 2 Mo • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • Zone de sécurité tous écrans',
    'youtube-shorts-safe-zone': 'Zone sûre 9:16 • Masque',
    'youtube-channel-name-generator': 'Formules IA • Styles par niche',
    'youtube-tag-generator': 'Limite de 500 caractères • Groupes intelligents',
    'youtube-description-generator': 'Limite de 5 000 caractères • Modèles intelligents',
    'youtube-title-checker': 'Mobile ~50 caractères • Troncature',
    'youtube-revenue-calculator': 'RPM dynamique • Simulateur',
    'youtube-rpm-calculator': 'Revenus nets / 1 000 vues',
    'youtube-watch-hours-calculator': 'Objectif 4 000 h • Rythme',
    'youtube-monetization-calculator': 'Revenus multi-sources',
    'youtube-link-generator': 'Timestamp • Abonnement • QR',
    'youtube-profile-picture-resizer': '800×800 • Aperçu en cercle',
    'youtube-thumbnail-downloader': 'Max 1280×720 • JPG',
    'youtube-thumbnail-tester': 'Accueil • Recherche • Mobile • A/B',
    'youtube-timestamp-generator': '0:00 • 3+ chapitres • règle des 10 s',
    'words-to-minutes-calculator': 'Mots → minutes • Durée visée',
    'engagement-rate-calculator': 'Vues • Abonnés • Portée',
  },
  de: {
    'logo-background-remover': 'Transparentes PNG • Canvas',
    'youtube-thumbnail-compressor': 'Unter 2 MB • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • Sicherer Bereich für alle Geräte',
    'youtube-shorts-safe-zone': '9:16-Safe-Zone • Maske',
    'youtube-channel-name-generator': 'KI-Formeln • Nischen-Stile',
    'youtube-tag-generator': '500-Zeichen-Limit • Smarte Cluster',
    'youtube-description-generator': '5.000-Zeichen-Limit • Smarte Vorlagen',
    'youtube-title-checker': 'Mobil ~50 Zeichen • Kürzung',
    'youtube-revenue-calculator': 'Dynamischer RPM • Modellierer',
    'youtube-rpm-calculator': 'Nettoeinnahmen / 1.000 Aufrufe',
    'youtube-watch-hours-calculator': '4.000-Std.-Ziel • Tempo',
    'youtube-monetization-calculator': 'Einnahmen aus mehreren Quellen',
    'youtube-link-generator': 'Zeitstempel • Abo-Link • QR',
    'youtube-profile-picture-resizer': '800×800 • Kreisvorschau',
    'youtube-thumbnail-downloader': 'Max. 1280×720 • JPG',
    'youtube-thumbnail-tester': 'Start • Suche • Handy • A/B',
    'youtube-timestamp-generator': '0:00 • 3+ Kapitel • 10-s-Regel',
    'words-to-minutes-calculator': 'Wörter → Minuten • Ziellänge',
    'engagement-rate-calculator': 'Aufrufe • Follower • Reichweite',
  },
  pt: {
    'logo-background-remover': 'PNG transparente • Canvas',
    'youtube-thumbnail-compressor': 'Menos de 2 MB • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • Área segura em todos os dispositivos',
    'youtube-shorts-safe-zone': 'Zona segura 9:16 • Máscara',
    'youtube-channel-name-generator': 'Fórmulas com IA • Estilos por nicho',
    'youtube-tag-generator': 'Limite de 500 caracteres • Clusters inteligentes',
    'youtube-description-generator': 'Limite de 5.000 caracteres • Modelos inteligentes',
    'youtube-title-checker': 'Celular ~50 caracteres • Truncamento',
    'youtube-revenue-calculator': 'RPM dinâmico • Simulador',
    'youtube-rpm-calculator': 'Ganhos líquidos / 1.000 views',
    'youtube-watch-hours-calculator': 'Meta de 4.000 h • Ritmo',
    'youtube-monetization-calculator': 'Receita de várias fontes',
    'youtube-link-generator': 'Minuto exato • Inscrição • QR',
    'youtube-profile-picture-resizer': '800×800 • Prévia em círculo',
    'youtube-thumbnail-downloader': 'Máx. 1280×720 • JPG',
    'youtube-thumbnail-tester': 'Início • Busca • Celular • A/B',
    'youtube-timestamp-generator': '0:00 • 3+ capítulos • regra de 10 s',
    'words-to-minutes-calculator': 'Palavras → minutos • Duração desejada',
    'engagement-rate-calculator': 'Views • Seguidores • Alcance',
  },
  ko: {
    'logo-background-remover': '투명 PNG • 캔버스',
    'youtube-thumbnail-compressor': '2MB 미만 • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • 전 기기 안전 영역',
    'youtube-shorts-safe-zone': '9:16 안전 영역 • 마스크',
    'youtube-channel-name-generator': 'AI 공식 • 분야별 스타일',
    'youtube-tag-generator': '500자 제한 • 스마트 클러스터',
    'youtube-description-generator': '5,000자 제한 • 스마트 템플릿',
    'youtube-title-checker': '모바일 약 50자 • 말줄임',
    'youtube-revenue-calculator': '동적 RPM • 시뮬레이터',
    'youtube-rpm-calculator': '순수익 / 1,000회 조회',
    'youtube-watch-hours-calculator': '4,000시간 목표 • 페이스',
    'youtube-monetization-calculator': '다중 수익원 합산',
    'youtube-link-generator': '시간 지정 • 구독 • QR',
    'youtube-profile-picture-resizer': '800×800 • 원형 미리보기',
    'youtube-thumbnail-downloader': '최대 1280×720 • JPG',
    'youtube-thumbnail-tester': '홈 • 검색 • 모바일 • A/B',
    'youtube-timestamp-generator': '0:00 • 3개 이상 • 10초 규칙',
    'words-to-minutes-calculator': '글자수 → 분 • 목표 길이',
    'engagement-rate-calculator': '조회수 • 팔로워 • 도달',
  },
  it: {
    'logo-background-remover': 'PNG trasparente • Canvas',
    'youtube-thumbnail-compressor': 'Meno di 2 MB • JPEG/WebP',
    'youtube-thumbnail-resizer': '1280×720 HD • 16:9',
    'youtube-banner-size': '2560×1440 • Area sicura su tutti i dispositivi',
    'youtube-shorts-safe-zone': 'Zona sicura 9:16 • Maschera',
    'youtube-channel-name-generator': 'Formule IA • Stili per nicchia',
    'youtube-tag-generator': 'Limite di 500 caratteri • Cluster intelligenti',
    'youtube-description-generator': 'Limite di 5.000 caratteri • Modelli intelligenti',
    'youtube-title-checker': 'Mobile ~50 caratteri • Troncamento',
    'youtube-revenue-calculator': 'RPM dinamico • Simulatore',
    'youtube-rpm-calculator': 'Guadagni netti / 1.000 visualizzazioni',
    'youtube-watch-hours-calculator': 'Obiettivo 4.000 ore • Ritmo',
    'youtube-monetization-calculator': 'Ricavi multi-fonte',
    'youtube-link-generator': 'Minuto esatto • Iscrizione • QR',
    'youtube-profile-picture-resizer': '800×800 • Anteprima cerchio',
    'youtube-thumbnail-downloader': 'Max 1280×720 • JPG',
    'youtube-thumbnail-tester': 'Home • Ricerca • Mobile • A/B',
    'youtube-timestamp-generator': '0:00 • 3+ capitoli • regola dei 10 s',
    'words-to-minutes-calculator': 'Parole → minuti • Durata desiderata',
    'engagement-rate-calculator': 'Visualizzazioni • Follower • Copertura',
  },
};

export function getToolFeatureTag(locale: Locale, toolId: string): string | undefined {
  return toolFeatureTags[locale]?.[toolId] ?? toolFeatureTags.en[toolId];
}
