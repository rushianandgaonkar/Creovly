import { createToolMetadata } from '@/lib/metadata';
import CalculatorPage from '@/components/tools/CalculatorPage';
export const metadata = createToolMetadata('youtube-rpm-calculator');
export default function Page() { return <CalculatorPage kind="rpm" slug="youtube-rpm-calculator" />; }
