
export const MAX_SCENARIOS = 5;

export const HASH_PURCHASE_PRICE = "e986ec80d8dce46cf43f261f60235d0a2faa24da";

export function calculateMortgageInsurance(value) {
  const calc = (value * 0.85) / 12;
  return isNaN(calc) ? "0" : String(calc.toFixed(2));
}