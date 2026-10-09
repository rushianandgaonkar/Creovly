import { createToolMetadata } from '@/lib/metadata';
import CalculatorPage from '@/components/tools/CalculatorPage';
export const metadata = createToolMetadata('youtube-watch-hours-calculator');
export default function Page() { return <CalculatorPage kind="watch-hours" slug="youtube-watch-hours-calculator" />; }
