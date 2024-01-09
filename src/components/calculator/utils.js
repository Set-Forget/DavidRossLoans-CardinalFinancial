
export const MAX_SCENARIOS = 5;

export const KEY_PURCHASE_PRICE = "e986ec80d8dce46cf43f261f60235d0a2faa24da";
export const KEY_PROPERTY_TAXES = "0ac894d6605e196e6b2be867ff0c677dd31d8e92";
export const KEY_HOA_PAYMENT = "e223b6bbce177a8877fa3e3e7674bceb5b6bc735";

export function calculateMortgageInsurance(value) {
  const calc = (value * 0.85) / 12;
  return isNaN(calc) ? "0" : String(calc.toFixed(2));
}