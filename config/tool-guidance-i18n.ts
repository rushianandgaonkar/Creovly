import type { Locale } from '@/config/i18n';

export interface PlaybookStep {
  title: string;
  body: string;
}

export interface PlaybookI18n {
  badge: string;
  heading: string;
  subheading: string;
  stepPrefix: string;
  tools: Record<string, PlaybookStep[]>;
  demonstration: {
    badge: string;
    inspectionHeading: string;
    titleHeading: string;
    calcHeading: string;
    inspectionSubheading: string;
    titleSubheading: string;
    calcSubheading: string;
    beforeLabel: string;
    afterLabel: string;
    downloadOriginal: string;
    downloadProcessed: string;
    beforeDraft: string;
    afterDraft: string;
  };
}

export const toolPlaybookTranslations: Record<Locale, PlaybookI18n> = {
  en: {
    badge: 'Execution Playbook',
    heading: 'How to use this tool',
    subheading: 'Standard workflow recommendations for consistent publish quality',
    stepPrefix: 'STEP',
    demonstration: {
      badge: 'Demonstration // Sample Inputs',
      inspectionHeading: 'Before and After Inspection',
      titleHeading: 'Title Draft Revision Example',
      calcHeading: 'Worked Calculation Scenario',
      inspectionSubheading: 'A fictional example processed with this tool. Your image and settings will produce different results.',
      titleSubheading: 'An editorial example checked with the same title analysis. This is a wording choice, not an automatic rewrite or a performance prediction.',
      calcSubheading: 'These are demonstration assumptions, not channel data or expected earnings. Results use the same formulas as the calculator above.',
      beforeLabel: 'Before',
      afterLabel: 'After',
      downloadOriginal: 'Download original',
      downloadProcessed: 'Download processed',
      beforeDraft: 'Before: Original Draft',
      afterDraft: 'After: Polished Draft',
    },
    tools: {
      'logo-background-remover': [
        { title: 'Choose your logo', body: 'Select a still JPEG, PNG, or WebP with a flat background. The starting color comes from its top-left pixel.' },
        { title: 'Remove the background', body: 'Confirm the color and adjust tolerance. Select Remove background to process the border-connected areas.' },
        { title: 'Inspect and download', body: 'Check edges on light, dark, and checkerboard previews, then download your transparent PNG.' },
      ],
      'youtube-thumbnail-resizer': [
        { title: 'Choose your canvas', body: 'Start with a thumbnail, banner, profile picture or watermark preset, then choose a still JPEG, PNG or WebP image.' },
        { title: 'Set the framing', body: 'Adjust cropping or padding. Preview-only banner and circle guides help you position important content; custom sizes remain available.' },
        { title: 'Resize and review', body: 'Select Resize artwork and inspect the actual output. Download it, then check the crop in YouTube’s upload preview. Compress afterward if needed.' },
      ],
      'youtube-thumbnail-compressor': [
        { title: 'Select your image', body: 'Select 1–10 still JPEG, PNG, or WebP thumbnails, up to 20 MB each and 50 MB total. Files are processed one at a time.' },
        { title: 'Choose a size target', body: 'Set the size target per image and a shared output format. Advanced settings limit JPEG or WebP quality.' },
        { title: 'Compare and download', body: 'Compress the batch, review each completed output, and download individually or as a ZIP. Failed or cancelled files are excluded from the ZIP.' },
      ],
      'youtube-shorts-safe-zone': [
        { title: 'Choose a still frame', body: 'Export a representative frame from your video, then select its JPEG, PNG, or WebP image.' },
        { title: 'Plan your margins', body: 'Adjust reserved edges and optionally place a content box over important text or a subject. Review any overlap.' },
        { title: 'Export the guide', body: 'Create the annotated PNG for reference. Keep your clean source for publishing and check the actual Shorts player.' },
      ],
      'youtube-title-checker': [
        { title: 'Enter a draft', body: 'Paste your title and optionally add an exact topic phrase you want to check.' },
        { title: 'Review the feedback', body: 'Check character units, whitespace, punctuation, and phrase placement. Explore wrapping at different widths.' },
        { title: 'Refine the wording', body: 'Edit the title yourself, then copy it when ready. Check accuracy and final acceptance in YouTube Studio.' },
      ],
      'youtube-revenue-calculator': [
        { title: 'Enter monthly views', body: 'Use your own views or a planning assumption. For Shorts, use the engaged-view basis.' },
        { title: 'Set your RPM range', body: 'Supply lower and upper RPM assumptions after the platform share. No niche benchmark is inserted.' },
        { title: 'Calculate a scenario', body: 'Compare monthly and annual amounts, then copy the assumptions and formulas if useful.' },
      ],
      'youtube-rpm-calculator': [
        { title: 'Choose one period', body: 'Gather creator revenue and views covering the same dates and revenue scope.' },
        { title: 'Enter matching values', body: 'Enter revenue in USD and the corresponding views. Use engaged views for Shorts.' },
        { title: 'Calculate your RPM', body: 'Review revenue per 1,000 views and copy the calculation. This does not infer advertiser CPM.' },
      ],
      'youtube-watch-hours-calculator': [
        { title: 'Set your starting point', body: 'Enter current hours and your chosen goal. These values do not confirm monetization eligibility.' },
        { title: 'Describe your pace', body: 'Enter additional monthly hours and average view duration in minutes.' },
        { title: 'Review the scenario', body: 'Calculate hours remaining, additional views, and a constant-pace timeline. Expiring hours are not simulated.' },
      ],
      'youtube-monetization-calculator': [
        { title: 'Add platform assumptions', body: 'Enter monthly views and your platform RPM after the platform share.' },
        { title: 'Add income and costs', body: 'Include deals, fees, affiliates, other income, and costs. Avoid counting revenue already included in RPM twice.' },
        { title: 'Review the totals', body: 'Calculate monthly income and the amount after costs, before taxes. Annual results repeat the monthly scenario.' },
      ],
      'youtube-banner-size': [
        { title: 'Upload your banner', body: 'Select your channel banner artwork in JPEG, PNG, or WebP format up to 20 MB.' },
        { title: 'Calibrate safe zones', body: 'Position critical text, logos, and avatars inside the central 1546 × 423 safe area visible across mobile and desktop.' },
        { title: 'Export 2560 × 1440 banner', body: 'Download the calibrated 2560 × 1440 banner image and test your channel art upload in YouTube Studio.' },
      ],
      'youtube-channel-name-generator': [
        { title: 'Input keywords & niche', body: 'Enter your primary channel topics, keywords, or creator niche (e.g. tech, gaming, cooking, finance).' },
        { title: 'Choose naming archetype', body: 'Select your desired brand style (modern, punchy, classic, or minimalist) and word count.' },
        { title: 'Test and claim your handle', body: 'Review generated name ideas, check matching @handle availability in YouTube Studio, and save your favorites.' },
      ],
      'youtube-tag-generator': [
        { title: 'Enter video topic or title', body: 'Type your primary video topic, working title, or focus keyword into the generator.' },
        { title: 'Select tags & clusters', body: 'Review generated primary, variant, long-tail, and broad tags. Toggle individual tags to fit under 500 characters.' },
        { title: 'Copy & paste to Studio', body: 'Click Copy All to export your formatted, comma-separated tag list and paste directly into YouTube Studio.' },
      ],
      'youtube-description-generator': [
        { title: 'Choose format & enter details', body: 'Select your video style (tutorial, review, vlog, gaming, or podcast) and enter your title, summary hook, and key points.' },
        { title: 'Add chapters & resource links', body: 'Set up timeline timestamps (00:00 Intro, etc.), social media handles, affiliate links, and community channels.' },
        { title: 'Review & copy to Studio', body: 'Inspect the above-the-fold snippet and 5,000-character count, then click Copy Description to paste directly into YouTube Studio.' },
      ],
      'youtube-link-generator': [
        { title: 'Timestamp · Paste the video link', body: 'Copy the URL from the address bar or the Share button. Watch, youtu.be, Shorts, live, embed and mobile links all work.' },
        { title: 'Timestamp · Enter the start time', body: 'Type 90, 1:30, 1:02:03 or 1m30s. Check the parsed time, and add more timestamps if you need a list.' },
        { title: 'Timestamp · Copy and test', body: 'Copy the short link, full link or embed code, then open the link once to confirm it starts where you expect.' },
        { title: 'Subscribe · Enter your channel', body: 'Paste your channel URL or type your @handle. Channel IDs (UC…) and older /c/ and /user/ URLs also work.' },
        { title: 'Subscribe · Copy the link', body: 'Copy the link with ?sub_confirmation=1 added. Signed-in viewers who open it are asked to confirm the subscription.' },
        { title: 'Subscribe · Share or print', body: 'Add it to descriptions, pinned comments and link-in-bio pages, or download the QR code for print and stream overlays.' },
      ],
      'youtube-profile-picture-resizer': [
        { title: 'Upload your image', body: 'Drop or choose a JPG, PNG, WebP, GIF or BMP. It is processed in your browser and never uploaded.' },
        { title: 'Frame the circle', body: 'Drag and zoom inside the square. Keep your face, logo or text inside the circle and check the light and dark previews.' },
        { title: 'Export at 800 × 800', body: 'Choose PNG or JPG, add a background colour for transparent logos if needed, then export and upload it in the Customization section of YouTube Studio.' },
      ],
      'youtube-thumbnail-downloader': [
        { title: 'Paste the video link', body: 'Copy the URL from the address bar or the Share button. Watch, youtu.be, Shorts, live, embed and mobile links all work.' },
        { title: 'Pick a size', body: 'Each size the video has is shown with its dimensions. Max resolution (1280 × 720) is the sharpest when it exists.' },
        { title: 'Download or copy', body: 'Click Download JPG to save it, or copy the image URL. If the download is blocked, save the image from the tab that opens.' },
      ],
      'youtube-thumbnail-tester': [
        { title: 'Upload your thumbnail', body: 'Drop or choose a JPG, PNG, WebP or GIF. Add a second version if you want to compare two designs.' },
        { title: 'Add your title and channel', body: 'Type the title you plan to publish, your channel name, the video length and a views line.' },
        { title: 'Check every layout', body: 'Switch between Home, Search, Suggested and Mobile in light and dark mode, and make sure the subject and text still read at small sizes.' },
      ],
      'youtube-timestamp-generator': [
        { title: 'Paste your chapter notes', body: 'Type or paste one chapter per line with its start time, for example 0:00 Intro. The time can come before or after the title.' },
        { title: 'Fix what the checker flags', body: 'Make sure the list starts at 0:00, has at least three chapters, runs in order and keeps every chapter at 10 seconds or longer.' },
        { title: 'Copy into YouTube Studio', body: 'Pick a separator and time format, copy the list and paste it into your video description, then save.' },
      ],
      'words-to-minutes-calculator': [
        { title: 'Paste your script', body: 'Paste the script or enter a word count. Japanese and Korean scripts switch to a character count automatically.' },
        { title: 'Choose a pace', body: 'Pick slow, average or fast, or enter your own pace after timing a one-minute read.' },
        { title: 'Plan the length', body: 'Read the estimated time, compare paces and set a target length to see how many words to write.' },
      ],
      'engagement-rate-calculator': [
        { title: 'Pick the platform', body: 'Choose YouTube, Instagram or TikTok. Likes and comments stay filled in when you switch.' },
        { title: 'Enter the numbers', body: 'Copy views, likes, comments and the other counts from your analytics. Blank optional fields count as 0, or paste up to 20 posts to get an average.' },
        { title: 'Read the result', body: 'Check the rate, the formula used and the share of each interaction. Compare a single post with your own average.' },
      ],
    },
  },
  es: {
    badge: 'Manual de ejecución',
    heading: 'Cómo utilizar esta herramienta',
    subheading: 'Recomendaciones de flujo de trabajo estándar para una calidad de publicación constante',
    stepPrefix: 'PASO',
    demonstration: {
      badge: 'Demostración // Datos de ejemplo',
      inspectionHeading: 'Inspección de antes y después',
      titleHeading: 'Ejemplo de revisión de borrador de título',
      calcHeading: 'Escenario práctico de cálculo',
      inspectionSubheading: 'Un ejemplo ilustrativo procesado con esta herramienta. Tu imagen y configuración producirán resultados distintos.',
      titleSubheading: 'Un ejemplo editorial analizado con las mismas reglas de títulos. Es una sugerencia de redacción, no una reescritura automática.',
      calcSubheading: 'Supuestos ilustrativos de demostración, no datos de tu canal. Los resultados emplean las mismas fórmulas matemáticas que la calculadora.',
      beforeLabel: 'Antes',
      afterLabel: 'Después',
      downloadOriginal: 'Descargar original',
      downloadProcessed: 'Descargar procesada',
      beforeDraft: 'Antes: Borrador original',
      afterDraft: 'Después: Borrador pulido',
    },
    tools: {
      'logo-background-remover': [
        { title: 'Elige tu logotipo', body: 'Selecciona una imagen fija JPEG, PNG o WebP con fondo plano. El color inicial se toma del píxel superior izquierdo.' },
        { title: 'Elimina el fondo', body: 'Confirma el color y ajusta la tolerancia. Pulsa Eliminar fondo para procesar las zonas conectadas al borde.' },
        { title: 'Revisa y descarga', body: 'Inspecciona los bordes en fondos claro, oscuro y de tablero, y descarga tu archivo PNG transparente.' },
      ],
      'youtube-thumbnail-resizer': [
        { title: 'Elige tu lienzo', body: 'Comienza con un ajuste de miniatura, banner, foto de perfil o marca de agua, y selecciona tu imagen fija.' },
        { title: 'Ajusta el encuadre', body: 'Modifica el recorte o el relleno. Las guías visuales de banner y círculo te ayudan a situar elementos clave sin estirar.' },
        { title: 'Redimensiona y valida', body: 'Procesa la imagen e inspecciona el resultado final. Descárgala y revisa su encuadre en YouTube Studio.' },
      ],
      'youtube-thumbnail-compressor': [
        { title: 'Selecciona tu miniatura', body: 'Carga de 1 a 10 miniaturas JPEG, PNG o WebP de hasta 20 MB cada una. Las imágenes se procesan localmente una a una.' },
        { title: 'Elige el peso objetivo', body: 'Ajusta el límite de tamaño por imagen y el formato de salida. Las opciones avanzadas calibran la calidad visual.' },
        { title: 'Compara y descarga', body: 'Comprime el lote, revisa los resultados y descárgalos de forma individual o en un archivo ZIP sin pérdidas.' },
      ],
      'youtube-shorts-safe-zone': [
        { title: 'Elige un fotograma', body: 'Exporta un fotograma representativo de tu vídeo y cárgalo en formato JPEG, PNG o WebP.' },
        { title: 'Planifica tus márgenes', body: 'Ajusta los bordes reservados y sitúa el recuadro sobre texto o rostros para comprobar solapamientos con la interfaz.' },
        { title: 'Exporta la guía', body: 'Genera el PNG anotado de referencia. Conserva tu archivo original limpio para la subida final a YouTube Shorts.' },
      ],
      'youtube-title-checker': [
        { title: 'Escribe un borrador', body: 'Pega tu título y, opcionalmente, añade la frase clave exacta que deseas verificar en la recomendación.' },
        { title: 'Revisa los avisos', body: 'Comprueba el límite de caracteres, espacios innecesarios, puntuación y salto de línea en pantallas móviles.' },
        { title: 'Perfecciona la redacción', body: 'Ajusta el texto tú mismo y cópialo listo para publicar. Verifica la aceptación final en YouTube Studio.' },
      ],
      'youtube-revenue-calculator': [
        { title: 'Introduce visitas mensuales', body: 'Usa tus visualizaciones reales o supuestos de planificación. Para Shorts, introduce visitas válidas.' },
        { title: 'Define tu rango de RPM', body: 'Introduce supuestos de RPM inferior y superior netos para el creador (después del reparto de plataforma).' },
        { title: 'Calcula tu escenario', body: 'Compara proyecciones mensuales y anuales, y copia los supuestos y fórmulas para tus análisis.' },
      ],
      'youtube-rpm-calculator': [
        { title: 'Elige un periodo', body: 'Reúne los ingresos del creador y las visualizaciones correspondientes exactamente a las mismas fechas.' },
        { title: 'Introduce los valores', body: 'Indica los ingresos en USD y el volumen de visitas. Para Shorts, utiliza visualizaciones contabilizadas.' },
        { title: 'Calcula tu RPM neto', body: 'Obtén los ingresos netos por cada 1.000 visitas. Este cálculo no infiere el CPM del anunciante.' },
      ],
      'youtube-watch-hours-calculator': [
        { title: 'Define tu punto de partida', body: 'Introduce las horas acumuladas actuales y tu meta objetivo para los requisitos del programa de socios.' },
        { title: 'Describe tu ritmo de subida', body: 'Indica las horas mensuales adicionales que generas y la duración media de visualización en minutos.' },
        { title: 'Revisa las proyecciones', body: 'Calcula las horas restantes, las visitas necesarias y el calendario estimado a ritmo constante.' },
      ],
      'youtube-monetization-calculator': [
        { title: 'Añade supuestos base', body: 'Introduce visualizaciones mensuales y tu RPM neto de plataforma tras el reparto de YouTube.' },
        { title: 'Incluye acuerdos y costes', body: 'Añade patrocinios, cuotas de miembros, ingresos de afiliados y gastos de producción sin duplicar cifras.' },
        { title: 'Analiza el beneficio neto', body: 'Calcula ingresos brutos y margen neto antes de impuestos. Las cifras anuales proyectan el escenario mensual.' },
      ],
      'youtube-banner-size': [
        { title: 'Sube tu diseño de banner', body: 'Selecciona la imagen de cabecera de tu canal en formato JPEG, PNG o WebP de hasta 20 MB.' },
        { title: 'Calibra la zona segura', body: 'Asegúrate de colocar textos, títulos y logotipos dentro del área segura central de 1546 × 423 px.' },
        { title: 'Exporta en 2560 × 1440', body: 'Descarga el banner calibrado en alta resolución de 2560 × 1440 y súbela directamente a YouTube Studio.' },
      ],
      'youtube-channel-name-generator': [
        { title: 'Introduce temática y nicho', body: 'Escribe tus palabras clave principales o temática de contenido (ej. tecnología, videojuegos, cocina, finanzas).' },
        { title: 'Elige estilo y formato', body: 'Selecciona el arquetipo de marca deseado (moderno, impactante, clásico o minimalista) y la longitud.' },
        { title: 'Verifica y reserva el handle', body: 'Revisa las ideas generadas, comprueba la disponibilidad del identificador @handle en YouTube Studio y guarda tus favoritos.' },
      ],
      'youtube-tag-generator': [
        { title: 'Introduce tema o título del video', body: 'Escribe el tema principal, título provisional o palabra clave central en el generador.' },
        { title: 'Selecciona etiquetas y grupos', body: 'Revisa etiquetas primarias, variantes, long-tail y temas amplios. Ajusta etiquetas para no superar los 500 caracteres.' },
        { title: 'Copia y pega en YouTube Studio', body: 'Haz clic en Copiar todo para exportar la lista separada por comas y pégala directamente en YouTube Studio.' },
      ],
      'youtube-description-generator': [
        { title: 'Elige formato e introduce datos', body: 'Selecciona el estilo de video (tutorial, reseña, vlog, gaming o podcast) y escribe título, gancho inicial y puntos clave.' },
        { title: 'Añade marcas de tiempo y enlaces', body: 'Configura capítulos de tiempo (00:00 Inicio, etc.), redes sociales, enlaces de afiliados y comunidad.' },
        { title: 'Revisa y copia en YouTube Studio', body: 'Comprueba el fragmento visible antes del corte y el límite de 5.000 caracteres, y copia la descripción con un solo clic.' },
      ],
      'youtube-link-generator': [
        { title: 'Minuto · Pega el enlace del vídeo', body: 'Copia la URL de la barra de direcciones o del botón Compartir. Funcionan enlaces watch, youtu.be, Shorts, directos, embed y móviles.' },
        { title: 'Minuto · Escribe el inicio', body: 'Escribe 90, 1:30, 1:02:03 o 1m30s. Revisa el tiempo interpretado y añade más marcas si necesitas una lista.' },
        { title: 'Minuto · Copia y prueba', body: 'Copia el enlace corto, el completo o el código para insertar, y ábrelo una vez para comprobar que empieza donde esperas.' },
        { title: 'Suscripción · Introduce tu canal', body: 'Pega la URL de tu canal o escribe tu @identificador. También valen los ID de canal (UC…) y las URL antiguas /c/ y /user/.' },
        { title: 'Suscripción · Copia el enlace', body: 'Copia el enlace con ?sub_confirmation=1. Quien lo abra con la sesión iniciada verá la confirmación de suscripción.' },
        { title: 'Suscripción · Compártelo o imprímelo', body: 'Añádelo a descripciones, comentarios fijados y enlaces en la biografía, o descarga el código QR para impresos y overlays de directo.' },
      ],
      'youtube-profile-picture-resizer': [
        { title: 'Sube tu imagen', body: 'Arrastra o elige un JPG, PNG, WebP, GIF o BMP. Se procesa en tu navegador y nunca se sube.' },
        { title: 'Encuadra el círculo', body: 'Arrastra y haz zoom dentro del cuadrado. Mantén tu cara, logo o texto dentro del círculo y revisa las vistas previas en modo claro y oscuro.' },
        { title: 'Exporta a 800 × 800', body: 'Elige PNG o JPG, añade un color de fondo si tu logo es transparente y exporta. Después súbelo en la sección Personalización de YouTube Studio.' },
      ],
      'youtube-thumbnail-downloader': [
        { title: 'Pega el enlace del vídeo', body: 'Copia la URL de la barra de direcciones o del botón Compartir. Funcionan enlaces watch, youtu.be, Shorts, directos, embed y móviles.' },
        { title: 'Elige un tamaño', body: 'Cada tamaño disponible aparece con sus medidas. La resolución máxima (1280 × 720) es la más nítida cuando existe.' },
        { title: 'Descarga o copia', body: 'Pulsa Descargar JPG para guardarla o copia la URL de la imagen. Si la descarga se bloquea, guárdala desde la pestaña que se abre.' },
      ],
      'youtube-thumbnail-tester': [
        { title: 'Sube tu miniatura', body: 'Arrastra o elige un JPG, PNG, WebP o GIF. Añade una segunda versión si quieres comparar dos diseños.' },
        { title: 'Añade título y canal', body: 'Escribe el título que vas a publicar, el nombre de tu canal, la duración y una línea de visualizaciones.' },
        { title: 'Revisa cada diseño', body: 'Cambia entre Inicio, Búsqueda, Sugeridos y Móvil en modo claro y oscuro, y comprueba que el sujeto y el texto se leen en pequeño.' },
      ],
      'youtube-timestamp-generator': [
        { title: 'Pega tus notas de capítulos', body: 'Escribe o pega un capítulo por línea con su tiempo de inicio, por ejemplo 0:00 Introducción. El tiempo puede ir antes o después del título.' },
        { title: 'Corrige lo que se marca', body: 'Asegúrate de que la lista empieza en 0:00, tiene al menos tres capítulos, va en orden y cada capítulo dura 10 segundos o más.' },
        { title: 'Cópiala en YouTube Studio', body: 'Elige separador y formato de tiempo, copia la lista, pégala en la descripción del vídeo y guarda.' },
      ],
      'words-to-minutes-calculator': [
        { title: 'Pega tu guion', body: 'Pega el guion o escribe el número de palabras. Los guiones en japonés y coreano pasan a contar caracteres automáticamente.' },
        { title: 'Elige un ritmo', body: 'Selecciona lento, medio o rápido, o escribe tu propio ritmo tras cronometrar un minuto de lectura.' },
        { title: 'Planifica la duración', body: 'Mira el tiempo estimado, compara ritmos y fija una duración objetivo para saber cuántas palabras escribir.' },
      ],
      'engagement-rate-calculator': [
        { title: 'Elige la plataforma', body: 'Selecciona YouTube, Instagram o TikTok. Los me gusta y los comentarios se mantienen al cambiar.' },
        { title: 'Introduce los datos', body: 'Copia visualizaciones, me gusta, comentarios y demás cifras de tus estadísticas. Los campos opcionales vacíos cuentan como 0; también puedes pegar hasta 20 publicaciones para obtener la media.' },
        { title: 'Lee el resultado', body: 'Revisa la tasa, la fórmula usada y el peso de cada interacción. Compara una publicación con tu propia media.' },
      ],
    },
  },
  ja: {
    badge: '実行手順プレイブック',
    heading: 'このツールの使い方',
    subheading: '一貫した公開品質を維持するための標準ワークフロー推奨手順',
    stepPrefix: 'ステップ',
    demonstration: {
      badge: 'デモ // サンプル入力',
      inspectionHeading: '適用前と適用後の比較検証',
      titleHeading: 'タイトル下書きの改善例',
      calcHeading: '計算シナリオの実例',
      inspectionSubheading: 'このツールで処理されたサンプル例です。実際の画像や設定によって結果は異なります。',
      titleSubheading: '同じタイトル分析ロジックで検証した編集例です。これは表現の選択肢であり、自動リライトではありません。',
      calcSubheading: 'これらはデモ用の想定値であり、実際のチャンネル収益の保証ではありません。上の計算機と同じ数式を使用しています。',
      beforeLabel: '適用前',
      afterLabel: '適用後',
      downloadOriginal: 'オリジナルを保存',
      downloadProcessed: '処理後画像を保存',
      beforeDraft: '修正前: 元の下書き',
      afterDraft: '修正後: 洗練された下書き',
    },
    tools: {
      'logo-background-remover': [
        { title: 'ロゴを選択', body: '単色背景のJPEG、PNG、またはWebP画像を選択します。左上のピクセルから基準色を検出します。' },
        { title: '背景を透過処理', body: '色を確認し、許容値を調整して「背景を削除」をクリックします。輪郭に接する背景領域が透過されます。' },
        { title: '確認してダウンロード', body: 'ライト、ダーク、格子プレビューでエッジを確認し、透明PNGファイルをダウンロードします。' },
      ],
      'youtube-thumbnail-resizer': [
        { title: 'キャンバスを選択', body: 'サムネイル、バナー、アイコンなどのプリセットを選び、お手持ちの画像ファイルを読み込みます。' },
        { title: '構図と余白を調整', body: 'トリミングまたは余白追加を調整します。円形ガイドやセーフゾーン表示を活用して重要要素を配置します。' },
        { title: 'リサイズして保存', body: '画像を書き出し、仕上がりを確認します。YouTube Studioのアップロード画面で最終確認を行ってください。' },
      ],
      'youtube-thumbnail-compressor': [
        { title: '画像ファイルを指定', body: '1枚〜最大10枚のサムネイル（各20MB以内）を選択します。画像はブラウザ内で1枚ずつ安全に処理されます。' },
        { title: '目標容量を設定', body: 'YouTube Studioの2MB上限に合わせて容量スライダーと出力形式（JPEG/PNG/WebP）を指定します。' },
        { title: '品質比較と一括保存', body: '圧縮結果の画質と容量を確認し、個別ダウンロードまたはZIP一括書き出しを行います。' },
      ],
      'youtube-shorts-safe-zone': [
        { title: '動画フレームを選択', body: 'ショート動画から代表的な1フレームを書き出し、JPEGまたはPNG画像を読み込みます。' },
        { title: '余白とセーフゾーン確認', body: '画面端の余白やコンテンツボックスを調整し、いいね・コメント・チャンネル名と文字の重なりを点検します。' },
        { title: 'ガイド画像を書き出し', body: '注釈付きの確認用PNGを書き出します。動画編集ソフトのタイムラインに重ねてレイアウトを調整できます。' },
      ],
      'youtube-title-checker': [
        { title: 'タイトルを入力', body: '考案した動画タイトルを入力し、任意で上位表示を狙う重要キーワードを指定します。' },
        { title: '分析結果を確認', body: '文字数、空白、記号、スマホ画面での50文字切り捨て境界線のプレビューを確認します。' },
        { title: '表現をブラッシュアップ', body: 'フィードバックを参考にフックを冒頭に配置し、完成したタイトルをYouTube Studioへコピーします。' },
      ],
      'youtube-revenue-calculator': [
        { title: '月間再生数を入力', body: '現在の再生回数または想定を入力します。ショート動画の場合は有効再生回数を基準にします。' },
        { title: 'RPM範囲を指定', body: 'YouTubeの手数料控除後のクリエイター受取RPM（下限・上限）を入力します。' },
        { title: '収益シナリオを算出', body: '月間および年間の推定手取り収益を比較し、チャンネル計画に役立ててください。' },
      ],
      'youtube-rpm-calculator': [
        { title: '集計期間を決定', body: 'YouTubeアナリティクスから同一期間の確定推定収益と再生回数を抽出します。' },
        { title: '数値を入力', body: '収益額（USD）と再生回数を入力します。ショートの場合はエンゲージメント再生数を使用します。' },
        { title: '1,000回あたりRPM算出', body: '純粋な千回再生あたり受取額を計算します。広告主側のCPMとは異なるクリエイター指標です。' },
      ],
      'youtube-watch-hours-calculator': [
        { title: '現在の実績を入力', body: '現在の公開総再生時間と収益化目標（例: 4,000時間）を入力します。' },
        { title: '投稿ペースを設定', body: '月間の追加予定再生時間と動画の平均視聴維持時間（分）を指定します。' },
        { title: '達成目標日を確認', body: '目標達成に必要な追加再生数と、現在のペースでかかる予想日数を試算します。' },
      ],
      'youtube-monetization-calculator': [
        { title: '再生収益の前提を入力', body: '月間再生回数と予想RPMを入力し、AdSenseからの基準分配額を算出します。' },
        { title: 'タイアップ・費用を追加', body: 'スポンサー案件、メンバーシップ、アフィリエイト収入と制作外注費を入力します。' },
        { title: '純利益シナリオを点検', body: '経費控除後の月間純収益と年間推計を算出し、健全なチャンネル運営を支援します。' },
      ],
      'youtube-banner-size': [
        { title: 'バナー画像をアップロード', body: '最大20MBまでのJPEG、PNG、WebP形式のYouTubeチャンネルバナー画像を選択します。' },
        { title: 'セーフゾーンを調整', body: 'スマホやPC全端末で確実に表示される中央1546×423のセーフエリア内に文字やロゴを配置します。' },
        { title: '2560×1440で書き出し', body: '2560×1440解像度の最適化バナーをダウンロードし、YouTube Studioで適用確認を行います。' },
      ],
      'youtube-channel-name-generator': [
        { title: 'キーワードとジャンルを入力', body: 'チャンネルのテーマ、配信ジャンル、関連キーワード（例: ガジェット、ゲーム実況、料理、投資）を入力します。' },
        { title: 'ネーミングスタイルを選択', body: '先進的、王道、ユニーク、ミニマルなどのブランド傾向と希望の単語数を選びます。' },
        { title: '@ハンドル名の空きを確認', body: '生成された候補から気に入った名前を選び、YouTube Studioで希望の@ハンドルが取得可能か確認して保存します。' },
      ],
      'youtube-tag-generator': [
        { title: '動画のテーマやタイトルを入力', body: '生成フォームに動画の主題、予定タイトル、または狙いたいメインキーワードを入力します。' },
        { title: 'タグ候補とクラスタを選択', body: 'メイン、派生語、ロングテール、広範囲タグを確認します。500文字以内に収まるよう個別にオン/オフ調整します。' },
        { title: 'コピーしてStudioに貼り付け', body: '「すべてコピー」をクリックしてカンマ区切りテキストを取得し、YouTube Studioのタグ欄へそのまま貼り付けます。' },
      ],
      'youtube-description-generator': [
        { title: 'ジャンル選択と基本情報の入力', body: '動画スタイル（解説・レビュー・Vlog・ゲーム実況・対談など）を選び、タイトル、要約フック文、ポイントを入力します。' },
        { title: '目次タイムスタンプとリンク設定', body: '00:00開始のチャプター目次、SNSリンク、紹介アイテムのアフィリエイトリンクを整えます。' },
        { title: '折りたたみ表示を確認してコピー', body: '「もっと見る」ボタン前の表示プレビューと5,000文字制限を確認し、ワンクリックでコピーしてYouTube Studioへ貼り付けます。' },
      ],
      'youtube-link-generator': [
        { title: '時間指定 · 動画リンクを貼る', body: 'アドレスバーや「共有」ボタンからURLをコピーします。watch、youtu.be、ショート、ライブ、埋め込み、モバイルのリンクに対応しています。' },
        { title: '時間指定 · 開始時間を入力', body: '90、1:30、1:02:03、1m30s のように入力し、表示される時間を確認します。一覧が必要ならタイムスタンプを追加します。' },
        { title: '時間指定 · コピーして確認', body: '短縮リンク、通常リンク、埋め込みコードをコピーし、一度開いて狙った位置から再生されるか確認します。' },
        { title: '登録リンク · チャンネルを入力', body: 'チャンネルURLを貼るか @ハンドルを入力します。チャンネルID（UC…）や古い /c/・/user/ のURLにも対応しています。' },
        { title: '登録リンク · リンクをコピー', body: '?sub_confirmation=1 付きのリンクをコピーします。ログイン中の視聴者が開くと、登録の確認画面が表示されます。' },
        { title: '登録リンク · 共有・印刷', body: '概要欄、固定コメント、プロフィールのリンク集に追加するか、QRコードをダウンロードして印刷物や配信オーバーレイに使います。' },
      ],
      'youtube-profile-picture-resizer': [
        { title: '画像をアップロード', body: 'JPG、PNG、WebP、GIF、BMPをドロップまたは選択します。処理はブラウザ内で行われ、アップロードされません。' },
        { title: '円に合わせて配置', body: '正方形の中でドラッグとズームを調整します。顔・ロゴ・文字を円の中に収め、ライト・ダークのプレビューを確認します。' },
        { title: '800 × 800で書き出し', body: 'PNGかJPGを選び、透過ロゴなら背景色を加えて書き出します。YouTube Studioの「カスタマイズ」からアップロードしてください。' },
      ],
      'youtube-thumbnail-downloader': [
        { title: '動画リンクを貼る', body: 'アドレスバーや「共有」ボタンからURLをコピーします。watch、youtu.be、ショート、ライブ、埋め込み、モバイルのリンクに対応しています。' },
        { title: 'サイズを選ぶ', body: '動画にあるサイズが寸法つきで表示されます。最大解像度（1280 × 720）がある場合はそれがいちばん鮮明です。' },
        { title: 'ダウンロードかコピー', body: '「JPGをダウンロード」で保存するか、画像URLをコピーします。ダウンロードがブロックされたら、開いたタブから画像を保存してください。' },
      ],
      'youtube-thumbnail-tester': [
        { title: 'サムネイルをアップロード', body: 'JPG、PNG、WebP、GIFをドロップまたは選択します。2つの案を比べたいときは2枚目を追加します。' },
        { title: 'タイトルとチャンネル名を入力', body: '公開予定のタイトル、チャンネル名、動画の長さ、再生回数の表示を入力します。' },
        { title: '各レイアウトを確認', body: 'ホーム、検索、関連動画、モバイルをライト・ダークで切り替え、小さいサイズでも被写体と文字が伝わるか確かめます。' },
      ],
      'youtube-timestamp-generator': [
        { title: 'チャプターのメモを貼る', body: '1行に1チャプター、開始時間と一緒に入力または貼り付けます（例：0:00 オープニング）。時間はタイトルの前でも後でもかまいません。' },
        { title: '指摘された箇所を直す', body: '0:00から始まり、3つ以上あり、時間順で、どのチャプターも10秒以上になっているか確認します。' },
        { title: 'YouTube Studioに貼る', body: '区切りと時間の表記を選んで一覧をコピーし、動画の概要欄に貼り付けて保存します。' },
      ],
      'words-to-minutes-calculator': [
        { title: '原稿を貼る', body: '原稿を貼り付けるか、文字数を入力します。日本語の原稿は自動で文字数カウントになります。' },
        { title: '速さを選ぶ', body: 'ゆっくり・標準・速めから選ぶか、1分間音読して測った自分の速さを入力します。' },
        { title: '長さを計画する', body: '読み上げ時間を確認し、ほかの速さと比べ、目標の長さを入れて必要な文字数を確認します。' },
      ],
      'engagement-rate-calculator': [
        { title: 'プラットフォームを選ぶ', body: 'YouTube、Instagram、TikTokから選びます。切り替えても、いいねやコメントの値はそのまま残ります。' },
        { title: '数値を入力', body: 'アナリティクスから再生数、いいね、コメントなどをコピーします。任意項目の空欄は0として計算し、最大20投稿を貼り付けて平均も出せます。' },
        { title: '結果を確認', body: '率、使った計算式、各インタラクションの割合を確認し、1投稿をあなたの平均と比べます。' },
      ],
    },
  },
  fr: {
    badge: 'Guide d\'exécution',
    heading: 'Comment utiliser cet outil',
    subheading: 'Recommandations de flux de travail standard pour une qualité de publication constante',
    stepPrefix: 'ÉTAPE',
    demonstration: {
      badge: 'Démonstration // Données d\'exemple',
      inspectionHeading: 'Comparaison avant et après',
      titleHeading: 'Exemple de révision de titre',
      calcHeading: 'Scénario de calcul pratique',
      inspectionSubheading: 'Un exemple illustratif traité avec cet outil. Vos fichiers et paramètres donneront des résultats uniques.',
      titleSubheading: 'Un exemple éditorial vérifié avec les mêmes critères. Il s\'agit d\'un choix de rédaction, non d\'une réécriture automatique.',
      calcSubheading: 'Ces données sont des simulations d\'exemple, et non des garanties de revenus réels. Les calculs utilisent les mêmes formules.',
      beforeLabel: 'Avant',
      afterLabel: 'Après',
      downloadOriginal: 'Télécharger l\'original',
      downloadProcessed: 'Télécharger le résultat',
      beforeDraft: 'Avant: Brouillon initial',
      afterDraft: 'Après: Brouillon optimisé',
    },
    tools: {
      'logo-background-remover': [
        { title: 'Sélectionnez votre logo', body: 'Chargez une image JPEG, PNG ou WebP avec un fond uni. La couleur de départ est détectée sur le pixel supérieur gauche.' },
        { title: 'Supprimez l\'arrière-plan', body: 'Confirmez la couleur et ajustez la tolérance. Cliquez sur Supprimer pour traiter les contours extérieurs.' },
        { title: 'Inspectez et téléchargez', body: 'Vérifiez le détourage sur les aperçus clair, sombre et quadrillé, puis téléchargez votre PNG transparent.' },
      ],
      'youtube-thumbnail-resizer': [
        { title: 'Choisissez votre format', body: 'Sélectionnez un préréglage (miniature 16:9, bannière, photo de profil) puis importez votre image.' },
        { title: 'Ajustez le cadrage', body: 'Réglez le recadrage ou le remplissage avec marges. Les repères vous aident à centrer vos éléments essentiels.' },
        { title: 'Redimensionnez et validez', body: 'Générez votre image en 1280×720 HD, téléchargez-la et vérifiez le rendu final dans YouTube Studio.' },
      ],
      'youtube-thumbnail-compressor': [
        { title: 'Importez vos miniatures', body: 'Sélectionnez 1 à 10 images (max 20 Mo chacune). Le traitement s\'effectue entièrement dans votre navigateur.' },
        { title: 'Définissez la taille cible', body: 'Ajustez le curseur sous le plafond de 2 Mo de YouTube Studio mobile et choisissez le format de sortie.' },
        { title: 'Comparez et téléchargez', body: 'Vérifiez la netteté et le poids final, puis téléchargez chaque image individuellement ou dans une archive ZIP.' },
      ],
      'youtube-shorts-safe-zone': [
        { title: 'Extrayez une image clé', body: 'Exportez une image fixe représentative de votre vidéo verticale et chargez-la en JPEG ou PNG.' },
        { title: 'Vérifiez les marges', body: 'Ajustez les zones de sécurité pour vous assurer que les boutons d\'interaction ne masquent pas vos textes.' },
        { title: 'Exportez le calque guide', body: 'Téléchargez le PNG avec repères pour l\'importer dans votre logiciel de montage vidéo.' },
      ],
      'youtube-title-checker': [
        { title: 'Saisissez votre titre', body: 'Collez votre ébauche de titre et spécifiez éventuellement le mot-clé principal ciblé.' },
        { title: 'Analysez les critères', body: 'Examinez la longueur, la ponctuation, les majuscules et la coupure sur l\'écran d\'accueil mobile.' },
        { title: 'Peaufinez la formulation', body: 'Réécrivez votre titre pour placer l\'accroche émotionnelle dans les 50 premiers caractères.' },
      ],
      'youtube-revenue-calculator': [
        { title: 'Indiquez les vues mensuelles', body: 'Renseignez vos vues réelles ou vos projections. Pour les Shorts, utilisez les vues monétisables.' },
        { title: 'Fixez la fourchette de RPM', body: 'Indiquez votre RPM net estimé (après déduction de la part de plateforme de 45% ou 55%).' },
        { title: 'Calculez vos gains', body: 'Comparez vos estimations mensuelles et annuelles pour calibrer vos objectifs de chaîne.' },
      ],
      'youtube-rpm-calculator': [
        { title: 'Choisissez une période', body: 'Relevez vos revenus nets et votre total de vues sur la même plage de dates dans vos analyses.' },
        { title: 'Entrez les données', body: 'Renseignez les montants en dollars et le nombre de vues correspondant sans doublon.' },
        { title: 'Calculez votre RPM réel', body: 'Visualisez exactement vos revenus nets pour 1 000 vues, distinct du CPM brut des annonceurs.' },
      ],
      'youtube-watch-hours-calculator': [
        { title: 'Définissez le point de départ', body: 'Entrez vos heures de visionnage actuelles et l\'objectif requis pour la monétisation (ex: 4 000 h).' },
        { title: 'Renseignez votre rythme', body: 'Indiquez les heures mensuelles ajoutées et la durée moyenne de visionnage par spectateur.' },
        { title: 'Obtenez votre calendrier', body: 'Découvrez le nombre de vues nécessaires et l\'estimation temporelle pour atteindre votre objectif.' },
      ],
      'youtube-monetization-calculator': [
        { title: 'Ajoutez les revenus AdSense', body: 'Entrez vos vues prévues et votre RPM de chaîne pour modéliser la part publicitaire.' },
        { title: 'Intégrez sponsors et frais', body: 'Ajoutez partenariats, abonnements, affiliations et déduisez vos dépenses de production.' },
        { title: 'Analysez votre bénéfice net', body: 'Mesurez votre résultat net mensuel et annuel avant impôts pour sécuriser votre activité.' },
      ],
      'youtube-banner-size': [
        { title: 'Importez votre bannière', body: "Sélectionnez votre bannière YouTube au format JPEG, PNG ou WebP jusqu'à 20 Mo." },
        { title: 'Calibrez la zone de sécurité', body: 'Placez textes et logos cruciaux dans la zone centrale sécurisée de 1546 × 423 px visible sur mobile et ordinateur.' },
        { title: 'Exportez en 2560 × 1440', body: 'Téléchargez votre bannière calibrée en 2560 × 1440 et importez-la dans YouTube Studio.' },
      ],
      'youtube-channel-name-generator': [
        { title: 'Saisissez vos mots-clés', body: "Entrez vos thématiques principales ou votre niche de créateur (ex. tech, gaming, cuisine, finance)." },
        { title: 'Choisissez un style de marque', body: "Sélectionnez la tonalité souhaitée (moderne, percutant, classique ou minimaliste) et la longueur du nom." },
        { title: 'Testez et réservez l\'identifiant', body: "Parcourez les suggestions, vérifiez la disponibilité de l'identifiant @handle sur YouTube Studio et enregistrez vos favoris." },
      ],
      'youtube-tag-generator': [
        { title: 'Entrez le sujet ou titre de la vidéo', body: 'Saisissez votre sujet principal, titre de travail ou mot-clé cible dans le générateur.' },
        { title: 'Sélectionnez vos tags et grappes', body: 'Passez en revue les mots-clés principaux, variantes et expressions longue traîne sous la limite de 500 caractères.' },
        { title: 'Copiez et collez dans YouTube Studio', body: 'Cliquez sur Tout copier pour obtenir la liste formatée avec virgules et collez-la directement dans YouTube Studio.' },
      ],
      'youtube-description-generator': [
        { title: 'Choisissez le format et les détails', body: "Sélectionnez votre style de vidéo (tutoriel, test, vlog, gaming ou podcast) et saisissez le titre, l'accroche et les points clés." },
        { title: 'Ajoutez chapitres et liens utiles', body: "Intégrez les repères temporels (00:00 Intro, etc.), vos réseaux sociaux, liens affiliés et espaces communautaires." },
        { title: 'Vérifiez et copiez dans Studio', body: "Contrôlez l'aperçu au-dessus du pli et la limite des 5 000 caractères, puis cliquez sur Copier la description pour YouTube Studio." },
      ],
      'youtube-link-generator': [
        { title: 'Timestamp · Collez le lien', body: 'Copiez l’URL depuis la barre d’adresse ou le bouton Partager. Les liens watch, youtu.be, Shorts, live, embed et mobiles fonctionnent.' },
        { title: 'Timestamp · Saisissez le départ', body: 'Tapez 90, 1:30, 1:02:03 ou 1m30s. Vérifiez le temps interprété et ajoutez d’autres timestamps si vous voulez une liste.' },
        { title: 'Timestamp · Copiez et testez', body: 'Copiez le lien court, le lien complet ou le code d’intégration, puis ouvrez le lien une fois pour vérifier le point de départ.' },
        { title: 'Abonnement · Saisissez votre chaîne', body: 'Collez l’URL de votre chaîne ou tapez votre @identifiant. Les ID de chaîne (UC…) et les anciennes URL /c/ et /user/ fonctionnent aussi.' },
        { title: 'Abonnement · Copiez le lien', body: 'Copiez le lien avec ?sub_confirmation=1. Les spectateurs connectés qui l’ouvrent doivent confirmer l’abonnement.' },
        { title: 'Abonnement · Partagez ou imprimez', body: 'Ajoutez-le aux descriptions, aux commentaires épinglés et aux liens en bio, ou téléchargez le QR code pour vos imprimés et overlays de live.' },
      ],
      'youtube-profile-picture-resizer': [
        { title: 'Importez votre image', body: 'Déposez ou choisissez un JPG, PNG, WebP, GIF ou BMP. Il est traité dans votre navigateur et jamais envoyé.' },
        { title: 'Cadrez le cercle', body: 'Faites glisser et zoomez dans le carré. Gardez visage, logo ou texte dans le cercle et vérifiez les aperçus clair et sombre.' },
        { title: 'Exportez en 800 × 800', body: 'Choisissez PNG ou JPG, ajoutez une couleur de fond pour un logo transparent, puis exportez et importez l’image dans la section Personnalisation de YouTube Studio.' },
      ],
      'youtube-thumbnail-downloader': [
        { title: 'Collez le lien de la vidéo', body: 'Copiez l’URL depuis la barre d’adresse ou le bouton Partager. Les liens watch, youtu.be, Shorts, live, embed et mobiles fonctionnent.' },
        { title: 'Choisissez une taille', body: 'Chaque taille disponible s’affiche avec ses dimensions. La résolution maximale (1280 × 720) est la plus nette quand elle existe.' },
        { title: 'Téléchargez ou copiez', body: 'Cliquez sur Télécharger le JPG pour l’enregistrer ou copiez l’URL de l’image. Si le téléchargement est bloqué, enregistrez l’image depuis l’onglet ouvert.' },
      ],
      'youtube-thumbnail-tester': [
        { title: 'Importez votre miniature', body: 'Déposez ou choisissez un JPG, PNG, WebP ou GIF. Ajoutez une seconde version pour comparer deux designs.' },
        { title: 'Ajoutez titre et chaîne', body: 'Saisissez le titre prévu, le nom de votre chaîne, la durée de la vidéo et une ligne de vues.' },
        { title: 'Vérifiez chaque affichage', body: 'Passez d’Accueil à Recherche, Suggestions et Mobile, en clair et en sombre, et vérifiez que le sujet et le texte restent lisibles en petit.' },
      ],
      'youtube-timestamp-generator': [
        { title: 'Collez vos notes de chapitres', body: 'Saisissez ou collez un chapitre par ligne avec son heure de début, par exemple 0:00 Intro. Le temps peut précéder ou suivre le titre.' },
        { title: 'Corrigez ce qui est signalé', body: 'Vérifiez que la liste commence à 0:00, compte au moins trois chapitres, suit l’ordre et que chaque chapitre dure 10 secondes ou plus.' },
        { title: 'Copiez dans YouTube Studio', body: 'Choisissez un séparateur et un format de temps, copiez la liste, collez-la dans la description de la vidéo et enregistrez.' },
      ],
      'words-to-minutes-calculator': [
        { title: 'Collez votre script', body: 'Collez le script ou saisissez un nombre de mots. Les scripts en japonais et en coréen passent automatiquement en caractères.' },
        { title: 'Choisissez un débit', body: 'Sélectionnez lent, moyen ou rapide, ou saisissez votre propre débit après une lecture chronométrée d’une minute.' },
        { title: 'Planifiez la durée', body: 'Lisez le temps estimé, comparez les débits et indiquez une durée visée pour savoir combien de mots écrire.' },
      ],
      'engagement-rate-calculator': [
        { title: 'Choisissez la plateforme', body: 'Sélectionnez YouTube, Instagram ou TikTok. Les j’aime et les commentaires restent saisis quand vous changez.' },
        { title: 'Saisissez les chiffres', body: 'Copiez vues, j’aime, commentaires et autres chiffres depuis vos statistiques. Les champs facultatifs vides comptent pour 0 ; vous pouvez aussi coller jusqu’à 20 publications pour obtenir une moyenne.' },
        { title: 'Lisez le résultat', body: 'Vérifiez le taux, la formule utilisée et la part de chaque interaction. Comparez une publication à votre propre moyenne.' },
      ],
    },
  },
  de: {
    badge: 'Anleitung und Arbeitsablauf',
    heading: 'So verwenden Sie dieses Tool',
    subheading: 'Standard-Workflow-Empfehlungen für gleichbleibend hohe Veröffentlichungsqualität',
    stepPrefix: 'SCHRITT',
    demonstration: {
      badge: 'Demonstration // Beispieldaten',
      inspectionHeading: 'Vorher-Nachher-Überprüfung',
      titleHeading: 'Beispiel für eine Titelentwurfsüberarbeitung',
      calcHeading: 'Praktisches Berechnungsszenario',
      inspectionSubheading: 'Ein mit diesem Tool bearbeitetes Musterbeispiel. Ihre Dateien und Einstellungen liefern individuelle Ergebnisse.',
      titleSubheading: 'Ein redaktionelles Beispiel, geprüft mit derselben Logik. Es handelt sich um einen Formulierungsvorschlag.',
      calcSubheading: 'Dies sind exemplarische Planungsannahmen, keine Umsatzgarantien. Berechnungen nutzen dieselben Formeln.',
      beforeLabel: 'Vorher',
      afterLabel: 'Nachher',
      downloadOriginal: 'Originaldatei herunterladen',
      downloadProcessed: 'Bearbeitete Datei herunterladen',
      beforeDraft: 'Vorher: Ursprünglicher Entwurf',
      afterDraft: 'Nachher: Optimierter Entwurf',
    },
    tools: {
      'logo-background-remover': [
        { title: 'Logo auswählen', body: 'Wählen Sie ein JPEG, PNG oder WebP mit einfarbigem Hintergrund. Die Ausgangsfarbe wird oben links erkannt.' },
        { title: 'Hintergrund entfernen', body: 'Farbe bestätigen, Toleranz einstellen und auf Hintergrund entfernen klicken, um Ränder zu bereinigen.' },
        { title: 'Prüfen und speichern', body: 'Kanten im hellen, dunklen und Raster-Modus kontrollieren und die transparente PNG-Datei herunterladen.' },
      ],
      'youtube-thumbnail-resizer': [
        { title: 'Leinwand wählen', body: 'Wählen Sie eine Vorlage (Thumbnail 16:9, Banner, Profilbild) und laden Sie Ihr Bild hoch.' },
        { title: 'Ausschnitt anpassen', body: 'Zuschneiden oder mit Rändern einpassen. Leitlinien helfen bei der Platzierung wichtiger Motive.' },
        { title: 'Exportieren und prüfen', body: 'In 1280×720 HD exportieren, herunterladen und in YouTube Studio für den Upload kontrollieren.' },
      ],
      'youtube-thumbnail-compressor': [
        { title: 'Bilder hochladen', body: 'Wählen Sie 1–10 Thumbnails (max. 20 MB je Datei). Die Verarbeitung erfolgt lokal in Ihrem Browser.' },
        { title: 'Zielgröße festlegen', body: 'Schieberegler unter das 2-MB-Limit der mobilen YouTube-App einstellen und Dateiformat wählen.' },
        { title: 'Qualität prüfen & sichern', body: 'Bildschärfe kontrollieren und Dateien einzeln oder als komprimiertes ZIP-Archiv herunterladen.' },
      ],
      'youtube-shorts-safe-zone': [
        { title: 'Standbild exportieren', body: 'Ein aussagekräftiges Frame aus Ihrem Hochkant-Video als JPEG oder PNG in das Tool laden.' },
        { title: 'Sicherheitszonen prüfen', body: 'Ränder ausrichten und sicherstellen, dass Like-Buttons und Beschreibungen keine Texte verdecken.' },
        { title: 'Overlay-Guide exportieren', body: 'PNG-Führungsgitter herunterladen und in Ihrem Schnittprogramm über das Videomaterial legen.' },
      ],
      'youtube-title-checker': [
        { title: 'Titelentwurf einfügen', body: 'Fügen Sie Ihren geplanten Videotitel ein und geben Sie optional Ihren wichtigsten Suchbegriff an.' },
        { title: 'Feedback auswerten', body: 'Zeichenanzahl, Wortabstände, Zeichensetzung und die 50-Zeichen-Abschneidegrenze für Mobilgeräte prüfen.' },
        { title: 'Formulierung schärfen', body: 'Hook an den Anfang setzen, optimierten Titel kopieren und in YouTube Studio einfügen.' },
      ],
      'youtube-revenue-calculator': [
        { title: 'Monatliche Aufrufe angeben', body: 'Reale Klicks oder Schätzwerte eintragen. Bei Shorts qualifizierte Aufrufe heranziehen.' },
        { title: 'RPM-Spanne definieren', body: 'Nettoumsatzannahmen je 1.000 Aufrufe nach Abzug des Plattformanteils eintragen.' },
        { title: 'Prognose analysieren', body: 'Monats- und Jahresszenarien vergleichen, um Kanalziele realistisch zu planen.' },
      ],
      'youtube-rpm-calculator': [
        { title: 'Zeitraum festlegen', body: 'Einnahmen und Aufrufe desselben Zeitraums aus den YouTube-Analysen zusammentragen.' },
        { title: 'Werte eintragen', body: 'Betrag in USD und entsprechende Aufrufzahlen eintragen (bei Shorts gezählte Views).' },
        { title: 'Reines Netto-RPM berechnen', body: 'Tatsächlichen Verdienst pro 1.000 Aufrufe berechnen – unabhängig vom Brutto-CPM der Werbekunden.' },
      ],
      'youtube-watch-hours-calculator': [
        { title: 'Ist-Zustand erfassen', body: 'Aktuelle Wiedergabestunden und Zielmarke (z. B. 4.000 Stunden für Monetarisierung) eingeben.' },
        { title: 'Veröffentlichungstempo angeben', body: 'Zusätzliche Monatsstunden und durchschnittliche Wiedergabedauer je Zuschauer eintragen.' },
        { title: 'Zeitplan ablesen', body: 'Verbleibende Stunden, benötigte Klicks und voraussichtliches Zieldatum berechnen.' },
      ],
      'youtube-monetization-calculator': [
        { title: 'Werbeeinnahmen ansetzen', body: 'Monatliche Klicks und Plattform-RPM eintragen, um den Grundumsatz zu ermitteln.' },
        { title: 'Sponsoring & Kosten ergänzen', body: 'Markendeals, Mitgliedschaften, Affiliate-Erlöse eintragen und Produktionskosten abziehen.' },
        { title: 'Nettogewinn prüfen', body: 'Monatlichen und jährlichen Reingewinn vor Steuern kalkulieren, um rentabel zu wirtschaften.' },
      ],
      'youtube-banner-size': [
        { title: 'Banner-Design hochladen', body: 'Wähle dein Kanalbanner im JPEG-, PNG- oder WebP-Format mit bis zu 20 MB Dateigröße.' },
        { title: 'Safe Zone kalibrieren', body: 'Platziere wichtige Logos und Schriften im zentralen Sicherheitsbereich von 1546 × 423 px für alle Endgeräte.' },
        { title: '2560 × 1440 exportieren', body: 'Lade das kalibrierte 2560 × 1440 Banner herunter und überprüfe die Anzeige in YouTube Studio.' },
      ],
      'youtube-channel-name-generator': [
        { title: 'Keywords & Nische eingeben', body: 'Gib deine Hauptthemen oder Nische ein (z. B. Technik, Gaming, Kochen, Finanzen).' },
        { title: 'Namensstil auswählen', body: 'Wähle deinen bevorzugten Markenstil (modern, prägnant, klassisch oder minimalistisch) und die Wortanzahl.' },
        { title: '@Handle prüfen & sichern', body: 'Prüfe die generierten Namensideen, teste die Verfügbarkeit des @Handles in YouTube Studio und speichere Favoriten.' },
      ],
      'youtube-tag-generator': [
        { title: 'Videothema oder Arbeitstitel eingeben', body: 'Trage dein Hauptthema, den Arbeitstitel oder Fokus-Keywords in das Eingabefeld ein.' },
        { title: 'Tags und Cluster auswählen', body: 'Prüfe primäre Keywords, Varianten, Long-Tail-Fragen und breite Tags passend zum 500-Zeichen-Limit.' },
        { title: 'Kopieren und in Studio einfügen', body: 'Klicke auf Alle kopieren für eine kommagetrennte Liste und füge sie direkt in YouTube Studio ein.' },
      ],
      'youtube-description-generator': [
        { title: 'Format wählen & Details eingeben', body: 'Wähle dein Videoformat (Tutorial, Review, Vlog, Gaming oder Podcast) und trage Titel, Einleitungs-Hook und Kernpunkte ein.' },
        { title: 'Kapitel-Timestamps & Links ergänzen', body: 'Erstelle Zeitstempel (00:00 Intro etc.), trage Social-Media-Handles, Affiliate-Links und Community-Verlinkungen ein.' },
        { title: 'Prüfen & in Studio einfügen', body: 'Überprüfe den sichtbaren Vorschautext vor dem "Mehr anzeigen"-Umbruch sowie das 5.000-Zeichen-Limit und kopiere die Beschreibung.' },
      ],
      'youtube-link-generator': [
        { title: 'Zeitstempel · Videolink einfügen', body: 'Kopieren Sie die URL aus der Adressleiste oder über Teilen. watch-, youtu.be-, Shorts-, Live-, Embed- und Mobil-Links funktionieren.' },
        { title: 'Zeitstempel · Startzeit eingeben', body: 'Geben Sie 90, 1:30, 1:02:03 oder 1m30s ein. Prüfen Sie die erkannte Zeit und fügen Sie weitere Zeitstempel hinzu, wenn Sie eine Liste brauchen.' },
        { title: 'Zeitstempel · Kopieren und testen', body: 'Kopieren Sie Kurzlink, vollständigen Link oder Einbettungscode und öffnen Sie den Link einmal, um den Startpunkt zu prüfen.' },
        { title: 'Abo-Link · Kanal eingeben', body: 'Fügen Sie Ihre Kanal-URL ein oder geben Sie Ihr @Handle ein. Kanal-IDs (UC…) und alte /c/- und /user/-URLs funktionieren ebenfalls.' },
        { title: 'Abo-Link · Link kopieren', body: 'Kopieren Sie den Link mit ?sub_confirmation=1. Angemeldete Zuschauer werden beim Öffnen gebeten, das Abo zu bestätigen.' },
        { title: 'Abo-Link · Teilen oder drucken', body: 'Fügen Sie ihn in Beschreibungen, angepinnte Kommentare und Link-in-Bio-Seiten ein oder laden Sie den QR-Code für Drucksachen und Stream-Overlays herunter.' },
      ],
      'youtube-profile-picture-resizer': [
        { title: 'Bild hochladen', body: 'Ziehen Sie ein JPG, PNG, WebP, GIF oder BMP hierher oder wählen Sie es aus. Es wird in Ihrem Browser verarbeitet und nie hochgeladen.' },
        { title: 'Kreis ausrichten', body: 'Verschieben und zoomen Sie im Quadrat. Halten Sie Gesicht, Logo oder Text im Kreis und prüfen Sie die helle und dunkle Vorschau.' },
        { title: 'In 800 × 800 exportieren', body: 'Wählen Sie PNG oder JPG, ergänzen Sie bei transparenten Logos eine Hintergrundfarbe, exportieren Sie und laden Sie das Bild in YouTube Studio unter Anpassung hoch.' },
      ],
      'youtube-thumbnail-downloader': [
        { title: 'Videolink einfügen', body: 'Kopiere die URL aus der Adressleiste oder über „Teilen“. Watch-, youtu.be-, Shorts-, Live-, Embed- und Mobil-Links funktionieren.' },
        { title: 'Größe wählen', body: 'Jede vorhandene Größe wird mit ihren Maßen angezeigt. Die maximale Auflösung (1280 × 720) ist am schärfsten, wenn es sie gibt.' },
        { title: 'Herunterladen oder kopieren', body: 'Klicke auf „JPG herunterladen“ oder kopiere die Bild-URL. Wird der Download blockiert, speichere das Bild aus dem geöffneten Tab.' },
      ],
      'youtube-thumbnail-tester': [
        { title: 'Thumbnail hochladen', body: 'Ziehe ein JPG, PNG, WebP oder GIF hinein oder wähle es aus. Füge eine zweite Version hinzu, um zwei Designs zu vergleichen.' },
        { title: 'Titel und Kanal eintragen', body: 'Gib den geplanten Titel, deinen Kanalnamen, die Videolänge und eine Aufrufzeile ein.' },
        { title: 'Jede Ansicht prüfen', body: 'Wechsle zwischen Startseite, Suche, Vorschlägen und Handy in Hell und Dunkel und prüfe, ob Motiv und Text auch klein lesbar sind.' },
      ],
      'youtube-timestamp-generator': [
        { title: 'Kapitelnotizen einfügen', body: 'Tippe oder füge ein Kapitel pro Zeile mit Startzeit ein, zum Beispiel 0:00 Intro. Die Zeit kann vor oder nach dem Titel stehen.' },
        { title: 'Markierte Probleme beheben', body: 'Achte darauf, dass die Liste bei 0:00 beginnt, mindestens drei Kapitel hat, aufsteigend ist und jedes Kapitel 10 Sekunden oder länger dauert.' },
        { title: 'In YouTube Studio kopieren', body: 'Wähle Trennzeichen und Zeitformat, kopiere die Liste, füge sie in die Videobeschreibung ein und speichere.' },
      ],
      'words-to-minutes-calculator': [
        { title: 'Skript einfügen', body: 'Füge das Skript ein oder gib eine Wortzahl ein. Japanische und koreanische Skripte wechseln automatisch zur Zeichenzählung.' },
        { title: 'Tempo wählen', body: 'Wähle langsam, mittel oder schnell oder gib nach einer gestoppten Lesminute dein eigenes Tempo ein.' },
        { title: 'Länge planen', body: 'Lies die geschätzte Zeit ab, vergleiche Tempi und setze eine Ziellänge, um zu sehen, wie viele Wörter du schreiben musst.' },
      ],
      'engagement-rate-calculator': [
        { title: 'Plattform wählen', body: 'Wählen Sie YouTube, Instagram oder TikTok. Likes und Kommentare bleiben beim Wechsel erhalten.' },
        { title: 'Zahlen eingeben', body: 'Kopieren Sie Aufrufe, Likes, Kommentare und weitere Werte aus Ihren Statistiken. Leere optionale Felder zählen als 0; für einen Durchschnitt können Sie bis zu 20 Beiträge einfügen.' },
        { title: 'Ergebnis lesen', body: 'Prüfen Sie die Rate, die verwendete Formel und den Anteil jeder Interaktion. Vergleichen Sie einen Beitrag mit Ihrem eigenen Durchschnitt.' },
      ],
    },
  },
  pt: {
    badge: 'Guia de execução',
    heading: 'Como utilizar esta ferramenta',
    subheading: 'Recomendações de fluxo de trabalho padrão para uma qualidade de publicação consistente',
    stepPrefix: 'PASSO',
    demonstration: {
      badge: 'Demonstração // Dados de exemplo',
      inspectionHeading: 'Inspeção de antes e depois',
      titleHeading: 'Exemplo de revisão do rascunho do título',
      calcHeading: 'Cenário de cálculo prático',
      inspectionSubheading: 'Um exemplo ilustrativo processado com esta ferramenta. A sua imagem e opções gerarão resultados específicos.',
      titleSubheading: 'Um exemplo editorial testado com as mesmas regras de títulos. Trata-se de uma sugestão de redação, não de uma reescrita automática.',
      calcSubheading: 'Estes dados são estimativas de demonstração, não garantias de receita do canal. Os cálculos usam as mesmas fórmulas da calculadora.',
      beforeLabel: 'Antes',
      afterLabel: 'Depois',
      downloadOriginal: 'Descarregar original',
      downloadProcessed: 'Descarregar imagem tratada',
      beforeDraft: 'Antes: Rascunho inicial',
      afterDraft: 'Depois: Rascunho melhorado',
    },
    tools: {
      'logo-background-remover': [
        { title: 'Escolha o seu logótipo', body: 'Selecione uma imagem estática JPEG, PNG ou WebP com fundo sólido. A cor inicial é detetada no píxel superior esquerdo.' },
        { title: 'Remova o fundo', body: 'Confirme a tonalidade e ajuste a tolerância. Clique em Remover fundo para processar as margens conectadas.' },
        { title: 'Inspecione e descarregue', body: 'Verifique os rebordos nos modos claro, escuro e axadrezado e descarregue o ficheiro PNG transparente.' },
      ],
      'youtube-thumbnail-resizer': [
        { title: 'Defina a tela de trabalho', body: 'Escolha um modelo predefinido (miniatura 16:9, banner, imagem de perfil) e importe o seu ficheiro.' },
        { title: 'Ajuste o enquadramento', body: 'Calibre o corte central ou adicione margens limpas. As guias de referência garantem que os elementos cruciais ficam visíveis.' },
        { title: 'Redimensione e exporte', body: 'Processe em 1280×720 HD, descarregue a imagem e confira o resultado na pré-visualização do YouTube Studio.' },
      ],
      'youtube-thumbnail-compressor': [
        { title: 'Selecione as suas miniaturas', body: 'Carregue de 1 a 10 imagens (até 20 MB cada). O processamento ocorre 100% no seu navegador sem envio para servidores.' },
        { title: 'Defina o tamanho pretendido', body: 'Ajuste o limite abaixo do teto de 2 MB do YouTube Studio para telemóveis e escolha o formato final (JPEG/PNG/WebP).' },
        { title: 'Compare a qualidade e guarde', body: 'Examine a nitidez e o peso final. Descarregue cada ficheiro individualmente ou num arquivo ZIP unificado.' },
      ],
      'youtube-shorts-safe-zone': [
        { title: 'Selecione um fotograma', body: 'Exporte um quadro representativo do seu vídeo vertical e carregue o ficheiro em JPEG ou PNG.' },
        { title: 'Calibre as zonas seguras', body: 'Ajuste as margens de proteção para garantir que botões de gosto, comentários e o nome do canal não tapam legendas.' },
        { title: 'Exporte a imagem de guia', body: 'Descarregue o PNG anotado com a grelha e sobreponha-o na linha de tempo do seu programa de edição de vídeo.' },
      ],
      'youtube-title-checker': [
        { title: 'Introduza um rascunho', body: 'Cole o seu título e, opcionalmente, adicione uma frase-chave exata que deseja verificar.' },
        { title: 'Analise o feedback', body: 'Verifique a contagem de carateres, espaços, pontuação e posição da palavra-chave. Simule a quebra de linha em diferentes ecrãs.' },
        { title: 'Ajuste o texto', body: 'Edite o título diretamente e copie-o quando estiver pronto. Confirme a precisão e aceitação final no YouTube Studio.' },
      ],
      'youtube-revenue-calculator': [
        { title: 'Insira as visualizações', body: 'Utilize os seus números reais ou projeções de planeamento. Para Shorts, use visualizações qualificadas.' },
        { title: 'Defina a faixa de RPM', body: 'Introduza as estimativas líquidas de RPM (mínima e máxima) já após a dedução da percentagem da plataforma.' },
        { title: 'Calcule as projeções', body: 'Compare cenários mensais e anuais para estabelecer metas comerciais sólidas para o seu canal.' },
      ],
      'youtube-rpm-calculator': [
        { title: 'Defina o período de análise', body: 'Consulte os relatórios analíticos do YouTube e reúna os rendimentos líquidos e visualizações das mesmas datas.' },
        { title: 'Preencha os valores', body: 'Introduza os rendimentos em USD e o número exato de visualizações correspondentes.' },
        { title: 'Calcule o seu RPM real', body: 'Descubra a sua receita líquida por cada 1.000 visualizações, separada do CPM bruto faturado aos anunciantes.' },
      ],
      'youtube-watch-hours-calculator': [
        { title: 'Defina o ponto de partida', body: 'Insira as horas de visualização públicas atuais e a meta pretendida (ex.: 4.000 h para monetização).' },
        { title: 'Indique o seu ritmo', body: 'Introduza as horas adicionadas mensalmente e a duração média de visualização em minutos.' },
        { title: 'Consulte o calendário', body: 'Veja quantas horas e visualizações faltam e em quanto tempo alcançará a meta mantendo o ritmo.' },
      ],
      'youtube-monetization-calculator': [
        { title: 'Projete os ganhos de anúncios', body: 'Introduza as visualizações mensais e o RPM da plataforma para estimar a receita base do AdSense.' },
        { title: 'Adicione patrocínios e custos', body: 'Some parcerias comerciais, membros do canal e comissões de afiliados, deduzindo os custos de produção.' },
        { title: 'Analise o lucro líquido', body: 'Examine o rendimento mensal e anual após custos antes de impostos para manter a sustentabilidade.' },
      ],
      'youtube-banner-size': [
        { title: 'Carregar arte do banner', body: 'Selecione a imagem do banner do seu canal em formato JPEG, PNG ou WebP com até 20 MB.' },
        { title: 'Calibrar área segura', body: 'Mantenha textos, títulos e logotipos dentro da zona de segurança central de 1546 × 423 px para todos os dispositivos.' },
        { title: 'Exportar 2560 × 1440', body: 'Baixe o banner calibrado em resolução total de 2560 × 1440 e envie para o YouTube Studio.' },
      ],
      'youtube-channel-name-generator': [
        { title: 'Digite palavras-chave e nicho', body: 'Introduza os tópicos principais ou nicho do canal (ex.: tecnologia, games, culinária, finanças).' },
        { title: 'Escolha o estilo do nome', body: 'Selecione o arquétipo de marca desejado (moderno, marcante, clássico ou minimalista) e o tamanho.' },
        { title: 'Verifique e garanta o @handle', body: 'Analise as ideias geradas, confirme a disponibilidade do identificador @handle no YouTube Studio e guarde os favoritos.' },
      ],
      'youtube-tag-generator': [
        { title: 'Digite o tema ou título do vídeo', body: 'Insira o tema principal, título provisório ou palavra-chave de foco no gerador.' },
        { title: 'Selecione tags e clusters', body: 'Revise tags primárias, variações, perguntas long-tail e temas amplos, mantendo-se dentro do limite de 500 caracteres.' },
        { title: 'Copie e cole no YouTube Studio', body: 'Clique em Copiar tudo para exportar a lista formatada por vírgulas e cole diretamente no YouTube Studio.' },
      ],
      'youtube-description-generator': [
        { title: 'Escolha o formato e dados do vídeo', body: 'Selecione o estilo do vídeo (tutorial, análise, vlog, games ou podcast) e insira título, gancho inicial e tópicos principais.' },
        { title: 'Adicione capítulos e links úteis', body: 'Insira os marcadores de tempo (00:00 Início, etc.), redes sociais, links de afiliados e canais da comunidade.' },
        { title: 'Verifique e copie para o Studio', body: 'Confira a prévia antes do botão "Mostrar mais" e o limite de 5.000 caracteres, copiando a descrição com um clique para o YouTube Studio.' },
      ],
      'youtube-link-generator': [
        { title: 'Minuto · Cole o link do vídeo', body: 'Copie a URL da barra de endereços ou do botão Compartilhar. Links watch, youtu.be, Shorts, lives, embed e mobile funcionam.' },
        { title: 'Minuto · Digite o início', body: 'Digite 90, 1:30, 1:02:03 ou 1m30s. Confira o tempo interpretado e adicione outros minutos se precisar de uma lista.' },
        { title: 'Minuto · Copie e teste', body: 'Copie o link curto, o completo ou o código de incorporação e abra o link uma vez para conferir onde ele começa.' },
        { title: 'Inscrição · Digite seu canal', body: 'Cole a URL do canal ou digite seu @identificador. IDs de canal (UC…) e URLs antigas /c/ e /user/ também funcionam.' },
        { title: 'Inscrição · Copie o link', body: 'Copie o link com ?sub_confirmation=1. Quem abrir com a conta conectada verá a confirmação de inscrição.' },
        { title: 'Inscrição · Compartilhe ou imprima', body: 'Adicione em descrições, comentários fixados e link na bio, ou baixe o QR code para impressos e overlays de live.' },
      ],
      'youtube-profile-picture-resizer': [
        { title: 'Envie sua imagem', body: 'Arraste ou escolha um JPG, PNG, WebP, GIF ou BMP. Ele é processado no seu navegador e nunca enviado.' },
        { title: 'Ajuste o círculo', body: 'Arraste e dê zoom dentro do quadrado. Mantenha rosto, logo ou texto dentro do círculo e confira as prévias clara e escura.' },
        { title: 'Exporte em 800 × 800', body: 'Escolha PNG ou JPG, adicione uma cor de fundo para logos transparentes, exporte e envie na seção Personalização do YouTube Studio.' },
      ],
      'youtube-thumbnail-downloader': [
        { title: 'Cole o link do vídeo', body: 'Copie a URL da barra de endereço ou do botão Compartilhar. Links watch, youtu.be, Shorts, lives, embed e mobile funcionam.' },
        { title: 'Escolha um tamanho', body: 'Cada tamanho disponível aparece com as medidas. A resolução máxima (1280 × 720) é a mais nítida quando existe.' },
        { title: 'Baixe ou copie', body: 'Clique em Baixar JPG para salvar ou copie a URL da imagem. Se o download for bloqueado, salve a imagem pela aba que abrir.' },
      ],
      'youtube-thumbnail-tester': [
        { title: 'Envie sua thumbnail', body: 'Arraste ou escolha um JPG, PNG, WebP ou GIF. Adicione uma segunda versão para comparar dois designs.' },
        { title: 'Adicione título e canal', body: 'Digite o título que vai publicar, o nome do canal, a duração do vídeo e uma linha de visualizações.' },
        { title: 'Confira cada layout', body: 'Alterne entre Início, Busca, Sugeridos e Celular nos modos claro e escuro e confira se o assunto e o texto continuam legíveis em tamanho pequeno.' },
      ],
      'youtube-timestamp-generator': [
        { title: 'Cole suas anotações', body: 'Digite ou cole um capítulo por linha com o tempo de início, por exemplo 0:00 Introdução. O tempo pode vir antes ou depois do título.' },
        { title: 'Corrija o que for apontado', body: 'Confira se a lista começa em 0:00, tem pelo menos três capítulos, está em ordem e se cada capítulo dura 10 segundos ou mais.' },
        { title: 'Copie para o YouTube Studio', body: 'Escolha o separador e o formato do tempo, copie a lista, cole na descrição do vídeo e salve.' },
      ],
      'words-to-minutes-calculator': [
        { title: 'Cole seu roteiro', body: 'Cole o roteiro ou digite o número de palavras. Roteiros em japonês e coreano passam a contar caracteres automaticamente.' },
        { title: 'Escolha um ritmo', body: 'Selecione lento, médio ou rápido, ou digite seu próprio ritmo depois de cronometrar um minuto de leitura.' },
        { title: 'Planeje a duração', body: 'Veja o tempo estimado, compare ritmos e defina uma duração desejada para saber quantas palavras escrever.' },
      ],
      'engagement-rate-calculator': [
        { title: 'Escolha a plataforma', body: 'Selecione YouTube, Instagram ou TikTok. Curtidas e comentários continuam preenchidos quando você troca.' },
        { title: 'Digite os números', body: 'Copie visualizações, curtidas, comentários e outros números das suas estatísticas. Campos opcionais vazios contam como 0; você também pode colar até 20 posts para ter a média.' },
        { title: 'Leia o resultado', body: 'Confira a taxa, a fórmula usada e a fatia de cada interação. Compare um post com a sua própria média.' },
      ],
    },
  },
  ko: {
    badge: '실행 플레이북',
    heading: '이 도구 사용 방법',
    subheading: '일관된 게시 품질을 위한 표준 워크플로 권장사항',
    stepPrefix: '단계',
    demonstration: {
      badge: '데모 // 샘플 입력',
      inspectionHeading: '전후 비교 검사',
      titleHeading: '제목 초안 수정 예시',
      calcHeading: '계산 시나리오 실례',
      inspectionSubheading: '이 도구로 처리된 가상의 예시입니다. 실제 이미지와 설정에 따라 결과가 달라집니다.',
      titleSubheading: '동일한 제목 분석 로직으로 검토한 편집 예시입니다. 이는 표현 선택안이며 자동 수정이 아닙니다.',
      calcSubheading: '데모용 가정값이며 실제 채널 수익 보장이 아닙니다. 계산 결과는 위 계산기와 동일한 수식을 사용합니다.',
      beforeLabel: '적용 전',
      afterLabel: '적용 후',
      downloadOriginal: '원본 이미지 다운로드',
      downloadProcessed: '처리된 이미지 다운로드',
      beforeDraft: '수정 전: 원본 초안',
      afterDraft: '수정 후: 다듬어진 초안',
    },
    tools: {
      'logo-background-remover': [
        { title: '로고 이미지 선택', body: '단색 배경의 정지 JPEG, PNG, WebP 이미지를 선택합니다. 좌측 상단 픽셀 색상을 기준으로 배경을 감지합니다.' },
        { title: '배경 투명화 실행', body: '추출할 색상을 확인하고 허용 오차를 조정한 후 [배경 제거]를 눌러 외곽 테두리를 투명화합니다.' },
        { title: '경계면 검사 및 저장', body: '라이트, 다크, 격자 무늬 배경에서 외곽선을 확인하고 투명 PNG 파일을 다운로드합니다.' },
      ],
      'youtube-thumbnail-resizer': [
        { title: '캔버스 규격 선택', body: '16:9 썸네일, 배너, 프로필 사진 프리셋 중 하나를 선택한 뒤 이미지 파일을 업로드합니다.' },
        { title: '프레이밍 및 여백 조절', body: '비율에 맞춰 자르거나 여백을 채웁니다. 원형 가이드라인을 참조하여 핵심 요소를 중앙에 배치합니다.' },
        { title: '리사이즈 및 결과 점검', body: '1280×720 HD 해상도로 변환한 뒤 다운로드하여 YouTube Studio 등록 화면에서 확인합니다.' },
      ],
      'youtube-thumbnail-compressor': [
        { title: '썸네일 파일 추가', body: '최대 20MB 용량의 썸네일 1~10장을 선택합니다. 파일은 외부 서버 전송 없이 브라우저 내에서 안전하게 처리됩니다.' },
        { title: '목표 용량 슬라이더 설정', body: 'YouTube Studio 모바일 업로드 한도인 2MB 이하로 용량을 설정하고 원하는 출력 포맷을 지정합니다.' },
        { title: '품질 비교 및 일괄 다운로드', body: '압축 결과를 확인한 후 개별 파일로 받거나 ZIP 압축 파일로 한 번에 다운로드합니다.' },
      ],
      'youtube-shorts-safe-zone': [
        { title: '대표 프레임 추출', body: '쇼츠 세로 영상에서 주요 장면을 정지 이미지(JPEG/PNG)로 캡처하여 업로드합니다.' },
        { title: '세로 안전 영역 점검', body: '좋아요, 댓글, 채널 핸들이 배치되는 우측 및 하단 오버레이와 자막이 겹치지 않는지 확인합니다.' },
        { title: '가이드 오버레이 저장', body: '안내선이 표시된 PNG 가이드를 내려받아 영상 편집 소프트웨어의 타임라인에 얹어 활용합니다.' },
      ],
      'youtube-title-checker': [
        { title: '제목 초안 작성', body: '작성한 영상 제목을 입력하고, 검색 노출을 노리는 핵심 키워드가 있다면 함께 입력합니다.' },
        { title: '피드백 분석 확인', body: '글자 수 단위, 공백, 문장 부호 및 모바일 화면 50자 잘림 기준선을 미리 점검합니다.' },
        { title: '표현 다듬기 및 복사', body: '피드백을 바탕으로 핵심 훅을 앞쪽으로 재배치한 뒤 완성된 제목을 YouTube Studio에 붙여넣습니다.' },
      ],
      'youtube-revenue-calculator': [
        { title: '월간 예상 조회수 입력', body: '현재 채널의 월간 조회수나 목표 수치를 입력합니다. 쇼츠 영상은 적격 조회수를 기준으로 합니다.' },
        { title: '예상 RPM 범위 설정', body: '플랫폼 수수료를 공제한 후 크리에이터가 수령하는 실수령 RPM(최저/최고)을 입력합니다.' },
        { title: '시나리오 수익 분석', body: '월별 및 연간 예상 수익을 확인하고 콘텐츠 제작 목표 설정에 활용합니다.' },
      ],
      'youtube-rpm-calculator': [
        { title: '분석 기간 일치 확인', body: 'YouTube 스튜디오 통계에서 동일한 날짜 범위의 크리에이터 실수령액과 조회수를 확인합니다.' },
        { title: '정확한 수치 입력', body: 'USD 기준 총 수익과 해당 기간의 총 조회수를 입력합니다.' },
        { title: '1,000회당 실수령 RPM 확인', body: '조회수 1,000회당 실제 순수익을 산출합니다. 광고주가 지불하는 총 CPM과는 구분되는 실수령 지표입니다.' },
      ],
      'youtube-watch-hours-calculator': [
        { title: '현재 실적 및 목표 입력', body: '현재까지 달성한 공개 시청 시간과 수익 창출 자격 목표(예: 4,000시간)를 입력합니다.' },
        { title: '월별 업로드 페이스 설정', body: '매월 추가로 발생하는 시청 시간과 영상당 평균 시청 지속 시간(분)을 입력합니다.' },
        { title: '달성 예상 일정 점검', body: '남은 시청 시간과 필요 조회수, 현재 페이스를 유지할 때의 목표 달성 예정일을 파악합니다.' },
      ],
      'youtube-monetization-calculator': [
        { title: '기본 광고 수익 설정', body: '월간 예상 조회수와 채널 RPM을 입력하여 AdSense 기본 수익을 산출합니다.' },
        { title: '협찬 및 제작비용 입력', body: '브랜드 스폰서십, 멤버십, 제휴 링크 수입을 더하고 외주 제작비 등 비용을 차감합니다.' },
        { title: '순수익 시나리오 확인', body: '비용을 공제한 월간 및 연간 세전 순수익을 확인하여 지속 가능한 채널 운영을 도모합니다.' },
      ],
      'youtube-banner-size': [
        { title: '채널 배너 아트 업로드', body: '최대 20MB 용량의 JPEG, PNG 또는 WebP 형식의 유튜브 채널 배너 이미지를 선택합니다.' },
        { title: '안전 영역(Safe Area) 교정', body: '모바일과 데스크톱 모두에서 잘리지 않는 중앙 1546 × 423 안전 영역 안에 핵심 로고와 텍스트를 배치합니다.' },
        { title: '2560 × 1440 배너 다운로드', body: '최적화된 2560 × 1440 해상도 배너를 내보내고 YouTube Studio에 등록하여 미리보기를 확인합니다.' },
      ],
      'youtube-channel-name-generator': [
        { title: '키워드 및 카테고리 입력', body: '채널의 핵심 주제, 다룰 콘텐츠 키워드(예: 테크, 마인크래프트, 요리, 재테크)를 입력합니다.' },
        { title: '작명 스타일 및 길이 선택', body: '원하는 브랜드 분위기(트렌디, 정통, 개성, 미니멀)와 적절한 단어 길이를 지정합니다.' },
        { title: '@핸들 선점 및 즐겨찾기 저장', body: '추천된 이름들을 살펴보고 YouTube Studio에서 @핸들 중복 여부를 확인한 뒤 관심 목록에 저장합니다.' },
      ],
      'youtube-tag-generator': [
        { title: '동영상 주제 또는 가제목 입력', body: '생성기에 영상의 핵심 주제, 작업 중인 제목 또는 노리고자 하는 메인 키워드를 입력합니다.' },
        { title: '태그 및 키워드 클러스터 선택', body: '추출된 메인, 파생어, 롱테일 질문형 태그를 확인하고 500자 제한에 맞춰 원하는 태그를 선택합니다.' },
        { title: '복사 후 YouTube Studio에 붙여넣기', body: '모두 복사를 눌러 쉼표로 구분된 태그 목록을 복사한 뒤 YouTube Studio 태그 입력창에 붙여넣습니다.' },
      ],
      'youtube-description-generator': [
        { title: '포맷 선택 및 기본 정보 입력', body: '동영상 유형(튜토리얼, 리뷰, 브이로그, 게임, 팟캐스트)을 선택하고 제목, 상단 후킹 요약문, 핵심 내용을 입력합니다.' },
        { title: '타임스탬프 챕터 및 링크 설정', body: '00:00 시작 챕터 타임스탬프, SNS 계정, 추천 장비 제휴 링크 및 커뮤니티 링크를 체계적으로 구성합니다.' },
        { title: '더보기 접힘선 점검 후 복사', body: "모바일 '더보기' 전 노출되는 3줄 요약과 5,000자 제한을 확인한 뒤 설명란 전체를 한 번에 복사하여 YouTube Studio에 등록합니다." },
      ],
      'youtube-link-generator': [
        { title: '시간 지정 · 동영상 링크 붙여 넣기', body: '주소창이나 공유 버튼에서 URL을 복사하세요. watch, youtu.be, 쇼츠, 라이브, 퍼가기, 모바일 링크를 지원합니다.' },
        { title: '시간 지정 · 시작 시간 입력', body: '90, 1:30, 1:02:03 또는 1m30s로 입력하고 표시된 시간을 확인하세요. 목록이 필요하면 타임스탬프를 추가합니다.' },
        { title: '시간 지정 · 복사 후 확인', body: '짧은 링크, 전체 링크 또는 퍼가기 코드를 복사하고 링크를 한 번 열어 원하는 지점에서 시작하는지 확인하세요.' },
        { title: '구독 · 채널 입력', body: '채널 URL을 붙여 넣거나 @핸들을 입력하세요. 채널 ID(UC…)와 예전 /c/, /user/ URL도 사용할 수 있습니다.' },
        { title: '구독 · 링크 복사', body: '?sub_confirmation=1이 붙은 링크를 복사하세요. 로그인한 시청자가 열면 구독 확인 창이 나타납니다.' },
        { title: '구독 · 공유 또는 인쇄', body: '설명란, 고정 댓글, 프로필 링크에 추가하거나 QR 코드를 다운로드해 인쇄물과 방송 오버레이에 사용하세요.' },
      ],
      'youtube-profile-picture-resizer': [
        { title: '이미지 업로드', body: 'JPG, PNG, WebP, GIF, BMP를 끌어다 놓거나 선택하세요. 브라우저 안에서 처리되며 업로드되지 않습니다.' },
        { title: '원에 맞춰 배치', body: '정사각형 안에서 드래그하고 확대하세요. 얼굴, 로고, 글자를 원 안에 두고 라이트·다크 미리보기를 확인합니다.' },
        { title: '800 × 800으로 내보내기', body: 'PNG나 JPG를 고르고, 투명 로고라면 배경색을 넣어 내보낸 뒤 YouTube 스튜디오의 맞춤설정에서 업로드하세요.' },
      ],
      'youtube-thumbnail-downloader': [
        { title: '동영상 링크 붙여 넣기', body: '주소창이나 공유 버튼에서 URL을 복사하세요. watch, youtu.be, 쇼츠, 라이브, 퍼가기, 모바일 링크를 모두 지원합니다.' },
        { title: '크기 선택', body: '동영상에 있는 크기가 치수와 함께 표시됩니다. 최대 해상도(1280 × 720)가 있으면 가장 선명합니다.' },
        { title: '다운로드 또는 복사', body: 'JPG 다운로드를 클릭해 저장하거나 이미지 URL을 복사하세요. 다운로드가 막히면 새로 열린 탭에서 이미지를 저장하세요.' },
      ],
      'youtube-thumbnail-tester': [
        { title: '썸네일 업로드', body: 'JPG, PNG, WebP, GIF를 끌어 놓거나 선택하세요. 두 디자인을 비교하려면 두 번째 버전을 추가하세요.' },
        { title: '제목과 채널 입력', body: '게시할 제목, 채널 이름, 동영상 길이, 조회수 줄을 입력하세요.' },
        { title: '레이아웃별로 확인', body: '홈, 검색, 추천, 모바일을 라이트·다크 모드로 바꿔 보며 작은 크기에서도 주제와 글자가 잘 보이는지 확인하세요.' },
      ],
      'youtube-timestamp-generator': [
        { title: '챕터 메모 붙여 넣기', body: '한 줄에 챕터 하나를 시작 시간과 함께 입력하거나 붙여 넣으세요. 예: 0:00 인트로. 시간은 제목 앞이나 뒤에 와도 됩니다.' },
        { title: '표시된 문제 고치기', body: '0:00으로 시작하는지, 챕터가 3개 이상인지, 시간순인지, 모든 챕터가 10초 이상인지 확인하세요.' },
        { title: 'YouTube 스튜디오에 복사', body: '구분 기호와 시간 표기를 고르고 목록을 복사해 동영상 설명란에 붙여 넣은 뒤 저장하세요.' },
      ],
      'words-to-minutes-calculator': [
        { title: '대본 붙여 넣기', body: '대본을 붙여 넣거나 분량을 입력하세요. 한국어와 일본어 대본은 자동으로 글자수로 계산합니다.' },
        { title: '속도 고르기', body: '느리게, 보통, 빠르게 중에서 고르거나, 1분 동안 읽어 보고 잰 내 속도를 입력하세요.' },
        { title: '길이 계획하기', body: '예상 시간을 확인하고, 속도별로 비교하고, 목표 길이를 넣어 필요한 분량을 확인하세요.' },
      ],
      'engagement-rate-calculator': [
        { title: '플랫폼 선택', body: '유튜브, 인스타그램, 틱톡 중에서 고르세요. 바꿔도 좋아요와 댓글 값은 그대로 남습니다.' },
        { title: '숫자 입력', body: '분석 화면에서 조회수, 좋아요, 댓글 등을 복사하세요. 비워 둔 선택 항목은 0으로 계산되며, 최대 20개 게시물을 붙여 넣어 평균을 낼 수도 있습니다.' },
        { title: '결과 확인', body: '참여율, 사용한 공식, 반응별 비중을 확인하고 게시물 하나를 내 평균과 비교하세요.' },
      ],
    },
  },
  it: {
    badge: 'Guida di esecuzione',
    heading: 'Come utilizzare questo strumento',
    subheading: 'Consigli per un flusso di lavoro standard e una qualità di pubblicazione costante',
    stepPrefix: 'PASSAGGIO',
    demonstration: {
      badge: 'Dimostrazione // Dati di esempio',
      inspectionHeading: 'Ispezione prima e dopo',
      titleHeading: 'Esempio di revisione della bozza del titolo',
      calcHeading: 'Scenario di calcolo pratico',
      inspectionSubheading: 'Un esempio illustrativo elaborato con questo strumento. Le tue immagini e impostazioni produrranno risultati specifici.',
      titleSubheading: 'Un esempio editoriale analizzato con gli stessi criteri di titolazione. È una proposta di formulazione, non una riscrittura automatica.',
      calcSubheading: 'Queste sono ipotesi dimostrative, non garanzie di guadagno reale. I risultati utilizzano le stesse formule del calcolatore.',
      beforeLabel: 'Prima',
      afterLabel: 'Dopo',
      downloadOriginal: 'Scarica originale',
      downloadProcessed: 'Scarica file elaborato',
      beforeDraft: 'Prima: Bozza originale',
      afterDraft: 'Dopo: Bozza rifinita',
    },
    tools: {
      'logo-background-remover': [
        { title: 'Scegli il tuo logo', body: 'Seleziona un\'immagine statica JPEG, PNG o WebP con sfondo a tinta unita. Il colore iniziale viene rilevato in alto a sinistra.' },
        { title: 'Rimuovi lo sfondo', body: 'Verifica la tinta e regola la tolleranza. Clicca su Rimuovi sfondo per rendere trasparenti le aree collegate al bordo.' },
        { title: 'Ispeziona e scarica', body: 'Controlla i contorni su sfondi chiaro, scuro e a scacchiera, quindi scarica il tuo file PNG trasparente.' },
      ],
      'youtube-thumbnail-resizer': [
        { title: 'Imposta la tela grafica', body: 'Scegli un predefinito (miniatura 16:9, banner, immagine profilo) e carica la tua immagine.' },
        { title: 'Regola l\'inquadratura', body: 'Modifica il ritaglio o aggiungi margini neutri. Le guide ti aiutano a posizionare gli elementi chiave senza deformazioni.' },
        { title: 'Ridimensiona e verifica', body: 'Esporta in 1280×720 HD, scarica l\'immagine e controlla l\'anteprima finale su YouTube Studio.' },
      ],
      'youtube-thumbnail-compressor': [
        { title: 'Carica le tue miniature', body: 'Seleziona da 1 a 10 immagini (fino a 20 MB ciascuna). L\'elaborazione avviene al 100% nel tuo browser senza upload esterni.' },
        { title: 'Imposta il peso desiderato', body: 'Regola il cursore sotto la soglia di 2 MB imposta dall\'app mobile di YouTube Studio e scegli il formato di output.' },
        { title: 'Controlla la nitidezza e salva', body: 'Verifica la qualità visiva e scarica i file singolarmente oppure raccolti in un comodo archivio ZIP compresso.' },
      ],
      'youtube-shorts-safe-zone': [
        { title: 'Estrai un fotogramma', body: 'Esporta un frame rappresentativo del tuo video verticale Shorts e caricalo in formato JPEG o PNG.' },
        { title: 'Verifica le zone di sicurezza', body: 'Regola i margini per assicurarti che i pulsanti di like, commento e il nome del canale non coprano i testi.' },
        { title: 'Esporta la guida PNG', body: 'Scarica la griglia trasparente con le guide e sovrapponila sulla timeline del tuo software di montaggio video.' },
      ],
      'youtube-title-checker': [
        { title: 'Inserisci la bozza del titolo', body: 'Incolla il titolo pianificato e aggiungi eventualmente la parola chiave esatta che desideri posizionare.' },
        { title: 'Analizza i suggerimenti', body: 'Verifica lunghezza caratteri, spaziature, punteggiatura e il punto di troncamento sui display mobili (50 caratteri).' },
        { title: 'Perfeziona il testo', body: 'Riformula il titolo per posizionare il gancio emotivo all\'inizio e copialo pronto per YouTube Studio.' },
      ],
      'youtube-revenue-calculator': [
        { title: 'Inserisci le visualizzazioni', body: 'Indica le visualizzazioni mensili stimate. Per gli Shorts, fai riferimento alle visualizzazioni idonee.' },
        { title: 'Definisci la forbice di RPM', body: 'Imposta le stime minime e massime di RPM netto spettante al creator, dopo la quota trattenuta da YouTube.' },
        { title: 'Calcola le proiezioni', body: 'Confronta i risultati mensili e annuali per pianificare la crescita economica del tuo canale.' },
      ],
      'youtube-rpm-calculator': [
        { title: 'Scegli il periodo di analisi', body: 'Raccogli le entrate nette del creator e le visualizzazioni relative allo stesso intervallo di date da YouTube Analytics.' },
        { title: 'Inserisci i dati corrispondenti', body: 'Indica il ricavo in USD e il volume esatto di visualizzazioni registrate.' },
        { title: 'Calcola il tuo RPM netto reale', body: 'Scopri il guadagno effettivo per ogni 1.000 visualizzazioni, distinto dal CPM lordo pagato dagli inserzionisti.' },
      ],
      'youtube-watch-hours-calculator': [
        { title: 'Inserisci la situazione attuale', body: 'Indica le ore di visualizzazione pubbliche accumulate e l\'obiettivo da raggiungere (es. 4.000 ore).' },
        { title: 'Specifica il ritmo di pubblicazione', body: 'Inserisci le ore mensili aggiunte e la durata media di visualizzazione in minuti per spettatore.' },
        { title: 'Consulta il calendario stimato', body: 'Scopri le ore rimanenti, le visualizzazioni necessarie e la data approssimativa di raggiungimento dell\'obiettivo.' },
      ],
      'youtube-monetization-calculator': [
        { title: 'Stima le entrate pubblicitarie', body: 'Inserisci visualizzazioni mensili e RPM per calcolare la base di guadagno da Google AdSense.' },
        { title: 'Aggiungi accordi commerciali e costi', body: 'Includi sponsorizzazioni, abbonamenti al canale e affiliazioni, sottraendo i costi di produzione video.' },
        { title: 'Analizza l\'utile netto', body: 'Esamina il margine operativo mensile e annuale prima delle imposte per garantire la sostenibilità del progetto.' },
      ],
      'youtube-banner-size': [
        { title: 'Carica l\'artwork del banner', body: 'Seleziona la grafica del banner del canale in formato JPEG, PNG o WebP fino a 20 MB.' },
        { title: 'Calibra la safe zone', body: 'Assicurati che loghi e testi chiave siano posizionati nella safe area centrale di 1546 × 423 px per tutti i dispositivi.' },
        { title: 'Esporta in 2560 × 1440', body: 'Scarica il banner ottimizzato in alta definizione 2560 × 1440 e caricalo su YouTube Studio.' },
      ],
      'youtube-channel-name-generator': [
        { title: 'Inserisci parole chiave e nicchia', body: 'Digita gli argomenti principali o la nicchia del tuo canale (es. tech, gaming, cucina, finanza).' },
        { title: 'Scegli lo stile del brand', body: 'Seleziona l\'archetipo desiderato (moderno, d\'impatto, classico o minimalista) e la lunghezza del nome.' },
        { title: 'Verifica e prenota l\'@handle', body: 'Esamina le idee generate, controlla la disponibilità dell\'@handle su YouTube Studio e salva i preferiti.' },
      ],
      'youtube-tag-generator': [
        { title: 'Inserisci argomento o titolo del video', body: 'Digita il tema principale, titolo provvisorio o parola chiave di riferimento nel generatore.' },
        { title: 'Seleziona tag e cluster', body: 'Esamina tag principali, varianti, query long-tail e argomenti ampi, rispettando il limite di 500 caratteri.' },
        { title: 'Copia e incolla in YouTube Studio', body: 'Fai clic su Copia tutto per ottenere l\'elenco separato da virgole e incollalo direttamente in YouTube Studio.' },
      ],
      'youtube-description-generator': [
        { title: 'Scegli il format e inserisci i dettagli', body: 'Seleziona lo stile video (tutorial, recensione, vlog, gaming o podcast) e digita titolo, hook iniziale e punti chiave.' },
        { title: 'Aggiungi capitoli e link utili', body: 'Configura i timestamp orari (00:00 Intro, ecc.), canali social, link di affiliazione e community.' },
        { title: 'Controlla e copia in YouTube Studio', body: 'Verifica l\'anteprima prima del pulsante "Mostra altro" e il limite di 5.000 caratteri, copiando la descrizione con un click.' },
      ],
      'youtube-link-generator': [
        { title: 'Minuto · Incolla il link del video', body: 'Copia l’URL dalla barra degli indirizzi o dal pulsante Condividi. Funzionano link watch, youtu.be, Shorts, live, embed e mobile.' },
        { title: 'Minuto · Inserisci l’inizio', body: 'Scrivi 90, 1:30, 1:02:03 o 1m30s. Controlla il tempo interpretato e aggiungi altri minuti se ti serve un elenco.' },
        { title: 'Minuto · Copia e verifica', body: 'Copia il link breve, quello completo o il codice di incorporamento e apri il link una volta per verificare da dove parte.' },
        { title: 'Iscrizione · Inserisci il canale', body: 'Incolla l’URL del canale o scrivi il tuo @handle. Funzionano anche gli ID canale (UC…) e i vecchi URL /c/ e /user/.' },
        { title: 'Iscrizione · Copia il link', body: 'Copia il link con ?sub_confirmation=1. Chi lo apre con l’accesso effettuato vede la conferma di iscrizione.' },
        { title: 'Iscrizione · Condividi o stampa', body: 'Aggiungilo a descrizioni, commenti fissati e link in bio, oppure scarica il codice QR per stampe e overlay delle dirette.' },
      ],
      'youtube-profile-picture-resizer': [
        { title: 'Carica l’immagine', body: 'Trascina o scegli un JPG, PNG, WebP, GIF o BMP. Viene elaborato nel browser e non viene mai caricato.' },
        { title: 'Inquadra il cerchio', body: 'Trascina e ingrandisci dentro il quadrato. Tieni volto, logo o testo dentro il cerchio e controlla le anteprime chiara e scura.' },
        { title: 'Esporta a 800 × 800', body: 'Scegli PNG o JPG, aggiungi un colore di sfondo per i loghi trasparenti, esporta e carica l’immagine nella sezione Personalizzazione di YouTube Studio.' },
      ],
      'youtube-thumbnail-downloader': [
        { title: 'Incolla il link del video', body: 'Copia l’URL dalla barra degli indirizzi o dal pulsante Condividi. Funzionano link watch, youtu.be, Shorts, live, embed e mobile.' },
        { title: 'Scegli una dimensione', body: 'Ogni dimensione disponibile appare con le sue misure. La risoluzione massima (1280 × 720) è la più nitida quando esiste.' },
        { title: 'Scarica o copia', body: 'Fai clic su Scarica JPG per salvarla o copia l’URL dell’immagine. Se il download è bloccato, salva l’immagine dalla scheda che si apre.' },
      ],
      'youtube-thumbnail-tester': [
        { title: 'Carica la miniatura', body: 'Trascina o scegli un JPG, PNG, WebP o GIF. Aggiungi una seconda versione per confrontare due design.' },
        { title: 'Aggiungi titolo e canale', body: 'Scrivi il titolo che pubblicherai, il nome del canale, la durata del video e una riga di visualizzazioni.' },
        { title: 'Controlla ogni layout', body: 'Passa da Home a Ricerca, Suggeriti e Mobile in chiaro e scuro, e verifica che soggetto e testo si leggano anche in piccolo.' },
      ],
      'youtube-timestamp-generator': [
        { title: 'Incolla gli appunti dei capitoli', body: 'Scrivi o incolla un capitolo per riga con il tempo di inizio, per esempio 0:00 Intro. Il tempo può stare prima o dopo il titolo.' },
        { title: 'Correggi ciò che viene segnalato', body: 'Controlla che l’elenco parta da 0:00, abbia almeno tre capitoli, sia in ordine e che ogni capitolo duri 10 secondi o più.' },
        { title: 'Copialo in YouTube Studio', body: 'Scegli separatore e formato del tempo, copia l’elenco, incollalo nella descrizione del video e salva.' },
      ],
      'words-to-minutes-calculator': [
        { title: 'Incolla il copione', body: 'Incolla il copione o inserisci il numero di parole. I copioni in giapponese e coreano passano automaticamente al conteggio dei caratteri.' },
        { title: 'Scegli un ritmo', body: 'Seleziona lento, medio o veloce, oppure inserisci il tuo ritmo dopo aver cronometrato un minuto di lettura.' },
        { title: 'Pianifica la durata', body: 'Leggi il tempo stimato, confronta i ritmi e imposta una durata desiderata per sapere quante parole scrivere.' },
      ],
      'engagement-rate-calculator': [
        { title: 'Scegli la piattaforma', body: 'Seleziona YouTube, Instagram o TikTok. Mi piace e commenti restano compilati quando cambi.' },
        { title: 'Inserisci i numeri', body: 'Copia visualizzazioni, mi piace, commenti e gli altri dati dalle statistiche. I campi facoltativi vuoti valgono 0; puoi anche incollare fino a 20 post per avere la media.' },
        { title: 'Leggi il risultato', body: 'Controlla il tasso, la formula usata e il peso di ogni interazione. Confronta un post con la tua media.' },
      ],
    },
  },
};

