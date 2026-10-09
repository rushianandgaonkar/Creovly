import { createToolMetadata } from '@/lib/metadata';
import CalculatorPage from '@/components/tools/CalculatorPage';
export const metadata = createToolMetadata('youtube-revenue-calculator');
export default function Page() { return <CalculatorPage kind="revenue" slug="youtube-revenue-calculator" />; }
