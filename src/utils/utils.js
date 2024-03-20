export const MAX_SCENARIOS = 4;
export const PIPE = "|";

export const API_URL =
  "https://script.google.com/macros/s/AKfycbyj3ncm4dDtMGm6F8u5PxJZTr3pUVQiWglxzgnxYlYFvMV-8GDOjLYvq5benvaaCBSP/exec";
export const FORM_API_URL =
  "https://script.google.com/macros/s/AKfycbxAvdb6GyRMwZvG6PkcP_k5ODkDu7Nx6Q9iUkQjSwAaEZSiON7dkCkZivRGSI9eU4mT/exec";
export const KEY_PURCHASE_PRICE = "d73ba24d1cfd8f803a56b2d6f9131b076462bac0";
export const KEY_PROPERTY_TAXES = "0ac894d6605e196e6b2be867ff0c677dd31d8e92";
export const KEY_LOAN_TERM = "878ddd2c5094c630638d255fd9ad54ab37aa5a4b";
export const KEY_HOA_PAYMENT = "e223b6bbce177a8877fa3e3e7674bceb5b6bc735";
export const KEY_DOWN_PAYMENT_AMOUNT =
  "98826f12c210fb692cf563eb80be01501973c23d";
export const KEY_MORTGAGE_INSURANCE =
  "ada448810ec8e41b03f4104947e7d36d1c1a16a8";
export const KEY_HAZARD_INSURANCE = "795c2eb1181da169e077f87dd0d2bf0c4d44deb5";
export const KEY_NOTE_RATE = "96f424fea79a1d5ed8a68b6fee0fb474d6155d05";
export const KEY_APR = "2c669ed88c58a9ce0f78952c3bda42eb3a266892"
export const KEY_1003_LINK = "50833fc6d08de716344d4f834099ff4ed19a8760";

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
  else return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function calculateDownPaymentPercentage(loanAmount, purchasePrice) {
  const result = (1 - Number(loanAmount) / Number(purchasePrice)) * 100;
  return Math.floor(result);
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

export function formatFieldValue(name, value) {
  if (name === "loanTerm" || name === "interestRate") return value;
  const format = formatCurrency(value);
  return `$ ${format}`;
}

export function formatFieldName(value) {
  switch (value) {
    case "purchasePrice":
      return "Purchase Price";
    case "loanAmount":
      return "Loan Amount";
    case "loanTerm":
      return "Loan Term";
    case "downPaymentPercentage":
      return "Down Payment Percentage";
    case "downPaymentAmount":
      return "Down Payment Amount";
    case "interestRate":
      return "Interest Rate";
    case "points":
      return "Charge for interest rate";
    case "homeOwnersInsurance":
      return "Homeowners";
    case "mortgageInsurance":
      return "Mortgage Insurance";
    case "propertyTaxes":
      return "Property Taxes";
    case "HOAPayment":
      return "HOA Payment";
    case "closingCosts":
      return "Closing Costs";
    case "prepaidEscrowClosingCosts":
      return "Prepaid & Escrow closing costs";
    default:
      return value;
  }
}