export interface ToolSeoContent {
  thumbnailSpecs: {
    heading: string;
    recommendedSize: string;
    recommendedSizeVal: string;
    aspectRatio: string;
    aspectRatioVal: string;
    maxSize: string;
    maxSizeVal: string;
    formats: string;
    formatsVal: string;
    note: string;
  };
  bannerSpecs: {
    heading: string;
    recommendedSize: string;
    recommendedSizeVal: string;
    safeArea: string;
    safeAreaVal: string;
    maxSize: string;
    maxSizeVal: string;
    formats: string;
    formatsVal: string;
    note: string;
    downloadTemplateBtn: string;
    cardTitle: string;
    cardBadge: string;
    cardDesc: string;
  };
  shortsTemplate: {
    heading: string;
    body: string;
    downloadBtn: string;
    cardTitle: string;
    cardBadge: string;
    cardDesc: string;
  };
  calculators: {
    revenueIntro: string;
    revenueHow: string;
    revenueDesc: string;
    rpmIntro: string;
    rpmHow: string;
    monetizationIntro: string;
    monetizationHow: string;
  };
}

export const toolSeoContent: Record<Locale, ToolSeoContent> = {
  en: {
    thumbnailSpecs: {
      heading: 'YouTube thumbnail size',
      recommendedSize: 'Recommended Size',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: 'Aspect Ratio',
      aspectRatioVal: '16:9',
      maxSize: 'Max File Size',
      maxSizeVal: "2 MB mobile, 50 MB desktop",
      formats: 'Formats',
      formatsVal: "JPG, PNG",
      note: "YouTube recommends 3840 × 2160 at 16:9, with a minimum width of 640 pixels; 1280 × 720 also works. Files can be up to 2 MB in the mobile app and 50 MB on desktop.",
    },
    bannerSpecs: {
      heading: 'YouTube banner size specifications',
      recommendedSize: 'Recommended Size',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: 'Safe Area (All Devices)',
      safeAreaVal: '1546 × 423 px',
      maxSize: 'Max File Size',
      maxSizeVal: 'Under 6 MB',
      formats: 'Formats',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: 'Official YouTube channel art specifications require 2560 × 1440 px with a 1546 × 423 px central safe zone for logos and text, and a maximum file size of 6 MB.',
      downloadTemplateBtn: 'Download Transparent PNG Banner Template (2560 × 1440)',
      cardTitle: 'YouTube Banner Safe Zone Template',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: 'Download the official transparent 2560×1440 PNG template with visible TV, desktop, tablet, and mobile safe zones to overlay in Photoshop, Figma, or Canva.',
    },
    shortsTemplate: {
      heading: 'YouTube Shorts safe zone template',
      body: 'Download our free transparent 1080×1920 PNG overlay template to ensure your titles, subtitles, and key visual actions never get blocked by Shorts player controls, channel icons, or sound discs.',
      downloadBtn: 'Download Transparent PNG Overlay (1080×1920)',
      cardTitle: 'Shorts Safe Zone Overlay Template',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: 'Download the transparent PNG template to drop directly onto your video timeline in Premiere Pro, DaVinci Resolve, Final Cut, CapCut, or Canva.',
    },
    calculators: {
      revenueIntro: 'Use this YouTube money calculator to turn monthly views and RPM assumptions into estimated revenue.',
      revenueHow: 'How the YouTube revenue calculator works',
      revenueDesc: 'Enter your monthly views and expected RPM range to model your earnings scenario. The calculator projects lower and upper monthly income alongside yearly revenue based on your exact parameters.',
      rpmIntro: 'Calculate your YouTube RPM to find earnings per 1,000 views from your own channel revenue and views.',
      rpmHow: 'How the YouTube RPM calculator works',
      monetizationIntro: 'Calculate total YouTube channel earnings across all income streams (ads, sponsors, affiliates) minus expenses.',
      monetizationHow: 'How the YouTube monetization calculator works',
    },
  },
  es: {
    thumbnailSpecs: {
      heading: 'Tamaño de miniatura de YouTube',
      recommendedSize: 'Medida recomendada',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: 'Relación de aspecto',
      aspectRatioVal: '16:9',
      maxSize: 'Peso máximo',
      maxSizeVal: "2 MB móvil, 50 MB ordenador",
      formats: 'Formatos',
      formatsVal: "JPG, PNG",
      note: "YouTube recomienda 3840 × 2160 en 16:9, con un ancho mínimo de 640 píxeles; 1280 × 720 también funciona. Hasta 2 MB en la app móvil y 50 MB en ordenador.",
    },
    bannerSpecs: {
      heading: 'Especificaciones del tamaño de banner de YouTube',
      recommendedSize: 'Medida recomendada',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: 'Zona segura (todos los dispositivos)',
      safeAreaVal: '1546 × 423 px',
      maxSize: 'Peso máximo',
      maxSizeVal: 'Menos de 6 MB',
      formats: 'Formatos',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: 'Las especificaciones oficiales de YouTube exigen 2560 × 1440 px con una zona segura central de 1546 × 423 px para textos y logos, y un peso menor a 6 MB.',
      downloadTemplateBtn: 'Descargar plantilla PNG transparente (2560 × 1440)',
      cardTitle: 'Plantilla de zona segura para banner',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: 'Descarga la plantilla PNG transparente oficial de 2560×1440 con las zonas seguras de TV, escritorio, tableta y móvil para usar en Photoshop, Figma o Canva.',
    },
    shortsTemplate: {
      heading: 'Plantilla de zona segura de YouTube Shorts',
      body: 'Descarga nuestra plantilla superpuesta PNG transparente de 1080×1920 gratis para asegurarte de que tus títulos, subtítulos y acciones clave nunca queden tapados por los controles de Shorts.',
      downloadBtn: 'Descargar plantilla PNG transparente (1080×1920)',
      cardTitle: 'Plantilla de zona segura de Shorts',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: 'Descarga la plantilla PNG transparente para usarla directamente en Premiere Pro, DaVinci Resolve, Final Cut, CapCut o Canva.',
    },
    calculators: {
      revenueIntro: 'Usa esta calculadora de dinero de YouTube para estimar ingresos mensuales a partir de tus visitas y RPM.',
      revenueHow: 'Cómo funciona la calculadora de ingresos de YouTube',
      revenueDesc: 'Ingresa tus visitas mensuales y rango de RPM para simular tus ingresos. La calculadora proyecta ganancias mensuales y anuales sin deducciones ocultas.',
      rpmIntro: 'Calcula tu RPM de YouTube para conocer las ganancias por cada 1.000 visitas a partir de los datos reales de tu canal.',
      rpmHow: 'Cómo funciona la calculadora de RPM de YouTube',
      monetizationIntro: 'Calcula los ingresos totales del canal en todas las fuentes (anuncios, patrocinios, afiliados) menos costes.',
      monetizationHow: 'Cómo funciona la calculadora de monetización de YouTube',
    },
  },
  ja: {
    thumbnailSpecs: {
      heading: 'YouTubeサムネイルのサイズ規格',
      recommendedSize: '推奨解像度',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: 'アスペクト比',
      aspectRatioVal: '16:9',
      maxSize: '最大容量',
      maxSizeVal: "モバイル2MB、PC 50MB",
      formats: '対応形式',
      formatsVal: "JPG, PNG",
      note: "YouTubeの推奨は3840 × 2160（16:9）、最小幅640ピクセルで、1280 × 720も使えます。容量はモバイルアプリで2MB、パソコンで50MBまでです。",
    },
    bannerSpecs: {
      heading: 'YouTubeバナーの公式サイズ規格',
      recommendedSize: '推奨解像度',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: '全端末セーフゾーン',
      safeAreaVal: '1546 × 423 px',
      maxSize: '最大容量',
      maxSizeVal: '6MB以下',
      formats: '対応形式',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: 'YouTube公式チャンネルアート規格では、2560×1440px解像度、文字やロゴが欠けない中央1546×423pxのセーフゾーン、6MB以下の容量が必須要件です。',
      downloadTemplateBtn: '透過PNGテンプレートをダウンロード (2560×1440)',
      cardTitle: 'バナーセーフゾーン テンプレート',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: 'Photoshop、Figma、Canvaでそのまま重ねて使える、TV・デスクトップ・タブレット・モバイルの各表示枠ガイド入り公式透明PNG画像をダウンロード。',
    },
    shortsTemplate: {
      heading: 'YouTubeショート セーフゾーン テンプレート',
      body: '1080×1920の無料透明PNGオーバーレイをダウンロードして、タイトルや字幕、重要な演出がショートの再生ボタンやUIに被るのを防ぎましょう。',
      downloadBtn: '透過PNGテンプレートをダウンロード (1080×1920)',
      cardTitle: 'Shortsセーフゾーン オーバーレイ テンプレート',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: 'Premiere Pro、DaVinci Resolve、Final Cut、CapCut、Canvaのタイムラインに重ねて使える透明ガイド画像をダウンロード。',
    },
    calculators: {
      revenueIntro: '月間再生回数と想定RPMを入力して、YouTube動画の推定月収および年収をシミュレーション。',
      revenueHow: 'YouTube収益計算ツールの仕組み',
      revenueDesc: '月間再生回数とRPMの想定幅を入力すると、プラットフォーム手数料を差し引いたクリエイターの手取り収益を自動算出します。',
      rpmIntro: '自身の総収益と再生回数から、1,000回再生あたりの純収益（RPM）を正確に計算。',
      rpmHow: 'YouTube RPM計算ツールの仕組み',
      monetizationIntro: '広告、企業案件、アフィリエイトなどの全収入から制作経費を差し引いて、純利益を算出。',
      monetizationHow: 'YouTube総合収益化シミュレーターの仕組み',
    },
  },
  fr: {
    thumbnailSpecs: {
      heading: 'Taille de miniature YouTube',
      recommendedSize: 'Taille recommandée',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: "Format d'image",
      aspectRatioVal: '16:9',
      maxSize: 'Poids maximal',
      maxSizeVal: "2 Mo mobile, 50 Mo ordinateur",
      formats: 'Formats acceptés',
      formatsVal: "JPG, PNG",
      note: "YouTube recommande 3840 × 2160 en 16:9, avec une largeur minimale de 640 pixels ; 1280 × 720 fonctionne aussi. Jusqu’à 2 Mo dans l’application mobile et 50 Mo sur ordinateur.",
    },
    bannerSpecs: {
      heading: 'Spécifications de la taille de bannière YouTube',
      recommendedSize: 'Taille recommandée',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: 'Zone de sécurité (tous écrans)',
      safeAreaVal: '1546 × 423 px',
      maxSize: 'Poids maximal',
      maxSizeVal: 'Moins de 6 Mo',
      formats: 'Formats acceptés',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: 'Les spécifications officielles de YouTube exigent 2560 × 1440 px avec une zone de sécurité centrale de 1546 × 423 px pour vos textes et logos, et un fichier de moins de 6 Mo.',
      downloadTemplateBtn: 'Télécharger le template PNG transparent (2560 × 1440)',
      cardTitle: 'Template de zone sécurisée de bannière',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: 'Téléchargez le template officiel PNG transparent 2560×1440 avec les repères TV, ordinateur, tablette et mobile pour Photoshop, Figma ou Canva.',
    },
    shortsTemplate: {
      heading: 'Template de zone de sécurité YouTube Shorts',
      body: "Téléchargez notre template overlay PNG transparent 1080×1920 gratuit pour éviter que vos titres, sous-titres et éléments clés ne soient masqués par l'interface des Shorts.",
      downloadBtn: 'Télécharger le template PNG transparent (1080×1920)',
      cardTitle: 'Template de zone de sécurité Shorts',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: 'Téléchargez le template PNG transparent pour le glisser directement sur votre piste vidéo dans Premiere Pro, DaVinci Resolve, Final Cut, CapCut ou Canva.',
    },
    calculators: {
      revenueIntro: "Utilisez ce calculateur d'argent YouTube pour convertir vos vues mensuelles et votre RPM en revenus estimés.",
      revenueHow: 'Comment fonctionne le calculateur de revenus YouTube',
      revenueDesc: 'Saisissez vos vues mensuelles et votre fourchette de RPM. Le calculateur projette vos revenus mensuels et annuels en toute transparence.',
      rpmIntro: 'Calculez votre RPM YouTube pour connaître vos gains réels pour 1 000 vues à partir des statistiques de votre chaîne.',
      rpmHow: 'Comment fonctionne le calculateur de RPM YouTube',
      monetizationIntro: 'Calculez vos revenus YouTube sur toutes vos sources (pubs, sponsors, affiliation) déduction faite des dépenses.',
      monetizationHow: 'Comment fonctionne le calculateur de monétisation YouTube',
    },
  },
  de: {
    thumbnailSpecs: {
      heading: 'YouTube-Thumbnail-Größe',
      recommendedSize: 'Empfohlene Maße',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: 'Seitenverhältnis',
      aspectRatioVal: '16:9',
      maxSize: 'Max. Dateigröße',
      maxSizeVal: "2 MB mobil, 50 MB Desktop",
      formats: 'Dateiformate',
      formatsVal: "JPG, PNG",
      note: "YouTube empfiehlt 3840 × 2160 im Format 16:9 bei mindestens 640 Pixeln Breite; 1280 × 720 funktioniert auch. Bis 2 MB in der mobilen App und 50 MB am Computer.",
    },
    bannerSpecs: {
      heading: 'YouTube-Banner-Größe & Richtlinien',
      recommendedSize: 'Empfohlene Maße',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: 'Sicherheitsbereich (alle Geräte)',
      safeAreaVal: '1546 × 423 px',
      maxSize: 'Max. Dateigröße',
      maxSizeVal: 'Unter 6 MB',
      formats: 'Dateiformate',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: 'Offizielle YouTube-Vorgaben verlangen 2560 × 1440 px mit einem zentralen Sicherheitsbereich von 1546 × 423 px für Logos und Schriften sowie maximal 6 MB Dateigröße.',
      downloadTemplateBtn: 'Transparente PNG-Vorlage herunterladen (2560 × 1440)',
      cardTitle: 'Banner Safe Zone Vorlage',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: 'Lade die offizielle transparente 2560×1440 PNG-Vorlage mit Hilfslinien für TV, Desktop, Tablet und Smartphone zur Verwendung in Photoshop, Figma oder Canva herunter.',
    },
    shortsTemplate: {
      heading: 'YouTube Shorts Safe Zone Vorlage',
      body: 'Lade unsere kostenlose transparente 1080×1920 PNG-Vorlage herunter, damit Titel, Untertitel und wichtige Bildinhalte nicht von den Shorts-Buttons verdeckt werden.',
      downloadBtn: 'Transparente PNG-Vorlage herunterladen (1080×1920)',
      cardTitle: 'Shorts Safe Zone Overlay-Vorlage',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: 'Lade die transparente PNG-Vorlage herunter, um sie direkt in Premiere Pro, DaVinci Resolve, Final Cut, CapCut oder Canva über dein Video zu legen.',
    },
    calculators: {
      revenueIntro: 'Nutze diesen YouTube-Geldrechner, um aus monatlichen Aufrufen und RPM-Werten deine geschätzten Einnahmen zu ermitteln.',
      revenueHow: 'So funktioniert der YouTube-Einnahmenrechner',
      revenueDesc: 'Gib Monatsaufrufe und RPM-Spanne ein, um dein Einnahmenszenario zu berechnen. Der Rechner schätzt Monats- und Jahresumsatz ohne versteckte Abzüge.',
      rpmIntro: 'Berechne deinen YouTube-RPM, um deinen Nettoverdienst pro 1.000 Aufrufe aus deinen echten Kanaldaten zu kennen.',
      rpmHow: 'So funktioniert der YouTube-RPM-Rechner',
      monetizationIntro: 'Berechne deine gesamten YouTube-Einnahmen aus allen Quellen (Werbung, Sponsoring, Affiliates) abzüglich Produktionskosten.',
      monetizationHow: 'So funktioniert der YouTube-Monetarisierungsrechner',
    },
  },
  pt: {
    thumbnailSpecs: {
      heading: 'Tamanho de miniatura do YouTube',
      recommendedSize: 'Tamanho recomendado',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: 'Proporção da tela',
      aspectRatioVal: '16:9',
      maxSize: 'Tamanho máximo',
      maxSizeVal: "2 MB celular, 50 MB computador",
      formats: 'Formatos aceitos',
      formatsVal: "JPG, PNG",
      note: "O YouTube recomenda 3840 × 2160 em 16:9, com largura mínima de 640 pixels; 1280 × 720 também funciona. Até 2 MB no app para celular e 50 MB no computador.",
    },
    bannerSpecs: {
      heading: 'Especificações do tamanho de banner do YouTube',
      recommendedSize: 'Tamanho recomendado',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: 'Área segura (todos os dispositivos)',
      safeAreaVal: '1546 × 423 px',
      maxSize: 'Tamanho máximo',
      maxSizeVal: 'Menos de 6 MB',
      formats: 'Formatos aceitos',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: 'As diretrizes oficiais do YouTube exigem 2560 × 1440 px com uma área segura central de 1546 × 423 px para textos e marcas, com tamanho máximo de 6 MB.',
      downloadTemplateBtn: 'Baixar modelo PNG transparente (2560 × 1440)',
      cardTitle: 'Modelo de área segura para banner',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: 'Baixe o modelo PNG transparente oficial de 2560×1440 com marcações para TV, desktop, tablet e celular para usar no Photoshop, Figma ou Canva.',
    },
    shortsTemplate: {
      heading: 'Modelo de zona segura de YouTube Shorts',
      body: 'Baixe nosso modelo transparente em PNG 1080×1920 grátis para garantir que títulos, legendas e pontos de foco nunca fiquem escondidos pelos botões dos Shorts.',
      downloadBtn: 'Baixar modelo PNG transparente (1080×1920)',
      cardTitle: 'Modelo de zona segura para Shorts',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: 'Baixe o modelo PNG transparente para arrastar diretamente para a linha do tempo no Premiere Pro, DaVinci Resolve, Final Cut, CapCut ou Canva.',
    },
    calculators: {
      revenueIntro: 'Use esta calculadora de dinheiro do YouTube para converter visualizações mensais e RPM em receita estimada.',
      revenueHow: 'Como funciona a calculadora de receita do YouTube',
      revenueDesc: 'Insira suas visualizações e faixa estimada de RPM. A calculadora projeta seus ganhos mensais e anuais sem deduções extras.',
      rpmIntro: 'Calcule seu RPM do YouTube para saber seus ganhos reais por 1.000 visualizações com base nas estatísticas do seu canal.',
      rpmHow: 'Como funciona a calculadora de RPM do YouTube',
      monetizationIntro: 'Calcule a receita total do canal em todas as fontes (anúncios, patrocínios, afiliados) menos despesas.',
      monetizationHow: 'Como funciona a calculadora de monetização do YouTube',
    },
  },
  ko: {
    thumbnailSpecs: {
      heading: '유튜브 썸네일 크기 및 규격',
      recommendedSize: '권장 해상도',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: '화면 비율',
      aspectRatioVal: '16:9',
      maxSize: '최대 파일 크기',
      maxSizeVal: "모바일 2MB, PC 50MB",
      formats: '지원 포맷',
      formatsVal: "JPG, PNG",
      note: "유튜브 권장 크기는 3840 × 2160(16:9), 최소 너비 640픽셀이며 1280 × 720도 사용할 수 있습니다. 모바일 앱은 2MB, PC는 50MB까지입니다.",
    },
    bannerSpecs: {
      heading: '유튜브 채널 배너 크기 및 규격',
      recommendedSize: '권장 해상도',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: '모든 기기 안전 영역(Safe Area)',
      safeAreaVal: '1546 × 423 px',
      maxSize: '최대 파일 크기',
      maxSizeVal: '6MB 이하',
      formats: '지원 포맷',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: '공식 YouTube 채널 아트 규격은 2560 × 1440 px 해상도, 텍스트 및 로고가 잘리지 않는 중앙 1546 × 423 px 안전 영역, 6MB 이하의 파일 크기를 요구합니다.',
      downloadTemplateBtn: '투명 PNG 템플릿 다운로드 (2560 × 1440)',
      cardTitle: '유튜브 배너 세이프존 템플릿',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: '포토샵, 피그마, 캔바 타임라인에 바로 올려서 TV, PC, 태블릿, 모바일별 표시 영역을 확인할 수 있는 공식 2560×1440 투명 PNG 가이드입니다.',
    },
    shortsTemplate: {
      heading: '유튜브 쇼츠 세이프존 템플릿',
      body: '무료 투명 1080×1920 PNG 오버레이 템플릿을 다운로드하여 쇼츠 플레이어 UI, 채널 아이콘, 음원 디스크에 자막이나 중요 화면이 가려지지 않도록 편집하세요.',
      downloadBtn: '투명 PNG 템플릿 다운로드 (1080×1920)',
      cardTitle: '쇼츠 세이프존 오버레이 템플릿',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: '프리미어 프로, 다빈치 리졸브, 파이널 컷, 캡컷, 캔바 타임라인에 바로 올려서 사용할 수 있는 투명 가이드 PNG입니다.',
    },
    calculators: {
      revenueIntro: '월간 조회수와 예상 RPM을 바탕으로 유튜브 예상 수입을 시뮬레이션하세요.',
      revenueHow: '유튜브 수익 계산기 작동 원리',
      revenueDesc: '월간 조회수와 예상 RPM 범위를 입력하면 플랫폼 수수료 차감 후 크리에이터의 순수익을 월별 및 연간으로 산출합니다.',
      rpmIntro: '채널의 실제 수익과 조회수를 기반으로 1,000회 조회당 순수익(RPM)을 정확히 계산하세요.',
      rpmHow: '유튜브 RPM 계산기 작동 원리',
      monetizationIntro: '광고, 협찬, 제휴 등 모든 수입원에서 제작 비용을 차감하여 크리에이터의 실제 월간 순수익을 계산하세요.',
      monetizationHow: '유튜브 종합 수익화 계산기 작동 원리',
    },
  },
  it: {
    thumbnailSpecs: {
      heading: 'Dimensioni miniature YouTube',
      recommendedSize: 'Dimensione consigliata',
      recommendedSizeVal: "3840 × 2160 px",
      aspectRatio: 'Proporzioni',
      aspectRatioVal: '16:9',
      maxSize: 'Peso massimo',
      maxSizeVal: "2 MB smartphone, 50 MB computer",
      formats: 'Formati supportati',
      formatsVal: "JPG, PNG",
      note: "YouTube consiglia 3840 × 2160 in 16:9, con una larghezza minima di 640 pixel; anche 1280 × 720 funziona. Fino a 2 MB nell’app mobile e 50 MB da computer.",
    },
    bannerSpecs: {
      heading: 'Dimensioni e specifiche banner YouTube',
      recommendedSize: 'Dimensione consigliata',
      recommendedSizeVal: '2560 × 1440 px',
      safeArea: 'Area sicura (tutti i dispositivi)',
      safeAreaVal: '1546 × 423 px',
      maxSize: 'Peso massimo',
      maxSizeVal: 'Sotto 6 MB',
      formats: 'Formati supportati',
      formatsVal: 'JPG, PNG, GIF, WebP',
      note: 'Le specifiche ufficiali di YouTube richiedono una risoluzione di 2560 × 1440 px con una safe area centrale di 1546 × 423 px per loghi e testi, e un peso massimo di 6 MB.',
      downloadTemplateBtn: 'Scarica template PNG trasparente (2560 × 1440)',
      cardTitle: 'Template safe zone banner YouTube',
      cardBadge: '2560 × 1440 PNG',
      cardDesc: 'Scarica il template PNG trasparente ufficiale 2560×1440 con le aree TV, desktop, tablet e smartphone da usare su Photoshop, Figma o Canva.',
    },
    shortsTemplate: {
      heading: 'Template safe zone YouTube Shorts',
      body: 'Scarica il nostro template overlay PNG trasparente 1080×1920 gratuito per garantire che titoli, sottotitoli ed elementi visivi non vengano coperti dai pulsanti di Shorts.',
      downloadBtn: 'Scarica template PNG trasparente (1080×1920)',
      cardTitle: 'Template overlay safe zone Shorts',
      cardBadge: '1080 × 1920 PNG',
      cardDesc: 'Scarica il template PNG trasparente da posizionare direttamente sulla timeline in Premiere Pro, DaVinci Resolve, Final Cut, CapCut o Canva.',
    },
    calculators: {
      revenueIntro: 'Usa questo calcolatore di denaro YouTube per convertire visualizzazioni mensili e RPM in guadagni stimati.',
      revenueHow: 'Come funziona il calcolatore di entrate YouTube',
      revenueDesc: 'Inserisci le visualizzazioni mensili e la forbice di RPM stimata. Il calcolatore proietta le entrate mensili e annuali senza commissioni nascoste.',
      rpmIntro: 'Calcola il tuo RPM di YouTube per scoprire i guadagni effettivi per 1.000 visualizzazioni dai dati del tuo canale.',
      rpmHow: 'Come funziona il calcolatore di RPM YouTube',
      monetizationIntro: 'Calcola le entrate totali del canale da tutte le fonti (annunci, sponsor, affiliazioni) sottraendo le spese.',
      monetizationHow: 'Come funziona il calcolatore di monetizzazione YouTube',
    },
  },
};


