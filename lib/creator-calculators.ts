export type CalculatorKind = 'revenue' | 'rpm' | 'watch-hours' | 'monetization';
export interface CalculatorField { key: string; label: string; suffix?: string; min?: number; max?: number; integer?: boolean }
export interface CalculatorDefinition { title: string; fields: CalculatorField[]; example: Record<string, string>; note: string }
export const calculatorDefinitions: Record<CalculatorKind, CalculatorDefinition> = {
  revenue: {
    title: 'Revenue scenario',
    fields: [{ key: 'views', label: 'Monthly views', suffix: 'views', integer: true }, { key: 'low', label: 'Lower RPM assumption (USD)', suffix: 'USD' }, { key: 'high', label: 'Upper RPM assumption (USD)', suffix: 'USD' }],
    example: { views: '150000', low: '2', high: '5' },
    note: 'Enter your own RPM range after YouTube’s share. No niche benchmarks or extra platform cut are applied. For Shorts, use engaged views and a Shorts RPM. Annual figures assume 12 identical months; they are scenarios, not forecasts.',
  },
  rpm: {
    title: 'RPM calculation',
    fields: [{ key: 'revenue', label: 'Creator revenue in period (USD)', suffix: 'USD' }, { key: 'views', label: 'Views in the same period', suffix: 'views', min: 1, integer: true }],
    example: { revenue: '1850', views: '420000' },
    note: 'Use revenue after YouTube’s share and views from the same period. For Shorts, enter engaged views. Include the revenue sources you intend to measure; ad-only revenue produces ad-only RPM. RPM cannot determine advertiser CPM.',
  },
  'watch-hours': {
    title: 'Watch-hours scenario',
    fields: [{ key: 'current', label: 'Current watch hours', suffix: 'hours' }, { key: 'goal', label: 'Watch-hours goal', suffix: 'hours', min: 1 }, { key: 'monthly', label: 'Additional watch hours per month', suffix: 'hours' }, { key: 'duration', label: 'Average view duration', suffix: 'minutes', min: .01, max: 1440 }],
    example: { current: '1820', goal: '4000', monthly: '340', duration: '4.5' },
    note: 'The timeline assumes a constant pace and no hours expiring. It does not simulate YouTube’s rolling eligibility window or determine YPP eligibility. Shorts Feed watch time does not count toward the 4,000-hour path. Check the Earn tab in YouTube Studio.',
  },
  monetization: {
    title: 'Monthly income scenario',
    fields: [{ key: 'views', label: 'Monthly views', suffix: 'views', integer: true }, { key: 'rpm', label: 'Platform RPM assumption (USD)', suffix: 'USD' }, { key: 'deals', label: 'Sponsorship deals per month', integer: true }, { key: 'fee', label: 'Fee per deal (USD)', suffix: 'USD' }, { key: 'affiliate', label: 'Monthly affiliate income (USD)', suffix: 'USD' }, { key: 'other', label: 'Other monthly income (USD)', suffix: 'USD' }, { key: 'costs', label: 'Monthly business costs (USD)', suffix: 'USD' }],
    example: { views: '150000', rpm: '4', deals: '1', fee: '2200', affiliate: '350', other: '0', costs: '500' },
    note: 'All amounts are USD assumptions. Platform income uses your RPM after YouTube’s share. Add only income not already included in that RPM to avoid double counting. Costs are subtracted once; taxes are not calculated. Subscriber count is not used to invent sponsorship rates.',
  },
};
export interface CalculatorResult { metrics: { label: string; value: number | null; unit: 'money' | 'number' | 'months' | 'percent'; detail?: string }[]; formula: string; explanation: string }

