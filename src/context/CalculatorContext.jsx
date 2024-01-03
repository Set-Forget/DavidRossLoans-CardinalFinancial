import { useReducer, useMemo, createContext } from "react";
import {
  calculatorReducer,
  initialScenario,
  initialResult,
} from "../reducer/Calculator";
import PropTypes from "prop-types";

export const CalculatorContext = createContext();

const initialState = {
  showResults: false,
  isReset: false,
  scenarios: [initialScenario, initialScenario],
  results: [initialResult, initialResult],
};

export const CalculatorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

CalculatorProvider.propTypes = {
  children: PropTypes.node,
};
