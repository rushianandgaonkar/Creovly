import { createToolMetadata } from '@/lib/metadata';
import CalculatorPage from '@/components/tools/CalculatorPage';
export const metadata = createToolMetadata('youtube-monetization-calculator');
export default function Page() { return <CalculatorPage kind="monetization" slug="youtube-monetization-calculator" />; }
