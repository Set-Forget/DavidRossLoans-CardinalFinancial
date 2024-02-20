import {
  MAX_SCENARIOS,
  calculateLoanAmount,
  calculateDownPaymentPercentage,
} from "../utils/utils";

export const initialScenario = {
  purchasePrice: "",
  loanAmount: "",
  loanTerm: "",
  downPaymentPercentage: "",
  downPaymentAmount: "",
  interestRate: "",
  points: "",
  homeOwnersInsurance: "",
  monthlyMortgageInsurance: "",
  propertyTaxes: "",
  HOAPayment: "",
  singlePremiumMortgageInsurance: "",
  prepaidEscrowClosingCosts: "",
  closingCosts: "",
  type: "conventional",
  foundingFee: "",
  waived: "no",
};

export const initialResult = {
  principleAndInterest: "",
  totalHousingExpense: "",
  housingExpenseWithHOA: "",
  totalDownPayment: "",
  totalCashFromBorrower: "",
};

export const initialDeal = {
  purchasePrice: null,
  loanAmount: null,
  loanTerm: null,
  downPaymentPercentage: null,
  HOAPayment: null,
  propertyTaxes: null,
  downPaymentAmount: null,
  mortgageInsurance: null,
};

export const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SCENARIO": {
      const { fieldName, scenarioIndex, value } = action.payload;
      return {
        ...state,
        isReset: false,
        scenarios: state.scenarios.map((scenario, index) => {
          if (String(index) === scenarioIndex) {
            let updatedScenario = { ...scenario, [fieldName]: value };
            const { purchasePrice } = updatedScenario;
            if (fieldName === "loanAmount") {
              updatedScenario.downPaymentPercentage =
                calculateDownPaymentPercentage(value, purchasePrice);
              updatedScenario.downPaymentAmount =
                Number(purchasePrice) - Number(value);
            } else if (fieldName === "downPaymentPercentage") {
              const loanAmountValue = calculateLoanAmount(value, purchasePrice);
              updatedScenario.loanAmount = loanAmountValue;
              updatedScenario.downPaymentAmount =
                Number(purchasePrice) - Number(loanAmountValue);
            } else if (fieldName === "downPaymentAmount") {
              const loanAmountValue = Number(purchasePrice) - Number(value);
              updatedScenario.loanAmount = loanAmountValue;
              updatedScenario.downPaymentPercentage =
                calculateDownPaymentPercentage(loanAmountValue, purchasePrice);
            }
            return updatedScenario;
          }
          return scenario;
        }),
      };
    }
    case "ADD_SCENARIO":
      if (state.scenarios.length >= MAX_SCENARIOS) {
        return state;
      }
      return {
        ...state,
        isReset: false,
        scenarios: [...state.scenarios, { ...state.scenarios[0] }],
        results: [...state.results, { ...state.results[0] }],
      };
    case "SET_DEAL":
      return {
        ...state,
        deal: action.payload,
      };
    case "SET_OPTIONS":
      return {
        ...state,
        options: action.payload,
      };
    case "SET_SELECTED_DEAL":
      return {
        ...state,
        selectedDeal: action.payload,
      };
    case "SET_CALCULATOR_TYPE":
      return {
        ...state,
        calculatorType: action.payload,
      };
    case "REMOVE_SCENARIO": {
      const scenarioIndex = action.payload;
      return {
        ...state,
        isReset: false,
        scenarios: state.scenarios.filter(
          (_, index) => index !== scenarioIndex
        ),
      };
    }
    case "REMOVE_RESULT": {
      const resultIndex = action.payload;
      return {
        ...state,
        results: state.results.filter((_, index) => index !== resultIndex),
      };
    }
    case "SHOW_RESULTS":
      return {
        ...state,
        showResults: action.payload,
        isReset: false,
      };
    case "UPDATE_RESULTS":
      return {
        ...state,
        isReset: false,
        results: action.payload,
      };
    case "SAVE_VALUES": {
      const { fieldName, scenarioIndex, value } = action.payload;
      const updatedLogs = [...state.logs];
      const existingLogIndex = updatedLogs.findIndex(
        (log) =>
          log.fieldName === fieldName && log.scenarioIndex === scenarioIndex
      );
      if (existingLogIndex !== -1) updatedLogs[existingLogIndex].value = value;
      else {
        updatedLogs.push({
          fieldName,
          scenarioIndex,
          value,
        });
      }
      return {
        ...state,
        logs: updatedLogs,
      };
    }
    case "RESET": {
      const numberOfScenarios = state.scenarios.length;
      const newScenarios = new Array(numberOfScenarios)
        .fill()
        .map(() => ({ ...initialScenario }));
      const newResults = new Array(numberOfScenarios)
        .fill()
        .map(() => ({ ...initialResult }));
      return {
        ...state,
        isReset: true,
        showResults: false,
        scenarios: newScenarios,
        results: newResults,
      };
    }
    default:
      return state;
  }
};
