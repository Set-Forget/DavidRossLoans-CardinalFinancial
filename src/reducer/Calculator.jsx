import { MAX_SCENARIOS, calculateMortgageInsurance } from "../components/calculator/utils";

export const initialScenario = {
  purchasePrice: "",
  downPaymentPercentage: "",
  baseLoanAmount: "",
  monthlyMortgageInsurance: "",
  propertyTaxes: "",
  homeOwnersInsurance: "",
  HOAPayment: "",
  totalClosingCosts: "",
  mortgageInsurancePaidUpFront: "",
  interestRate: "",
};

export const initialResult = {
  principleAndInterest: "",
  totalHousingExpense: "",
  housingExpenseWithHOA: "",
  totalDownPayment: "",
  totalCashFromBorrower: "",
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
            if (fieldName === "baseLoanAmount") {
              updatedScenario.monthlyMortgageInsurance =
                calculateMortgageInsurance(value);
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
        scenarios: [...state.scenarios, { ...initialScenario }],
        results: [...state.results, { ...initialResult }],
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
