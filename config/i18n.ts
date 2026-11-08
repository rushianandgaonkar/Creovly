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
      description: 'Prepare your next YouTube upload with an interactive checklist that saves progress in your browser.',
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
        seoTitle: 'Free YouTube Thumbnail Compressor (Under 2 MB)',
        description: 'Free YouTube thumbnail compressor. Compress JPEG, PNG and WebP thumbnails under 2 MB in your browser, compare results and download optimized images.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail compressor', 'compress thumbnail under 2mb', 'reduce thumbnail file size', 'youtube image compressor', 'free thumbnail optimizer'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTube Thumbnail Resizer',
        seoTitle: 'Free YouTube Thumbnail Resizer: 1280x720',
        description: 'Free YouTube thumbnail resizer and size converter. Adjust images to 1280x720 or custom sizes, preview framing, and download ready-to-use files.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail resizer', 'youtube thumbnail size converter', 'youtube thumbnail size', 'youtube thumbnail dimensions', 'youtube thumbnail aspect ratio', 'youtube banner resizer', '1280x720 thumbnail resize', 'youtube cover photo resizer', 'youtube image dimension tool'],
      },
      'youtube-banner-size': {
        title: 'YouTube Banner Size Checker & Resizer',
        seoTitle: 'YouTube Banner Size: 2560x1440 Template',
        description: 'Check YouTube banner size and safe areas for TV, desktop, and mobile. Resize images to 2560x1440 and download free transparent banner overlay templates.',
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
        description: 'Generate catchy YouTube channel names for gaming, vlogs, tech, and business. Free AI-inspired channel name generator running 100% in your browser.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube channel name generator', 'ai youtube channel name generator', 'channel name ideas', 'youtube name maker', 'cool youtube names', 'gaming channel names', 'creative youtube channel name generator'],
      },
      'youtube-tag-generator': {
        title: 'YouTube Tag Generator',
        seoTitle: 'Free YouTube Tag Generator (SEO & Clusters)',
        description: 'Generate optimized YouTube tags and keyword clusters within the 500-character limit. Free AI-powered tag generator with instant comma-separated copy.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube tag generator', 'ai youtube tag generator', 'youtube tags generator', 'youtube tags for views', 'generate tags for youtube', 'youtube seo tags', 'youtube tag extractor and generator'],
      },
      'youtube-description-generator': {
        title: 'YouTube Description Generator',
        seoTitle: 'Free YouTube Description Generator',
        description: 'Generate optimized YouTube video descriptions with timestamps, above-the-fold hooks, and social links. Free AI-powered video description generator.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube description generator', 'ai youtube description generator', 'youtube video description generator', 'youtube description template', 'free youtube description generator', 'youtube description maker'],
      },
      'youtube-title-checker': {
        title: 'YouTube Title Checker & Analyzer',
        seoTitle: 'Free YouTube Title Checker: Length and Truncation',
        description: 'Free YouTube title checker. Analyze title length, punctuation, keyword placement and mobile truncation before you publish your next video.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube title checker', 'youtube title analyzer', 'youtube title tester', 'youtube title length checker', 'youtube title length tester', 'video title truncation analyzer', 'catchy youtube titles', 'youtube title character counter'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube Money Calculator',
        seoTitle: 'YouTube Money Calculator: Views to Revenue',
        description: 'YouTube money calculator: estimate monthly and yearly YouTube earnings from monthly views and RPM assumptions in your browser.',
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
        seoTitle: 'Compresor de miniaturas de YouTube (<2 MB)',
        description: 'Comprime miniaturas de YouTube online y gratis. Reduce el peso de JPEG, PNG y WebP en tu navegador, compara resultados y descarga imágenes optimizadas.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['compresor miniaturas youtube', 'comprimir miniatura menos 2mb', 'reducir tamano imagen youtube', 'optimizar imagen youtube', 'compresor png youtube'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionador de miniaturas de YouTube',
        seoTitle: 'Redimensionar miniaturas de YouTube: 1280x720',
        description: 'Redimensiona miniaturas de YouTube gratis a 1280x720 o medidas personalizadas. Revisa el encuadre móvil y descarga archivos listos para publicar.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['redimensionar miniatura youtube', 'convertidor tamano miniatura youtube', 'medidas miniatura youtube 1280x720', 'tamano portada youtube', 'escalar imagen youtube', 'banner youtube medidas'],
      },
      'youtube-banner-size': {
        title: 'Verificador y redimensionador de banner de YouTube',
        seoTitle: 'Tamaño banner YouTube: Redimensionar y plantilla',
        description: 'Verifica el tamaño de banner de YouTube y zonas seguras para móvil y PC. Redimensiona a 2560x1440 y descarga gratis la plantilla PNG transparente.',
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
        keywords: ['generador de nombres para canales de youtube', 'generador de nombres youtube ia', 'ideas de nombres para youtube', 'nombres para canales de gaming', 'creador de nombres youtube gratis'],
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
        keywords: ['generador de descripciones de youtube', 'generador de descripcion youtube ia', 'plantilla descripcion youtube', 'generador de descripciones para videos de youtube', 'crear descripcion youtube'],
      },
      'youtube-title-checker': {
        title: 'Analizador y comprobador de títulos de YouTube',
        seoTitle: 'Comprobador de títulos de YouTube: Longitud y CTR',
        description: 'Analiza títulos de vídeos de YouTube gratis. Revisa longitud, puntuación, palabras clave y saltos de línea en móviles antes de publicar tu próximo vídeo.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['analizador titulos youtube', 'longitud titulo youtube', 'comprobar titulo video', 'titulos llamativos youtube', 'contador caracteres youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculadora de dinero de YouTube',
        seoTitle: 'Calculadora de dinero de YouTube: Ingresos',
        description: 'Calculadora de dinero de YouTube: estima ingresos mensuales y anuales a partir de visitas mensuales y supuestos de RPM en tu navegador.',
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
        seoTitle: 'YouTubeサムネイル無料圧縮ツール (2MB以下)',
        description: 'YouTubeサムネイルをオンラインで無料圧縮。ブラウザ上でJPEG、PNG、WebPの容量を削減し、比較確認しながら最適化画像を保存できます。',
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube サムネイル 圧縮', 'サムネ 容量 減らす 2MB以下', 'サムネイル 画質 落とさず 圧縮', 'YouTube 画像 圧縮 無料', 'サムネイル PNG 圧縮'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTubeサムネイルリサイズツール',
        seoTitle: 'YouTubeサムネイルリサイズツール: 1280x720',
        description: 'YouTubeサムネイルリサイズ＆サイズ変換ツール。画像を公式の1280×720やカスタム寸法に調整し、構図を確認して無料ダウンロード。',
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube サムネイル サイズ 変更', 'YouTube サムネイル サイズ 変換', 'サムネイル 1280 720 リサイズ', 'YouTube バナー サイズ 調整', 'サムネ 比率 16:9', 'チャンネルアート リサイズ'],
      },
      'youtube-banner-size': {
        title: 'YouTubeバナーサイズ確認・リサイズツール',
        seoTitle: 'YouTubeバナーサイズ: 2560x1440リサイズ＆テンプレート',
        description: 'YouTubeバナーサイズ規格とスマホ・PC対応セーフゾーンを確認。画像を2560x1440に自動リサイズし、無料の透過PNGテンプレートをダウンロード。',
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
        keywords: ['youtubeチャンネル名ジェネレーター', 'youtubeチャンネル名決め方', 'youtube名前ジェネレーターai', 'チャンネル名おすすめ', 'youtube名前自動生成'],
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
        title: 'YouTubeタイトルチェッカー＆アナライザー',
        seoTitle: 'YouTube動画タイトルチェッカー: 文字数と省略確認',
        description: 'YouTube動画のタイトルを無料でチェック。次の動画を公開する前に、文字数、記号、キーワード配置、スマホでの改行位置を的確に分析できます。',
        categoryLabel: 'タイトルツール',
        keywords: ['YouTube タイトル 文字数 チェッカー', '動画 タイトル 切り捨て 確認', 'YouTube タイトル 付け方', 'クリック率 上がる タイトル', 'タイトル プレビュー'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube収益・給料計算ツール',
        seoTitle: 'YouTube動画収益・給料計算ツール: 再生回数から試算',
        description: 'YouTube動画収益計算ツール：月間再生回数と想定RPMから月収・年収をブラウザ上で試算。100%安全なプライベートシミュレーター。',
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
        seoTitle: 'Compresseur de miniatures YouTube gratuit (<2 Mo)',
        description: 'Compressez gratuitement vos miniatures YouTube en ligne. Réduisez le poids de vos JPEG, PNG et WebP dans votre navigateur et téléchargez l’image optimisée.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['compresseur miniature youtube', 'reduire taille miniature youtube 2mo', 'compresser image youtube', 'optimiser miniature youtube', 'compresseur png gratuit'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionneur de miniatures YouTube',
        seoTitle: 'Redimensionner miniature YouTube: 1280x720',
        description: 'Redimensionnez vos miniatures YouTube en 1280x720 ou dimensions sur mesure. Vérifiez le cadrage et téléchargez vos images prêtes pour YouTube.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['redimensionner miniature youtube', 'convertisseur taille miniature youtube', 'taille miniature youtube 1280x720', 'dimensions banniere youtube', 'format image youtube', 'redimensionner photo profil'],
      },
      'youtube-banner-size': {
        title: 'Vérificateur et redimensionneur de bannière YouTube',
        seoTitle: 'Taille bannière YouTube: 2560x1440 et template',
        description: 'Vérifiez la taille de bannière YouTube et sa zone de sécurité. Redimensionnez en 2560x1440 et téléchargez notre template PNG transparent gratuit.',
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
        keywords: ['generateur de nom de chaine youtube', 'generateur nom youtube ia', 'idees nom chaine youtube', 'nom chaine youtube gaming', 'trouver nom youtube gratuit'],
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
        keywords: ['générateur de description youtube', 'generateur description youtube ia', 'modele description youtube', 'description video youtube', 'chapitres youtube description'],
      },
      'youtube-title-checker': {
        title: 'Vérificateur et analyseur de titres YouTube',
        seoTitle: 'Testeur de titre YouTube: Longueur et troncature',
        description: 'Vérifiez vos titres YouTube gratuitement. Analysez longueur, ponctuation, mots-clés et troncature sur mobile avant de publier votre vidéo.',
        categoryLabel: 'Outils de titres',
        keywords: ['analyseur titre youtube', 'longueur titre youtube', 'verificateur titre video', 'titre accrocheur youtube', 'compteur caracteres youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculateur d\'argent YouTube',
        seoTitle: 'Calculateur d\'argent YouTube: Vues en revenus',
        description: 'Calculateur d\'argent YouTube : estimez vos revenus mensuels et annuels à partir de vos vues et de votre RPM, directement dans votre navigateur.',
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
        seoTitle: 'Kostenloser YouTube-Thumbnail-Komprimierer (<2 MB)',
        description: 'YouTube-Thumbnails unter 2 MB kostenlos komprimieren. Reduziere Dateigrößen im Browser ohne Qualitätsverlust und lade optimierte Bilder herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail komprimieren', 'thumbnail unter 2mb verkleinern', 'youtube bild dateigroesse reduzieren', 'thumbnail optimizer kostenlos', 'png bild komprimieren'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTube-Thumbnail-Größenänderung',
        seoTitle: 'YouTube-Thumbnail-Größe ändern: 1280x720',
        description: 'YouTube-Thumbnails kostenlos auf 1280x720 anpassen. Prüfe den Bildausschnitt für mobile Geräte und lade fertige Dateien direkt herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail groesse aendern', 'thumbnail konverter groesse', 'thumbnail 1280x720 format', 'youtube banner massen', 'youtube bild skalieren', 'kanalbild zuschneiden'],
      },
      'youtube-banner-size': {
        title: 'YouTube-Banner-Größenprüfer & Resizer',
        seoTitle: 'YouTube-Banner-Größe: 2560x1440 Vorlage',
        description: 'Prüfe YouTube-Banner-Größe und Safe Zones für alle Geräte. Passe Bilder auf 2560x1440 an und lade die kostenlose transparente PNG-Vorlage herunter.',
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
        keywords: ['youtube kanalnamen generator', 'youtube namen generator ki', 'kanalname finden ideen', 'gaming kanal name generator', 'youtube name erstellen kostenlos'],
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
        description: 'Erstelle optimierte YouTube-Videobeschreibungen mit Zeitstempeln, Hooks und Social-Links. Kostenloser KI-Beschreibungs-Generator ohne Anmeldung.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube beschreibung generator', 'youtube videobeschreibung generator', 'youtube beschreibung vorlage', 'youtube beschreibung erstellen', 'youtube timestamps beschreibung'],
      },
      'youtube-title-checker': {
        title: 'YouTube-Titel-Checker & Analyzer',
        seoTitle: 'YouTube-Titel-Checker: Zeichenlänge & Optimierung',
        description: 'YouTube-Videotitel kostenlos prüfen. Analysiere Titellänge, Satzzeichen, Keywords und Smartphone-Textumbrüche vor dem Upload des nächsten Videos.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube titel laenge pruefen', 'video titel zeichenzaehler', 'youtube titel optimieren', 'klickstarke titel erstellen', 'titel analyzer youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube-Geldrechner',
        seoTitle: 'YouTube-Geldrechner: Aufrufe in Einnahmen',
        description: 'YouTube-Geldrechner: Schätze deine monatlichen und jährlichen Einnahmen aus Aufrufen und RPM-Werten direkt in deinem Browser.',
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
        seoTitle: 'Compressor de miniaturas do YouTube (<2 MB)',
        description: 'Comprima miniaturas do YouTube online e grátis. Reduza o tamanho de arquivos JPEG, PNG e WebP no navegador, compare resultados e baixe imagens otimizadas.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['compressor miniatura youtube', 'diminuir tamanho thumb youtube 2mb', 'comprimir imagem youtube', 'otimizar miniatura youtube', 'comprimir png gratis'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionador de miniaturas do YouTube',
        seoTitle: 'Redimensionar miniaturas do YouTube: 1280x720',
        description: 'Redimensionador e conversor de tamanho de miniatura do YouTube grátis. Ajuste imagens para 1280x720 ou dimensões personalizadas e baixe prontas.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['redimensionar miniatura youtube', 'conversor tamanho miniatura youtube', 'tamanho miniatura youtube 1280x720', 'dimensoes banner youtube', 'mudar tamanho foto canal', 'escala imagem youtube'],
      },
      'youtube-banner-size': {
        title: 'Verificador e redimensionador de banner do YouTube',
        seoTitle: 'Tamanho de banner do YouTube: 2560x1440 e molde',
        description: 'Confira o tamanho do banner do YouTube e a área segura para telemóveis e PC. Redimensione para 2560x1440 e baixe o modelo PNG transparente grátis.',
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
        keywords: ['gerador de nomes para canais do youtube', 'gerador de nomes youtube ia', 'ideias de nomes para canal youtube', 'nomes para canal de jogos', 'criar nome para youtube gratis'],
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
        keywords: ['gerador de descricao para youtube', 'gerador de descricao youtube ia', 'modelo de descricao youtube', 'como fazer descricao youtube', 'timestamps descricao youtube'],
      },
      'youtube-title-checker': {
        title: 'Verificador e analisador de títulos do YouTube',
        seoTitle: 'Verificador de títulos do YouTube: Tamanho e CTR',
        description: 'Analise títulos de vídeos do YouTube grátis. Avalie tamanho, pontuação, palavras-chave e quebras de linha no celular antes de publicar seu próximo vídeo.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['analisador titulos youtube', 'tamanho ideal titulo youtube', 'contador caracteres titulo youtube', 'titulos chamativos youtube', 'testar titulo video'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculadora de dinheiro do YouTube',
        seoTitle: 'Calculadora de dinheiro do YouTube: Visualizações',
        description: 'Calculadora de dinheiro do YouTube: estime seus ganhos mensais e anuais a partir de visualizações e estimativas de RPM no navegador.',
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
        seoTitle: '유튜브 썸네일 무료 압축기 (2MB 이하 용량 줄이기)',
        description: 'YouTube 썸네일을 2MB 이하로 무료 압축하세요. 브라우저에서 화질 저하 없이 JPEG, PNG, WebP 용량을 줄이고 최적화된 이미지를 즉시 다운로드할 수 있습니다.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 압축', '썸네일 2mb 이하 줄이기', '유튜브 이미지 용량 줄이기', '썸네일 화질 손실없이 압축', 'png 무료 압축'],
      },
      'youtube-thumbnail-resizer': {
        title: '유튜브 썸네일 리사이저',
        seoTitle: '유튜브 썸네일 리사이저: 1280x720 크기 조절',
        description: 'YouTube 썸네일 크기를 1280x720 및 16:9 비율로 무료 조절하세요. 모바일 화면 구도를 미리 확인하고 클릭률을 높이는 완성형 썸네일을 다운로드하세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 크기 조절', '썸네일 1280 720 사이즈', '유튜브 배너 규격', '유튜브 채널아트 리사이즈', '유튜브 비율 16 9'],
      },
      'youtube-banner-size': {
        title: '유튜브 배너 사이즈 확인기 및 리사이저',
        seoTitle: '유튜브 배너 사이즈: 2560x1440 크기 조절 & 템플릿',
        description: 'YouTube 배너 규격과 모바일·PC 세이프존을 실시간 확인하세요. 2560x1440 해상도로 자동 조절하고 무료 투명 PNG 가이드 오버레이 템플릿을 다운로드하세요.',
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
        keywords: ['유튜브 채널 이름 생성기', '유튜브 이름 추천', 'ai 유튜브 채널 이름', '유튜브 채널명 짓기', '유튜브 닉네임 생성기'],
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
        title: '유튜브 제목 검사기 및 분석기',
        seoTitle: '유튜브 제목 검사기: 글자수 제한 및 모바일 말줄임',
        description: 'YouTube 동영상 제목을 무료로 분석하세요. 글자 수 제한, 모바일 말줄임 현상, 클릭률(CTR) 최적화 요소를 미리 점검하고 완벽한 제목을 완성하세요.',
        categoryLabel: '제목 도구',
        keywords: ['유튜브 제목 글자수 검사기', '유튜브 제목 자르기 확인', '클릭률 높은 유튜브 제목', '유튜브 영상 제목 추천', '제목 바이트 계산'],
      },
      'youtube-revenue-calculator': {
        title: '유튜브 수익·돈 계산기',
        seoTitle: '유튜브 수익·돈 계산기: 조회수별 예상 수입',
        description: '조회수별 예상 YouTube 수익을 계산하세요. 일간 및 월간 조회수와 예상 RPM을 기반으로 채널 잠재 수입을 시뮬레이션하고 현실적인 수익 목표를 세우세요.',
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
        seoTitle: 'Compressore miniature YouTube gratis (<2 MB)',
        description: 'Comprimi miniature YouTube sotto i 2 MB online gratis. Riduci il peso di JPG, PNG e WebP senza perdita di qualità e scarica l\'immagine ottimizzata.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['compressore miniature youtube', 'ridurre dimensione miniatura sotto 2mb', 'comprimere immagini youtube', 'ottimizzare miniatura youtube', 'comprimere png gratis'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Ridimensionatore miniature YouTube',
        seoTitle: 'Ridimensiona miniature YouTube: 1280x720',
        description: 'Ridimensiona le miniature YouTube a 1280x720 e proporzioni 16:9. Verifica l\'anteprima su mobile per massimizzare il CTR del tuo prossimo video.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['ridimensionare miniatura youtube', 'dimensioni miniatura youtube 1280x720', 'formato copertina youtube', 'scalare immagine youtube', 'banner youtube misure'],
      },
      'youtube-banner-size': {
        title: 'Verifica e ridimensiona banner YouTube',
        seoTitle: 'Dimensioni banner YouTube: 2560x1440 e template',
        description: 'Verifica le dimensioni del banner YouTube e la safe zone mobile. Ridimensiona a 2560x1440 ed esporta gratuitamente il template PNG overlay trasparente.',
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
        keywords: ['generatore di nomi per canali youtube', 'generatore nomi youtube ia', 'idee nome canale youtube', 'nomi canali youtube gaming', 'trovare nome canale youtube'],
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
        keywords: ['generatore di descrizioni per youtube', 'generatore descrizione youtube ia', 'template descrizione youtube', 'descrizione video youtube', 'timestamp descrizione youtube'],
      },
      'youtube-title-checker': {
        title: 'Analizzatore e verifica titoli YouTube',
        seoTitle: 'Verifica titoli YouTube: Lunghezza e CTR',
        description: 'Analizza i titoli YouTube gratis. Controlla limite caratteri, troncamento su dispositivi mobili e massimizza il CTR prima di pubblicare.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['analizzatore titoli youtube', 'lunghezza ideale titolo youtube', 'contatore caratteri youtube', 'titoli accattivanti youtube', 'anteprima titolo video'],
      },
      'youtube-revenue-calculator': {
        title: 'Calcolatore di denaro YouTube',
        seoTitle: 'Calcolatore di denaro YouTube: Visualizzazioni',
        description: 'Calcola quanto paga YouTube in base alle visualizzazioni. Stima i guadagni mensili e annuali del tuo canale inserendo views e RPM stimato con facilità.',
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
    },
  },
};

