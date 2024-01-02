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
        scenarios: state.scenarios.map((scenario, index) => {
          if (String(index) === scenarioIndex) {
            return { ...scenario, [fieldName]: value };
          }
          return scenario;
        }),
      };
    }
    case "ADD_SCENARIO":
      if (state.scenarios.length >= 5) {
        return state;
      }
      return {
        ...state,
        scenarios: [...state.scenarios, { ...initialScenario }],
        results: [...state.results, { ...initialResult }],
      };
    case "REMOVE_SCENARIO": {
      const scenarioIndex = action.payload;
      return {
        ...state,
        scenarios: state.scenarios.filter(
          (_, index) => index !== scenarioIndex
        ),
      };
    }
    case "REMOVE_RESULT": {
      const resultIndex = action.payload;
      return {
        ...state,
        results: state.results.filter(
          (_, index) => index !== resultIndex
        ),
      };
    }
    case "SHOW_RESULTS":
      return {
        ...state,
        showResults: action.payload,
      };
    case "UPDATE_RESULTS":
      return {
        ...state,
        results: action.payload,
      };
    case "RESET":
      return {
        ...state,
        showResults: false,
        scenarios: [{ ...initialScenario }, { ...initialScenario }],
        results: [{ ...initialResult }, { ...initialResult }],
      };
    default:
      return state;
  }
};