export function calculateCreator(kind: CalculatorKind, input: Record<string, string>): CalculatorResult {
  const values: Record<string, number> = {};
  for (const field of calculatorDefinitions[kind].fields) {
    const raw = input[field.key]?.trim(); const value = Number(raw);
    if (!raw || !Number.isFinite(value) || value < (field.min ?? 0) || value > (field.max ?? 1_000_000_000_000) || (field.integer && !Number.isInteger(value))) {
      throw new Error(`${field.label}: enter ${field.integer ? 'a whole number' : 'a number'} from ${field.min ?? 0} to ${field.max ?? 1_000_000_000_000}.`);
    }
    values[field.key] = value;
  }
  const v = values;
  const metric = (label: string, value: number | null, unit: CalculatorResult['metrics'][number]['unit'], detail?: string) => ({ label, value, unit, detail });
  if (kind === 'revenue') {
    if (v.low > v.high) throw new Error('Lower RPM must be less than or equal to upper RPM.');
    const low = v.views / 1000 * v.low; const high = v.views / 1000 * v.high;
    return { metrics: [metric('Monthly lower scenario', low, 'money'), metric('Monthly upper scenario', high, 'money'), metric('Annual lower scenario', low * 12, 'money'), metric('Annual upper scenario', high * 12, 'money')], formula: 'Monthly revenue = monthly views ÷ 1,000 × RPM. Annual = monthly × 12.', explanation: 'Actual revenue varies. The range comes entirely from your RPM assumptions.' };
  }
  if (kind === 'rpm') return { metrics: [metric('Calculated RPM', v.revenue / v.views * 1000, 'money', 'Per 1,000 views (engaged views for Shorts)'), metric('Revenue entered', v.revenue, 'money'), metric('Views entered', v.views, 'number')], formula: 'RPM = creator revenue ÷ views × 1,000.', explanation: 'This measures the revenue and view basis you entered. It does not infer CPM, monetized playbacks, or revenue trends.' };
  if (kind === 'watch-hours') {
    const remaining = Math.max(0, v.goal - v.current); const months = remaining === 0 ? 0 : v.monthly === 0 ? null : remaining / v.monthly;
    return { metrics: [metric('Hours remaining', remaining, 'number'), metric('Progress to goal', Math.min(100, v.current / v.goal * 100), 'percent'), metric('Months at this pace', months, 'months', 'Assumes no hours expire'), metric('Additional views needed', Math.ceil(remaining * 60 / v.duration), 'number', 'At the average duration entered')], formula: 'Remaining = max(0, goal − current). Months = remaining ÷ monthly hours. Views = ceiling(remaining × 60 ÷ average minutes).', explanation: remaining === 0 ? 'Your entered hours meet your chosen goal. This does not confirm monetization eligibility.' : v.monthly === 0 ? 'With zero additional monthly hours, there is no estimated completion time.' : 'A simple accumulation scenario. Expiring watch hours can make the actual timeline longer or prevent this goal being reached.' };
  }
  const platform = v.views / 1000 * v.rpm; const sponsorships = v.deals * v.fee; const total = platform + sponsorships + v.affiliate + v.other; const net = total - v.costs;
  return { metrics: [metric('Monthly total income', total, 'money'), metric('Monthly after costs', net, 'money', 'Before taxes'), metric('Platform income', platform, 'money'), metric('Sponsorship income', sponsorships, 'money'), metric('Affiliate income', v.affiliate, 'money'), metric('Other income', v.other, 'money'), metric('Monthly costs', v.costs, 'money'), metric('Annual after costs', net * 12, 'money', '12 identical months; before taxes')], formula: 'Platform = views ÷ 1,000 × RPM. Sponsorships = deals × fee. Total = platform + sponsorships + affiliate + other. After costs = total − costs.', explanation: net < 0 ? 'Your entered costs exceed your income scenario. Negative amounts represent a loss before taxes.' : 'This adds your assumptions; it does not predict deals, revenue, eligibility, or taxes.' };
}

export function formatCalculatorMetric(metric: CalculatorResult['metrics'][number]) {
  if (metric.value === null) return 'No progress';
  if (metric.unit === 'money') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(metric.value);
  if (metric.unit === 'months') return metric.value > 0 && metric.value < .1 ? '<0.1 months' : `${metric.value.toLocaleString('en-US', { maximumFractionDigits: 1 })} months`;
  if (metric.unit === 'percent') return `${metric.value.toLocaleString('en-US', { maximumFractionDigits: 1 })}%`;
  return metric.value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}
