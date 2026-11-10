import type { Locale } from '@/config/i18n';

export interface GuideLinkText {
  lead: string;
  link: string;
  end: string;
}

export interface GuideLinks {
  /** Sentence on a tool page that points to its companion guide. */
  resizer: GuideLinkText;
  shorts: GuideLinkText;
  banner: GuideLinkText;
  /** Lead-in on a guide page that points to its companion tool. */
  cta: { thumbnail: string; banner: string; shorts: string };
}

export const guideLinks: Record<Locale, GuideLinks> = {
  en: {
    resizer: { lead: 'Need official dimension and file specifications? Read our guide to', link: 'YouTube thumbnail size and dimensions', end: '.' },
    shorts: { lead: 'Learn UI overlay dimensions and button clear areas in our guide to the', link: 'YouTube Shorts safe zone', end: '.' },
    banner: { lead: 'Want exact dimensions and safe-area explanations? Read our guide to', link: 'YouTube banner size and dimensions', end: '.' },
    cta: { thumbnail: 'Fit your image to this size:', banner: 'Check and resize your banner:', shorts: 'Check your Shorts framing:' },
  },
  es: {
    resizer: { lead: 'Si necesitas las dimensiones y especificaciones oficiales de archivo, lee nuestra guía sobre el', link: 'tamaño y las dimensiones de las miniaturas de YouTube', end: '.' },
    shorts: { lead: 'Conoce las dimensiones de la interfaz y las zonas libres de botones en nuestra guía de la', link: 'zona segura de YouTube Shorts', end: '.' },
    banner: { lead: '¿Quieres medidas exactas y la explicación del área segura? Lee nuestra guía sobre el', link: 'tamaño y las dimensiones del banner de YouTube', end: '.' },
    cta: { thumbnail: 'Ajusta tu imagen a este tamaño:', banner: 'Comprueba y redimensiona tu banner:', shorts: 'Revisa el encuadre de tus Shorts:' },
  },
  ja: {
    resizer: { lead: '公式のサイズとファイル仕様は、こちらのガイドで確認できます：', link: 'YouTubeサムネイルのサイズと解像度', end: '。' },
    shorts: { lead: 'UIオーバーレイの寸法とボタンを避ける領域は、こちらのガイドで解説しています：', link: 'YouTube Shortsのセーフゾーン', end: '。' },
    banner: { lead: '正確なサイズとセーフエリアの解説は、こちらのガイドをご覧ください：', link: 'YouTubeバナーのサイズと寸法', end: '。' },
    cta: { thumbnail: 'この寸法に画像を合わせる：', banner: 'バナーを確認してリサイズ：', shorts: 'Shortsのフレーミングを確認：' },
  },
  fr: {
    resizer: { lead: 'Besoin des dimensions et des spécifications de fichier officielles ? Lisez notre guide sur la', link: 'taille et les dimensions des miniatures YouTube', end: '.' },
    shorts: { lead: 'Découvrez les dimensions de l’interface et les zones à dégager dans notre guide de la', link: 'zone de sécurité YouTube Shorts', end: '.' },
    banner: { lead: 'Besoin des dimensions exactes et de la zone de sécurité ? Lisez notre guide sur la', link: 'taille et les dimensions de la bannière YouTube', end: '.' },
    cta: { thumbnail: 'Adaptez votre image à cette taille :', banner: 'Vérifiez et redimensionnez votre bannière :', shorts: 'Vérifiez le cadrage de vos Shorts :' },
  },
  de: {
    resizer: { lead: 'Du brauchst die offiziellen Maße und Dateivorgaben? Lies unseren Leitfaden zur', link: 'YouTube-Thumbnail-Größe und den Abmessungen', end: '.' },
    shorts: { lead: 'Mehr zu UI-Überlagerungen und freien Bereichen findest du in unserem Leitfaden zur', link: 'YouTube-Shorts-Safe-Zone', end: '.' },
    banner: { lead: 'Du willst exakte Maße und den sicheren Bereich verstehen? Lies unseren Leitfaden zur', link: 'YouTube-Banner-Größe und den Abmessungen', end: '.' },
    cta: { thumbnail: 'Passe dein Bild an diese Größe an:', banner: 'Banner prüfen und anpassen:', shorts: 'Shorts-Bildausschnitt prüfen:' },
  },
  pt: {
    resizer: { lead: 'Precisa das dimensões e especificações oficiais de arquivo? Leia nosso guia sobre o', link: 'tamanho e as dimensões da miniatura do YouTube', end: '.' },
    shorts: { lead: 'Veja as dimensões da interface e as áreas livres de botões em nosso guia da', link: 'zona segura do YouTube Shorts', end: '.' },
    banner: { lead: 'Quer as medidas exatas e a área segura? Leia nosso guia sobre o', link: 'tamanho e as dimensões do banner do YouTube', end: '.' },
    cta: { thumbnail: 'Ajuste sua imagem a este tamanho:', banner: 'Verifique e redimensione seu banner:', shorts: 'Confira o enquadramento dos seus Shorts:' },
  },
  ko: {
    resizer: { lead: '공식 규격과 파일 사양이 필요하신가요? 다음 가이드를 읽어보세요:', link: '유튜브 썸네일 크기와 해상도', end: '.' },
    shorts: { lead: 'UI 오버레이 크기와 버튼 여유 영역은 다음 가이드에서 확인하세요:', link: '유튜브 쇼츠 세이프 존', end: '.' },
    banner: { lead: '정확한 크기와 안전 영역 설명은 다음 가이드를 참고하세요:', link: '유튜브 배너 크기와 규격', end: '.' },
    cta: { thumbnail: '이미지를 이 크기에 맞추기:', banner: '배너 확인 및 리사이즈:', shorts: '쇼츠 프레이밍 확인:' },
  },
  it: {
    resizer: { lead: 'Cerchi dimensioni e specifiche ufficiali dei file? Leggi la nostra guida sulle', link: 'dimensioni delle miniature YouTube', end: '.' },
    shorts: { lead: 'Scopri le misure dell’interfaccia e le aree libere dai pulsanti nella nostra guida alla', link: 'zona sicura di YouTube Shorts', end: '.' },
    banner: { lead: 'Vuoi le misure esatte e l’area sicura? Leggi la nostra guida alle', link: 'dimensioni del banner YouTube', end: '.' },
    cta: { thumbnail: 'Adatta la tua immagine a questa misura:', banner: 'Controlla e ridimensiona il banner:', shorts: 'Controlla l’inquadratura degli Shorts:' },
  },
};
