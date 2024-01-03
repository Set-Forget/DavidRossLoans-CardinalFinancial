
export const MAX_SCENARIOS = 5;

export function calculateMortgageInsurance(value) {
  const calc = (value * 0.85) / 12;
  return isNaN(calc) ? "0" : String(calc.toFixed(2));
}