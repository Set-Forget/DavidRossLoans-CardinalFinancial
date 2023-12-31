import { CalculatorProvider } from "../context/CalculatorContext";
import Calculator from "../components/calculator";

export default function CalculatorPage() {

  return (
    <CalculatorProvider>
      <div>
        <h2 className="font-bold text-lg">Conventional Calculator </h2>
        <p>Workout your property taxes with the calculator below.</p>
        <Calculator />
      </div>
    </CalculatorProvider>
  );

}
