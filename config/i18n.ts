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
        title: 'Logo Background Remover',
        description: 'Remove solid-color backgrounds from logos online for free. Preview the result and download a transparent PNG with Creovly\'s browser-based logo remover.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['logo background remover', 'remove background from logo', 'transparent png maker', 'logo cutout free', 'youtube channel logo tool'],
      },
      'youtube-thumbnail-compressor': {
        title: 'YouTube Thumbnail Compressor',
        description: 'Compress YouTube thumbnails online for free. Reduce JPEG, PNG and WebP file sizes in your browser, compare results and download optimized images.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail compressor', 'compress thumbnail under 2mb', 'reduce thumbnail file size', 'youtube image compressor', 'free thumbnail optimizer'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTube Thumbnail Resizer',
        description: 'Resize YouTube thumbnails online for free. Adjust images to 1280x720 or custom dimensions, preview framing and download ready-to-use files.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube thumbnail resizer', 'youtube thumbnail size', 'youtube thumbnail dimensions', 'youtube thumbnail aspect ratio', 'youtube banner resizer', '1280x720 thumbnail resize', 'youtube cover photo resizer', 'youtube image dimension tool'],
      },
      'youtube-shorts-safe-zone': {
        title: 'YouTube Shorts Safe Zone Checker',
        description: 'Check YouTube Shorts safe zones before publishing. Preview overlay guides, keep key content clear of buttons and export an annotated safe zone guide.',
        categoryLabel: 'Thumbnail Tools',
        keywords: ['youtube shorts safe zone', 'youtube shorts safe zone template', 'shorts overlay checker', 'shorts safe area template', 'vertical video framing tool', 'shorts ui margins'],
      },
      'youtube-title-checker': {
        title: 'YouTube Title Checker & Analyzer',
        description: 'Free YouTube title checker. Analyze title length, punctuation, keyword placement and mobile truncation before you publish your next video.',
        categoryLabel: 'Title Tools',
        keywords: ['youtube title checker', 'youtube title analyzer', 'youtube title tester', 'youtube title length checker', 'youtube title length tester', 'video title truncation analyzer', 'catchy youtube titles', 'youtube title character counter'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube Revenue Calculator',
        seoTitle: 'YouTube Money Calculator: Views to Revenue',
        description: 'Free YouTube money calculator. Enter monthly views and an RPM range to estimate your monthly and yearly YouTube revenue in your browser.',
        categoryLabel: 'Money & Growth',
        keywords: ['youtube revenue calculator', 'youtube money calculator', 'youtube video money calculator', 'youtube views to money calculator', 'youtube ad revenue calculator', 'how much youtube pays', 'video view income estimator', 'creator revenue modeler'],
      },
      'youtube-rpm-calculator': {
        title: 'YouTube RPM Calculator',
        description: 'Calculate YouTube RPM for free. Enter your total revenue and video views to find earnings per 1,000 views and better understand channel performance.',
        categoryLabel: 'Money & Growth',
        keywords: ['youtube rpm calculator', 'revenue per mille calculator', 'youtube cpm vs rpm', 'creator rpm calculation', 'youtube analytics metrics'],
      },
      'youtube-watch-hours-calculator': {
        title: 'YouTube Watch Hours Calculator',
        description: 'Calculate YouTube watch hours and estimate views needed to reach your goal. Track remaining hours using average view duration and viewing pace.',
        categoryLabel: 'Money & Growth',
        keywords: ['youtube watch hours calculator', '4000 watch hours tracker', 'youtube monetization hours', 'watch time progress calculator', 'youtube partner program goal'],
      },
      'youtube-monetization-calculator': {
        title: 'YouTube Monetization Calculator',
        description: 'Free YouTube monetization calculator. Estimate channel income from ads, sponsorships and affiliates, then subtract expenses for monthly earnings.',
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
        title: 'Eliminador de fondo de logo',
        description: 'Elimina el fondo de color sólido de tu logo online y gratis. Previsualiza el resultado y descarga un PNG transparente con el eliminador de fondos de Creovly.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['quitar fondo a logo', 'eliminar fondo logo gratis', 'hacer logo transparente', 'fondo transparente png', 'logo canal youtube'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compresor de miniaturas de YouTube',
        description: 'Comprime miniaturas de YouTube online y gratis. Reduce el peso de JPEG, PNG y WebP en tu navegador, compara resultados y descarga imágenes optimizadas.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['compresor miniaturas youtube', 'comprimir miniatura menos 2mb', 'reducir tamano imagen youtube', 'optimizar imagen youtube', 'compresor png youtube'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionador de miniaturas de YouTube',
        description: 'Cambia el tamaño de miniaturas de YouTube online y gratis. Ajusta imágenes a 1280x720 o medidas personalizadas, revisa el encuadre y descarga archivos listos.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['redimensionar miniatura youtube', 'medidas miniatura youtube 1280x720', 'tamano portada youtube', 'escalar imagen youtube', 'banner youtube medidas'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Verificador de zona segura de YouTube Shorts',
        description: 'Comprueba las zonas seguras de YouTube Shorts antes de publicar. Revisa guías de posición, evita que los botones tapen tu contenido y exporta una guía anotada.',
        categoryLabel: 'Herramientas de miniaturas',
        keywords: ['zona segura youtube shorts', 'plantilla shorts youtube', 'margen seguro video vertical', 'shorts safe zone', 'guia encuadre shorts'],
      },
      'youtube-title-checker': {
        title: 'Analizador y comprobador de títulos de YouTube',
        description: 'Analiza títulos de vídeos de YouTube gratis. Revisa longitud, puntuación, palabras clave y saltos de línea en móviles antes de publicar tu próximo vídeo.',
        categoryLabel: 'Herramientas de títulos',
        keywords: ['analizador titulos youtube', 'longitud titulo youtube', 'comprobar titulo video', 'titulos llamativos youtube', 'contador caracteres youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculadora de ingresos de YouTube',
        description: 'Calcula tus ganancias de YouTube con una calculadora de ingresos gratuita. Ingresa visitas mensuales y rangos de RPM para estimar ingresos mensuales y anuales.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora ingresos youtube', 'cuanto paga youtube por visitas', 'ganancias youtube estimador', 'calculadora dinero youtube', 'simulador ingresos canal'],
      },
      'youtube-rpm-calculator': {
        title: 'Calculadora de RPM de YouTube',
        description: 'Calcula el RPM de YouTube gratis. Ingresa tus ingresos totales y visualizaciones para conocer tus ganancias por cada 1.000 visitas y optimizar tu canal.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora rpm youtube', 'calcular rpm youtube', 'diferencia rpm y cpm', 'ingresos por mil visitas', 'metricas analytics youtube'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calculadora de horas de reproducción de YouTube',
        description: 'Calcula tus horas de reproducción en YouTube y las visitas que necesitas para monetizar. Monitorea las horas restantes según tu duración media y ritmo.',
        categoryLabel: 'Dinero y crecimiento',
        keywords: ['calculadora horas reproduccion youtube', '4000 horas youtube', 'conseguir 4000 horas de visualizacion', 'monetizar canal youtube', 'tiempo de reproduccion meta'],
      },
      'youtube-monetization-calculator': {
        title: 'Calculadora de monetización integral de YouTube',
        description: 'Estima ingresos de YouTube por anuncios, patrocinios, afiliados y más fuentes. Descuenta tus gastos de producción para calcular tu ganancia neta mensual.',
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
        title: 'ロゴ背景削除ツール',
        description: 'ロゴの単色背景をオンラインで無料透過。処理結果をプレビューし、ブラウザ上で透明なPNG画像をすぐにダウンロードできます。',
        categoryLabel: 'サムネイルツール',
        keywords: ['ロゴ 背景 透過', 'ロゴ 背景 切り抜き 無料', '透過PNG 作成', 'YouTube チャンネル アイコン 透過', '画像 背景 削除'],
      },
      'youtube-thumbnail-compressor': {
        title: 'YouTubeサムネイル圧縮ツール',
        description: 'YouTubeサムネイルをオンラインで無料圧縮。ブラウザ上でJPEG、PNG、WebPの容量を削減し、比較確認しながら最適化画像を保存できます。',
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube サムネイル 圧縮', 'サムネ 容量 減らす 2MB以下', 'サムネイル 画質 落とさず 圧縮', 'YouTube 画像 圧縮 無料', 'サムネイル PNG 圧縮'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTubeサムネイルリサイズツール',
        description: 'YouTubeサムネイルをオンラインで無料リサイズ。画像を1280×720やカスタム寸法に調整し、構図をプレビューしてすぐに使える画像をダウンロード。',
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube サムネイル サイズ 変更', 'サムネイル 1280 720 リサイズ', 'YouTube バナー サイズ 調整', 'サムネ 比率 16:9', 'チャンネルアート リサイズ'],
      },
      'youtube-shorts-safe-zone': {
        title: 'YouTube Shortsセーフゾーンチェッカー',
        description: '公開前にYouTube Shortsのセーフゾーンを確認。配置ガイドをプレビューし、UIの被りを防いで重要コンテンツを守る注釈付きガイドを出力できます。',
        categoryLabel: 'サムネイルツール',
        keywords: ['YouTube ショート セーフゾーン', 'Shorts UI 被り 確認', 'ショート動画 テロップ 安全領域', '縦型動画 セーフエリア', 'Shorts レイアウト ガイド'],
      },
      'youtube-title-checker': {
        title: 'YouTubeタイトルチェッカー＆アナライザー',
        description: 'YouTube動画のタイトルを無料でチェック。次の動画を公開する前に、文字数、記号、キーワード配置、スマホでの改行位置を的確に分析できます。',
        categoryLabel: 'タイトルツール',
        keywords: ['YouTube タイトル 文字数 チェッカー', '動画 タイトル 切り捨て 確認', 'YouTube タイトル 付け方', 'クリック率 上がる タイトル', 'タイトル プレビュー'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube収益計算ツール',
        description: '無料の収益計算ツールでYouTubeの広告収入を試算。月間再生回数と想定RPMを入力するだけで、月収および年収のクリエイター収益をシミュレーション。',
        categoryLabel: '収益と成長',
        keywords: ['YouTube 収益 計算', '再生回数 収益 計算 ツール', 'YouTube 月収 シミュレーション', 'YouTube いくら 稼げる', '動画 広告 収入 計算'],
      },
      'youtube-rpm-calculator': {
        title: 'YouTube RPM計算ツール',
        description: 'YouTubeのRPMを無料で計算。総収益と動画再生回数を入力して1,000回再生あたりの純収益を算出し、チャンネルのパフォーマンスを正しく把握しましょう。',
        categoryLabel: '収益と成長',
        keywords: ['YouTube RPM 計算', 'RPM CPM 違い YouTube', '千回再生 収益 計算', 'YouTube アナリティクス 指標', '広告単価 計算'],
      },
      'youtube-watch-hours-calculator': {
        title: 'YouTube総再生時間計算ツール',
        description: 'YouTubeの総再生時間を計算し、目標達成に必要な再生回数を試算。平均視聴維持時間と公開ペースから、4,000時間までの残り時間を正確に把握できます。',
        categoryLabel: '収益と成長',
        keywords: ['YouTube 再生時間 4000時間 計算', '収益化 条件 達成 シミュレーター', '総再生時間 あと何回', 'YouTube パートナープログラム', '再生時間 増やす 目標'],
      },
      'youtube-monetization-calculator': {
        title: 'YouTube総合収益化シミュレーター',
        description: '広告、企業案件、アフィリエイトなどの総合的なYouTube収入を試算。制作経費を差し引いて、クリエイターとしての月間純利益を精密にモデル化。',
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
        title: 'Suppresseur d’arrière-plan de logo',
        description: 'Supprimez gratuitement le fond uni de vos logos en ligne. Prévisualisez le résultat et téléchargez un PNG transparent avec l’outil sécurisé de Creovly.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['enlever fond logo', 'supprimer arriere plan logo gratuit', 'logo transparent png', 'detourer logo youtube', 'fond transparent logo'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compresseur de miniatures YouTube',
        description: 'Compressez gratuitement vos miniatures YouTube en ligne. Réduisez le poids de vos JPEG, PNG et WebP dans votre navigateur et téléchargez l’image optimisée.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['compresseur miniature youtube', 'reduire taille miniature youtube 2mo', 'compresser image youtube', 'optimiser miniature youtube', 'compresseur png gratuit'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionneur de miniatures YouTube',
        description: 'Redimensionnez gratuitement vos miniatures YouTube en ligne. Ajustez au format 1280x720 ou personnalisé, vérifiez le cadrage et téléchargez vos fichiers prêts.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['redimensionner miniature youtube', 'taille miniature youtube 1280x720', 'dimensions banniere youtube', 'format image youtube', 'redimensionner photo profil'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Vérificateur de zone sûre YouTube Shorts',
        description: 'Vérifiez la zone sûre de vos YouTube Shorts avant publication. Prévisualisez les repères, évitez les superpositions d’icônes et exportez un guide annoté.',
        categoryLabel: 'Outils de miniatures',
        keywords: ['zone sure youtube shorts', 'gabarit shorts youtube', 'safe zone video verticale', 'shorts overlay checker', 'marges ui shorts'],
      },
      'youtube-title-checker': {
        title: 'Vérificateur et analyseur de titres YouTube',
        description: 'Vérifiez gratuitement vos titres de vidéos YouTube. Analysez longueur, ponctuation, mots-clés et troncature sur mobile avant de publier votre prochaine vidéo.',
        categoryLabel: 'Outils de titres',
        keywords: ['analyseur titre youtube', 'longueur titre youtube', 'verificateur titre video', 'titre accrocheur youtube', 'compteur caracteres youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculateur de revenus YouTube',
        description: 'Estimez vos revenus YouTube avec un calculateur gratuit. Saisissez vos vues mensuelles et votre RPM pour simuler vos revenus de créateur mensuels et annuels.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calculateur revenus youtube', 'combien rapporte youtube', 'salaire youtubeur simulateur', 'estimer gains youtube', 'argent par vue youtube'],
      },
      'youtube-rpm-calculator': {
        title: 'Calculateur de RPM YouTube',
        description: 'Calculez gratuitement votre RPM YouTube. Entrez vos revenus totaux et vos vues pour obtenir vos gains pour 1 000 vues et mieux évaluer votre chaîne.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calculateur rpm youtube', 'calculer rpm youtube', 'difference rpm et cpm', 'revenu pour mille vues', 'analytics youtube revenus'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calculateur d’heures de visionnage YouTube',
        description: 'Calculez vos heures de visionnage YouTube et les vues nécessaires pour monétiser. Suivez vos heures restantes selon votre durée moyenne de visionnage.',
        categoryLabel: 'Argent et croissance',
        keywords: ['calculateur 4000 heures youtube', 'heures de visionnage monétisation', 'combien de vues pour 4000 heures', 'programme partenaire youtube', 'atteindre 4000 heures'],
      },
      'youtube-monetization-calculator': {
        title: 'Calculateur global de monétisation YouTube',
        description: 'Estimez vos revenus YouTube issus des pubs, sponsors et affiliés. Déduisez vos dépenses pour modéliser précisément vos gains mensuels nets de créateur.',
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
        title: 'Logo-Hintergrund-Entferner',
        description: 'Einfarbige Logo-Hintergründe online kostenlos entfernen. Ergebnis direkt in der Vorschau prüfen und transparentes PNG im Browser mit Creovly herunterladen.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['logo hintergrund entfernen', 'logo freistellen kostenlos', 'transparentes png erstellen', 'youtube kanal logo freistellen', 'bild hintergrund entfernen'],
      },
      'youtube-thumbnail-compressor': {
        title: 'YouTube-Thumbnail-Komprimierer',
        description: 'YouTube-Thumbnails online kostenlos komprimieren. Reduziere JPEG-, PNG- und WebP-Größen im Browser, vergleiche Ergebnisse und lade optimierte Bilder herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail komprimieren', 'thumbnail unter 2mb verkleinern', 'youtube bild dateigroesse reduzieren', 'thumbnail optimizer kostenlos', 'png bild komprimieren'],
      },
      'youtube-thumbnail-resizer': {
        title: 'YouTube-Thumbnail-Größenänderung',
        description: 'YouTube-Thumbnails online kostenlos anpassen. Skaliere Bilder auf 1280x720 oder Wunschmaße, prüfe das Framing und lade einsatzbereite Dateien direkt herunter.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube thumbnail groesse aendern', 'thumbnail 1280x720 format', 'youtube banner massen', 'youtube bild skalieren', 'kanalbild zuschneiden'],
      },
      'youtube-shorts-safe-zone': {
        title: 'YouTube Shorts Safe-Zone-Prüfer',
        description: 'Prüfe YouTube Shorts Safe-Zones vor dem Upload. Nutze Platzierungs-Guides, schütze Inhalte vor UI-Overlays und exportiere eine übersichtliche Vorlage.',
        categoryLabel: 'Thumbnail-Tools',
        keywords: ['youtube shorts safe zone', 'shorts sicherer bereich vorlage', 'vertikales video framing', 'shorts ui abstaende', 'shorts schablone overlay'],
      },
      'youtube-title-checker': {
        title: 'YouTube-Titel-Checker & Analyzer',
        description: 'YouTube-Videotitel kostenlos prüfen. Analysiere Titellänge, Satzzeichen, Keyword-Platzierung und Smartphone-Textumbrüche vor dem Upload deines nächsten Videos.',
        categoryLabel: 'Titel-Tools',
        keywords: ['youtube titel laenge pruefen', 'video titel zeichenzaehler', 'youtube titel optimieren', 'klickstarke titel erstellen', 'titel analyzer youtube'],
      },
      'youtube-revenue-calculator': {
        title: 'YouTube-Einnahmenrechner',
        description: 'YouTube-Einnahmen mit einem kostenlosen Rechner schätzen. Gib Monats-Aufrufe und RPM-Spannen ein, um dein mögliches Monats- und Jahreseinkommen zu berechnen.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['youtube einnahmen rechner', 'wieviel zahlt youtube pro aufruf', 'youtube geld verdienen rechner', 'kanal umsatz simulieren', 'creator einnahmen schaetzen'],
      },
      'youtube-rpm-calculator': {
        title: 'YouTube-RPM-Rechner',
        description: 'Berechne deinen YouTube-RPM kostenlos. Trage Gesamteinnahmen und Aufrufe ein, um den Verdienst pro 1.000 Views zu ermitteln und deinen Kanal besser zu steuern.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['youtube rpm rechner', 'rpm vs cpm youtube', 'umsatz pro 1000 aufrufe berechnen', 'analytics creator kennzahlen', 'youtube rpm berechnung'],
      },
      'youtube-watch-hours-calculator': {
        title: 'YouTube-Wiedergabestunden-Rechner',
        description: 'YouTube-Wiedergabestunden berechnen und nötige Aufrufe für dein Ziel schätzen. Verfolge verbleibende Stunden anhand durchschnittlicher Wiedergabedauer.',
        categoryLabel: 'Finanzen & Wachstum',
        keywords: ['youtube 4000 stunden rechner', 'wiedergabezeit monetarisierung berechnen', 'wie viele views fuer 4000 stunden', 'youtube partnerprogramm watchtime', 'monetarisierung ziel'],
      },
      'youtube-monetization-calculator': {
        title: 'YouTube-Gesamteinnahmen-Simulator',
        description: 'YouTube-Einnahmen aus Werbung, Sponsoring und Affiliates berechnen. Ziehe Betriebskosten ab, um deinen möglichen monatlichen Nettoverdienst zu modellieren.',
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
        title: 'Removedor de fundo de logotipo',
        description: 'Remova o fundo de cor sólida do seu logotipo online e grátis. Veja a prévia e baixe um PNG transparente com o removedor de logos no navegador da Creovly.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['remover fundo de logo', 'tirar fundo do logo gratis', 'fazer logo transparente', 'png transparente gratis', 'logo canal youtube'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compressor de miniaturas do YouTube',
        description: 'Comprima miniaturas do YouTube online e grátis. Reduza o tamanho de arquivos JPEG, PNG e WebP no navegador, compare resultados e baixe imagens otimizadas.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['compressor miniatura youtube', 'diminuir tamanho thumb youtube 2mb', 'comprimir imagem youtube', 'otimizar miniatura youtube', 'comprimir png gratis'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Redimensionador de miniaturas do YouTube',
        description: 'Redimensione miniaturas do YouTube online e grátis. Ajuste para 1280x720 ou medidas personalizadas, veja o enquadramento e baixe arquivos prontos para usar.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['redimensionar miniatura youtube', 'tamanho miniatura youtube 1280x720', 'dimensoes banner youtube', 'mudar tamanho foto canal', 'escala imagem youtube'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Verificador de zona segura do YouTube Shorts',
        description: 'Verifique as zonas seguras do YouTube Shorts antes de publicar. Veja guias de enquadramento, proteja o conteúdo de sobreposições e exporte um guia anotado.',
        categoryLabel: 'Ferramentas de miniatura',
        keywords: ['zona segura youtube shorts', 'safe zone shorts youtube', 'gabarito shorts video vertical', 'margem segura shorts', 'overlay shorts checker'],
      },
      'youtube-title-checker': {
        title: 'Verificador e analisador de títulos do YouTube',
        description: 'Analise títulos de vídeos do YouTube grátis. Avalie tamanho, pontuação, palavras-chave e quebras de linha no celular antes de publicar seu próximo vídeo.',
        categoryLabel: 'Ferramentas de títulos',
        keywords: ['analisador titulos youtube', 'tamanho ideal titulo youtube', 'contador caracteres titulo youtube', 'titulos chamativos youtube', 'testar titulo video'],
      },
      'youtube-revenue-calculator': {
        title: 'Calculadora de receita do YouTube',
        description: 'Estime seus ganhos no YouTube com uma calculadora de receita gratuita. Insira visualizações mensais e faixas de RPM para projetar sua renda mensal e anual.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora receita youtube', 'quanto o youtube paga por visualizacao', 'ganhos youtube simulador', 'renda canal youtube calcular', 'calculadora dinheiro youtube'],
      },
      'youtube-rpm-calculator': {
        title: 'Calculadora de RPM do YouTube',
        description: 'Calcule o RPM do YouTube grátis. Insira sua receita total e visualizações para descobrir ganhos a cada 1.000 views e entender o desempenho do seu canal.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora rpm youtube', 'calcular rpm youtube', 'diferenca rpm e cpm', 'ganhos por mil visualizacoes', 'metricas youtube analytics'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calculadora de horas de exibição do YouTube',
        description: 'Calcule suas horas de exibição no YouTube e as views para alcançar sua meta. Acompanhe as horas restantes usando a duração média de visualização e o ritmo.',
        categoryLabel: 'Dinheiro e crescimento',
        keywords: ['calculadora 4000 horas youtube', 'horas de exibicao monetizacao', 'quantas views para 4000 horas', 'programa de parcerias youtube', 'meta monetizar canal'],
      },
      'youtube-monetization-calculator': {
        title: 'Calculadora de monetização integrada do YouTube',
        description: 'Estime a renda no YouTube com anúncios, parcerias, afiliados e outras fontes. Subtraia suas despesas para simular seu ganho líquido mensal de criador.',
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
        title: '로고 배경 제거기',
        description: '로고의 단색 배경을 온라인에서 무료로 제거하세요. 미리보기로 확인하고 Creovly 브라우저 기반 도구로 투명한 PNG 파일을 바로 다운로드하세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['로고 배경 제거', '로고 누끼 따기 무료', '투명 png 만들기', '유튜브 채널 로고 배경', '이미지 배경 지우기'],
      },
      'youtube-thumbnail-compressor': {
        title: '유튜브 썸네일 압축기',
        description: 'YouTube 썸네일을 온라인에서 무료로 압축하세요. 브라우저에서 JPEG, PNG, WebP 용량을 줄이고 결과를 비교한 뒤 최적화된 이미지를 다운로드하세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 압축', '썸네일 2mb 이하 줄이기', '유튜브 이미지 용량 줄이기', '썸네일 화질 손실없이 압축', 'png 무료 압축'],
      },
      'youtube-thumbnail-resizer': {
        title: '유튜브 썸네일 리사이저',
        description: 'YouTube 썸네일 크기를 온라인에서 무료로 조절하세요. 1280x720 또는 사용자 지정 해상도로 맞추고 구도를 미리 확인한 뒤 바로 사용 가능한 파일을 받으세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 썸네일 크기 조절', '썸네일 1280 720 사이즈', '유튜브 배너 규격', '유튜브 채널아트 리사이즈', '유튜브 비율 16 9'],
      },
      'youtube-shorts-safe-zone': {
        title: '유튜브 쇼츠 안전 구역 검사기',
        description: '게시 전 YouTube Shorts 안전 구역을 확인하세요. 화면 배치 가이드를 확인하여 중요 텍스트가 UI에 가려지지 않도록 보호하고 가이드 이미지를 내보내세요.',
        categoryLabel: '썸네일 도구',
        keywords: ['유튜브 쇼츠 세이프존', '쇼츠 자막 안전영역', '쇼츠 오버레이 가림 확인', '세로 영상 비율 템플릿', '쇼츠 ui 규격'],
      },
      'youtube-title-checker': {
        title: '유튜브 제목 검사기 및 분석기',
        description: 'YouTube 영상 제목을 무료로 점검하세요. 다음 영상을 게시하기 전에 제목 글자 수, 문장 부호, 키워드 배치, 모바일 줄바꿈 현상을 미리 분석할 수 있습니다.',
        categoryLabel: '제목 도구',
        keywords: ['유튜브 제목 글자수 검사기', '유튜브 제목 자르기 확인', '클릭률 높은 유튜브 제목', '유튜브 영상 제목 추천', '제목 바이트 계산'],
      },
      'youtube-revenue-calculator': {
        title: '유튜브 수익 계산기',
        description: '무료 수익 계산기로 YouTube 예상 수입을 산출하세요. 월간 조회수와 RPM 범위를 입력하여 잠재적인 월간 및 연간 크리에이터 수익을 시뮬레이션할 수 있습니다.',
        categoryLabel: '수익 및 성장',
        keywords: ['유튜브 수익 계산기', '조회수당 수익 계산', '유튜브 조회수 10만 수익', '유튜브 돈 버는 법 계산', '유튜버 수입 시뮬레이터'],
      },
      'youtube-rpm-calculator': {
        title: '유튜브 RPM 계산기',
        description: 'YouTube RPM을 무료로 계산하세요. 총정산 수익과 조회수를 입력하여 1,000회 조회수당 실제 순수익을 확인하고 채널 성과를 더욱 정밀하게 분석하세요.',
        categoryLabel: '수익 및 성장',
        keywords: ['유튜브 rpm 계산기', 'cpm rpm 차이', '1000회 조회수당 수익', '유튜브 분석 지표 계산', '유튜브 광고 단가'],
      },
      'youtube-watch-hours-calculator': {
        title: '유튜브 시청 시간 계산기',
        description: 'YouTube 시청 시간을 계산하고 목표 달성에 필요한 조회수를 확인하세요. 평균 시청 지속 시간과 업로드 페이스를 바탕으로 남은 4,000시간을 추적할 수 있습니다.',
        categoryLabel: '수익 및 성장',
        keywords: ['유튜브 4000시간 계산기', '수익창출 조건 달성', '시청시간 계산', '유튜브 파트너 프로그램 자격', '4000시간 달성 팁'],
      },
      'youtube-monetization-calculator': {
        title: '유튜브 종합 수익화 시뮬레이터',
        description: '광고, 스폰서십, 제휴 마케팅 등 다각화된 YouTube 수익을 추산하세요. 제작 비용을 제외하여 크리에이터의 잠재적인 월 순이익을 모델링할 수 있습니다.',
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
        title: 'Rimozione sfondo logo',
        description: 'Rimuovi gratuitamente lo sfondo a tinta unita dai loghi online. Visualizza l\'anteprima e scarica un PNG trasparente con lo strumento via browser di Creovly.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['rimuovere sfondo logo', 'togliere sfondo logo gratis', 'rendere logo trasparente', 'png trasparente gratis', 'logo canale youtube'],
      },
      'youtube-thumbnail-compressor': {
        title: 'Compressore miniature YouTube',
        description: 'Comprimi le miniature di YouTube online gratis. Riduci le dimensioni di JPEG, PNG e WebP nel browser, confronta i risultati e scarica le immagini ottimizzate.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['compressore miniature youtube', 'ridurre dimensione miniatura sotto 2mb', 'comprimere immagini youtube', 'ottimizzare miniatura youtube', 'comprimere png gratis'],
      },
      'youtube-thumbnail-resizer': {
        title: 'Ridimensionatore miniature YouTube',
        description: 'Ridimensiona le miniature di YouTube online gratis. Adatta immagini a 1280x720 o formati su misura, controlla l\'inquadratura e scarica file pronti all\'uso.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['ridimensionare miniatura youtube', 'dimensioni miniatura youtube 1280x720', 'formato copertina youtube', 'scalare immagine youtube', 'banner youtube misure'],
      },
      'youtube-shorts-safe-zone': {
        title: 'Controllo zona sicura YouTube Shorts',
        description: 'Verifica le zone sicure di YouTube Shorts prima di pubblicare. Visualizza le guide, evita che le icone coprano i contenuti ed esporta una guida con annotazioni.',
        categoryLabel: 'Strumenti miniatura',
        keywords: ['zona sicura youtube shorts', 'safe zone shorts youtube', 'layout video verticale shorts', 'margini ui shorts', 'griglia shorts youtube'],
      },
      'youtube-title-checker': {
        title: 'Analizzatore e verifica titoli YouTube',
        description: 'Controlla gratis i titoli dei video di YouTube. Analizza lunghezza, punteggiatura, parole chiave e troncamento su smartphone prima di pubblicare il tuo video.',
        categoryLabel: 'Strumenti titoli',
        keywords: ['analizzatore titoli youtube', 'lunghezza ideale titolo youtube', 'contatore caratteri youtube', 'titoli accattivanti youtube', 'anteprima titolo video'],
      },
      'youtube-revenue-calculator': {
        title: 'Calcolatore entrate YouTube',
        description: 'Stima i guadagni di YouTube con un calcolatore di entrate gratuito. Inserisci visualizzazioni e RPM per stimare i tuoi ricavi mensili e annuali da creator.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore entrate youtube', 'quanto paga youtube per visualizzazione', 'guadagni youtube simulatore', 'stimare stipendio youtube', 'soldi per view youtube'],
      },
      'youtube-rpm-calculator': {
        title: 'Calcolatore RPM YouTube',
        description: 'Calcola il tuo RPM di YouTube gratis. Inserisci ricavi totali e visualizzazioni per conoscere il guadagno ogni 1.000 view e valutare la resa del tuo canale.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore rpm youtube', 'calcolo rpm youtube', 'differenza rpm e cpm', 'entrate ogni 1000 visualizzazioni', 'metriche analytics youtube'],
      },
      'youtube-watch-hours-calculator': {
        title: 'Calcolatore ore di visualizzazione YouTube',
        description: 'Calcola le ore di visualizzazione su YouTube e le view necessarie per il tuo obiettivo. Monitora le ore mancanti in base a durata media e ritmo di crescita.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore 4000 ore youtube', 'ore di visualizzazione monetizzazione', 'quante visualizzazioni per 4000 ore', 'programma partner youtube', 'raggiungere 4000 ore'],
      },
      'youtube-monetization-calculator': {
        title: 'Calcolatore di monetizzazione integrata YouTube',
        description: 'Stima i guadagni di YouTube da annunci, sponsor, affiliazioni e altre fonti. Sottrai i costi di produzione per calcolare il tuo potenziale utile netto mensile.',
        categoryLabel: 'Finanze e crescita',
        keywords: ['calcolatore monetizzazione youtube', 'guadagni sponsorizzazioni youtube', 'modello economico creator', 'utile netto canale youtube', 'quanto guadagna uno youtuber'],
      },
    },
  },
};

