import type { Locale } from '@/config/i18n';

export interface RevenueExplainer {
  rpmHeading: string;
  rpmBody: string;
  exampleHeading: string;
  exampleBody: string;
  relatedHeading: string;
  rpm: { label: string; note: string };
  monetization: { label: string; note: string };
  watchHours: { label: string; note: string };
}

// The worked example (50,000 views, RPM $3 to $5) is an illustrative assumption, not a benchmark.
export const revenueExplainer: Record<Locale, RevenueExplainer> = {
  en: {
    rpmHeading: 'What is RPM?',
    rpmBody:
      'RPM is revenue per mille: the amount you earn per 1,000 views, after YouTube takes its share. It is different from CPM, which is what advertisers pay per 1,000 ad impressions before that share. Find your own RPM in YouTube Studio analytics, or work it out with the RPM calculator below.',
    exampleHeading: 'Worked example',
    exampleBody:
      'Say a channel gets 50,000 views in a month and assumes an RPM between $3 and $5 (illustrative numbers, not a benchmark). Monthly revenue = 50,000 ÷ 1,000 × $3 to $5 = $150 to $250. Repeated for 12 identical months, that is $1,800 to $3,000 a year.',
    relatedHeading: 'Related calculators',
    rpm: { label: 'YouTube RPM calculator', note: 'to find earnings per 1,000 views from your real revenue.' },
    monetization: { label: 'YouTube monetization calculator', note: 'to add sponsors, affiliates and costs.' },
    watchHours: { label: 'YouTube watch hours calculator', note: 'to plan toward Partner Program eligibility.' },
  },
  es: {
    rpmHeading: '¿Qué es el RPM?',
    rpmBody:
      'El RPM (ingresos por mil) es lo que ganas por cada 1.000 visualizaciones, después de la parte de YouTube. No es lo mismo que el CPM, que es lo que pagan los anunciantes por 1.000 impresiones de anuncios antes de esa parte. Consulta tu RPM en YouTube Studio o calcúlalo con la calculadora de RPM.',
    exampleHeading: 'Ejemplo práctico',
    exampleBody:
      'Supón que un canal recibe 50.000 visitas al mes y asume un RPM de entre 3 y 5 USD (cifras ilustrativas, no una referencia). Ingresos mensuales = 50.000 ÷ 1.000 × 3 a 5 USD = 150 a 250 USD. Repetido durante 12 meses iguales, son 1.800 a 3.000 USD al año.',
    relatedHeading: 'Calculadoras relacionadas',
    rpm: { label: 'Calculadora de RPM de YouTube', note: 'para hallar tus ingresos por 1.000 visitas con tus ingresos reales.' },
    monetization: { label: 'Calculadora de monetización de YouTube', note: 'para sumar patrocinios, afiliados y costes.' },
    watchHours: { label: 'Calculadora de horas de reproducción de YouTube', note: 'para planificar el acceso al Programa de Socios.' },
  },
  ja: {
    rpmHeading: 'RPMとは？',
    rpmBody:
      'RPM（1,000回あたりの収益）は、YouTubeの取り分を差し引いた後に、再生1,000回あたりで得られる金額です。広告主が広告1,000回表示あたりに支払う金額（取り分を引く前）であるCPMとは異なります。RPMはYouTubeスタジオのアナリティクスで確認するか、RPM計算ツールで求められます。',
    exampleHeading: '計算例',
    exampleBody:
      '月に50,000回再生され、RPMを3～5ドルと仮定します（参考用の数値であり、基準ではありません）。月間収益 = 50,000 ÷ 1,000 × 3～5ドル = 150～250ドル。同じ月が12回続くと、年間1,800～3,000ドルです。',
    relatedHeading: '関連する計算ツール',
    rpm: { label: 'YouTube RPM計算ツール', note: '実際の収益から再生1,000回あたりの収益を求めます。' },
    monetization: { label: 'YouTube収益化計算ツール', note: 'スポンサー、アフィリエイト、経費を加えて計算します。' },
    watchHours: { label: 'YouTube総再生時間計算ツール', note: 'パートナープログラムの条件達成に向けた計画に使えます。' },
  },
  fr: {
    rpmHeading: 'Qu’est-ce que le RPM ?',
    rpmBody:
      'Le RPM (revenu pour mille) correspond à ce que vous gagnez pour 1 000 vues, après la part de YouTube. Il diffère du CPM, ce que les annonceurs paient pour 1 000 impressions publicitaires avant cette part. Retrouvez votre RPM dans YouTube Studio ou calculez-le avec le calculateur de RPM.',
    exampleHeading: 'Exemple concret',
    exampleBody:
      'Supposons qu’une chaîne obtienne 50 000 vues par mois et retienne un RPM compris entre 3 et 5 $ (chiffres illustratifs, pas une référence). Revenu mensuel = 50 000 ÷ 1 000 × 3 à 5 $ = 150 à 250 $. Sur 12 mois identiques, cela donne 1 800 à 3 000 $ par an.',
    relatedHeading: 'Calculateurs associés',
    rpm: { label: 'Calculateur de RPM YouTube', note: 'pour trouver les revenus pour 1 000 vues à partir de vos revenus réels.' },
    monetization: { label: 'Calculateur de monétisation YouTube', note: 'pour ajouter sponsors, affiliation et coûts.' },
    watchHours: { label: 'Calculateur d’heures de visionnage YouTube', note: 'pour planifier l’accès au Programme Partenaire.' },
  },
  de: {
    rpmHeading: 'Was ist der RPM?',
    rpmBody:
      'Der RPM (Revenue per Mille) ist dein Verdienst pro 1.000 Aufrufe, nachdem YouTube seinen Anteil abgezogen hat. Er unterscheidet sich vom CPM, den Werbetreibende pro 1.000 Anzeigeneinblendungen vor diesem Anteil zahlen. Deinen RPM findest du in YouTube Studio, oder du berechnest ihn mit dem RPM-Rechner.',
    exampleHeading: 'Rechenbeispiel',
    exampleBody:
      'Ein Kanal erhält 50.000 Aufrufe im Monat und nimmt einen RPM zwischen 3 und 5 US-Dollar an (Beispielwerte, kein Richtwert). Monatliche Einnahmen = 50.000 ÷ 1.000 × 3 bis 5 $ = 150 bis 250 $. Über 12 gleiche Monate sind das 1.800 bis 3.000 $ im Jahr.',
    relatedHeading: 'Weitere Rechner',
    rpm: { label: 'YouTube RPM-Rechner', note: 'um den Verdienst pro 1.000 Aufrufe aus deinen echten Einnahmen zu ermitteln.' },
    monetization: { label: 'YouTube Monetarisierungsrechner', note: 'um Sponsoren, Affiliate-Einnahmen und Kosten einzubeziehen.' },
    watchHours: { label: 'YouTube Wiedergabezeit-Rechner', note: 'um den Weg zum Partnerprogramm zu planen.' },
  },
  pt: {
    rpmHeading: 'O que é RPM?',
    rpmBody:
      'O RPM (receita por mil) é o quanto você ganha a cada 1.000 visualizações, depois da parte do YouTube. Ele é diferente do CPM, que é o que os anunciantes pagam por 1.000 impressões de anúncios antes dessa parte. Veja seu RPM no YouTube Studio ou calcule com a calculadora de RPM.',
    exampleHeading: 'Exemplo prático',
    exampleBody:
      'Suponha que um canal tenha 50.000 visualizações por mês e assuma um RPM entre US$ 3 e US$ 5 (números ilustrativos, não uma referência). Receita mensal = 50.000 ÷ 1.000 × US$ 3 a 5 = US$ 150 a 250. Repetido por 12 meses iguais, são US$ 1.800 a 3.000 por ano.',
    relatedHeading: 'Calculadoras relacionadas',
    rpm: { label: 'Calculadora de RPM do YouTube', note: 'para achar os ganhos por 1.000 visualizações com sua receita real.' },
    monetization: { label: 'Calculadora de monetização do YouTube', note: 'para somar patrocínios, afiliados e custos.' },
    watchHours: { label: 'Calculadora de horas de exibição do YouTube', note: 'para planejar a elegibilidade ao Programa de Parcerias.' },
  },
  ko: {
    rpmHeading: 'RPM이란?',
    rpmBody:
      'RPM(1,000회당 수익)은 YouTube의 몫을 뺀 뒤 조회수 1,000회당 벌어들이는 금액입니다. 광고주가 광고 1,000회 노출당 지불하는 금액(YouTube 몫을 빼기 전)인 CPM과는 다릅니다. RPM은 YouTube 스튜디오 분석에서 확인하거나 RPM 계산기로 구할 수 있습니다.',
    exampleHeading: '계산 예시',
    exampleBody:
      '한 달에 조회수 50,000회, RPM을 3~5달러로 가정합니다(참고용 숫자이며 기준이 아닙니다). 월 수익 = 50,000 ÷ 1,000 × 3~5달러 = 150~250달러. 같은 달이 12번 반복되면 연간 1,800~3,000달러입니다.',
    relatedHeading: '관련 계산기',
    rpm: { label: '유튜브 RPM 계산기', note: '실제 수익으로 조회수 1,000회당 수익을 구합니다.' },
    monetization: { label: '유튜브 수익화 계산기', note: '스폰서, 제휴 수익, 비용을 더해 계산합니다.' },
    watchHours: { label: '유튜브 시청 시간 계산기', note: '파트너 프로그램 자격 달성 계획에 활용합니다.' },
  },
  it: {
    rpmHeading: 'Che cos’è l’RPM?',
    rpmBody:
      'L’RPM (revenue per mille) è quanto guadagni ogni 1.000 visualizzazioni, dopo la quota di YouTube. È diverso dal CPM, ciò che gli inserzionisti pagano per 1.000 impressioni pubblicitarie prima di quella quota. Trovi il tuo RPM in YouTube Studio o lo calcoli con il calcolatore di RPM.',
    exampleHeading: 'Esempio pratico',
    exampleBody:
      'Supponi che un canale ottenga 50.000 visualizzazioni al mese e ipotizzi un RPM tra 3 e 5 $ (numeri illustrativi, non un riferimento). Ricavi mensili = 50.000 ÷ 1.000 × 3-5 $ = 150-250 $. Ripetuti per 12 mesi uguali, sono 1.800-3.000 $ all’anno.',
    relatedHeading: 'Calcolatori correlati',
    rpm: { label: 'Calcolatore RPM di YouTube', note: 'per trovare i guadagni ogni 1.000 visualizzazioni dai tuoi ricavi reali.' },
    monetization: { label: 'Calcolatore di monetizzazione YouTube', note: 'per aggiungere sponsor, affiliazioni e costi.' },
    watchHours: { label: 'Calcolatore ore di visualizzazione YouTube', note: 'per pianificare l’accesso al Programma Partner.' },
  },
};
