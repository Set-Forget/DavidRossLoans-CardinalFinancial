export const MAX_SCENARIOS = 5;
export const PIPE = "|";

export const URL_LOGS =
  "https://script.google.com/macros/s/AKfycbya0mvO7kTKxkh3ovfB0Fw0OBRs96j5qb0hfvue0O-Vo3MTzQSLp6c6ASO6jkqlSkZs/exec";

export const KEY_PURCHASE_PRICE = "e986ec80d8dce46cf43f261f60235d0a2faa24da";
export const KEY_PROPERTY_TAXES = "0ac894d6605e196e6b2be867ff0c677dd31d8e92";
export const KEY_LOAN_TERM = "878ddd2c5094c630638d255fd9ad54ab37aa5a4b";
export const KEY_HOA_PAYMENT = "e223b6bbce177a8877fa3e3e7674bceb5b6bc735";
export const KEY_DOWN_PAYMENT_AMOUNT =
  "98826f12c210fb692cf563eb80be01501973c23d";
export const KEY_MORTGAGE_INSURANCE =
  "ada448810ec8e41b03f4104947e7d36d1c1a16a8";
/**
 *
 * @param {dateString} date
 * @returns us format date with time
 * YYYY-MM-DDThs:mm:sg would be MM/DD/YY hs:mm PM/AM
 */
export function formatDate(date) {
  const formattedDate = new Date(date).toLocaleString(
    "en-US",
    {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
    { timeZoneName: "short" }
  );
  return formattedDate.replace(",", "");
}

/**
 *
 * @param {string} value
 * @returns us format currency
 * XXXX would be X,XXX or XXXXX as XX,XXX
 */
export function formatCurrency(value) {
  let num = Number(value);
  if (Number.isInteger(num)) return num.toLocaleString("en-US");
  else {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

export function calculateDownPaymentPercentage(loanAmount, purchasePrice) {
  return ((1 - Number(loanAmount) / Number(purchasePrice)) * 100).toFixed(2);
}

export function calculateLoanAmount(downPaymentPercentage, purchasePrice) {
  const decimalDownPaymentPercentage = Number(downPaymentPercentage) / 100;
  return (1 - decimalDownPaymentPercentage) * Number(purchasePrice);
}

export const rates = [
  "1.000 %",
  "1.125 %",
  "1.250 %",
  "1.375 %",
  "1.500 %",
  "1.625 %",
  "1.750 %",
  "1.875 %",
  "2.000 %",
  "2.125 %",
  "2.250 %",
  "2.375 %",
  "2.500 %",
  "2.625 %",
  "2.750 %",
  "2.875 %",
  "3.000 %",
  "3.125 %",
  "3.250 %",
  "3.375 %",
  "3.500 %",
  "3.625 %",
  "3.750 %",
  "3.875 %",
  "4.000 %",
  "4.125 %",
  "4.250 %",
  "4.375 %",
  "4.500 %",
  "4.625 %",
  "4.750 %",
  "4.875 %",
  "5.000 %",
  "5.125 %",
  "5.250 %",
  "5.375 %",
  "5.500 %",
  "5.625 %",
  "5.750 %",
  "5.875 %",
  "6.000 %",
  "6.125 %",
  "6.250 %",
  "6.375 %",
  "6.500 %",
  "6.625 %",
  "6.750 %",
  "6.875 %",
  "7.000 %",
  "7.125 %",
  "7.250 %",
  "7.375 %",
  "7.500 %",
  "7.625 %",
  "7.750 %",
  "7.875 %",
  "8.000 %",
  "8.125 %",
  "8.250 %",
  "8.375 %",
  "8.500 %",
  "8.625 %",
  "8.750 %",
  "8.875 %",
  "9.000 %",
  "9.125 %",
  "9.250 %",
  "9.375 %",
  "9.500 %",
  "9.625 %",
  "9.750 %",
  "9.875 %",
  "10.000 %",
];

export const years = [
  "10 years",
  "11 years",
  "12 years",
  "13 years",
  "14 years",
  "15 years",
  "16 years",
  "17 years",
  "18 years",
  "19 years",
  "20 years",
  "21 years",
  "22 years",
  "23 years",
  "24 years",
  "25 years",
  "26 years",
  "27 years",
  "28 years",
  "29 years",
  "30 years",
];
