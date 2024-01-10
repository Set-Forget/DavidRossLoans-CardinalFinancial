import { CalculatorProvider } from "../context/CalculatorContext";
import Calculator from "../sections/calculator";

export default function CalculatorPage() {

  return (
    <CalculatorProvider>
      <div>
        <h2 className="font-bold text-lg text-white">Conventional Calculator </h2>
        <p className="text-white">Workout your property taxes with the calculator below.</p>
        <Calculator />
      </div>
    </CalculatorProvider>
  );

}
