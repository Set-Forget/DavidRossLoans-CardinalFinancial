import SectionCalculator from "../components/calculator";
import { CalculatorProvider } from "../context/CalculatorContext";

export default function CalculatorPage() {
  return (
    <CalculatorProvider>
      <SectionCalculator />
    </CalculatorProvider>
  );
}
