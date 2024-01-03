import { useContext } from "react";
import Table from "./Table";
import TableResult from "./TableResult";
import { AddIcon } from "./Icons";
import { CalculatorContext } from "../../context/CalculatorContext";
import { MAX_SCENARIOS } from "./utils";

const Calculator = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { showResults, scenarios } = state;
  const showAddScenario = scenarios.length < MAX_SCENARIOS;

  return (
    <section className="bg-slate-50 rounded-xl dark:bg-slate-800/25">
      <div className="max-w-6xl shadow-sm my-2 rounded-xl">
        <div className="w-full flex justify-end mb-6">
          {showAddScenario && (
            <button
              className="flex items-center text-md font-medium whitespace-nowrap mb-1 border border-white rounded-full px-3 py-2"
              onClick={handleAddScenario}
            >
              Add Scenario&nbsp;
              <AddIcon />
            </button>
          )}
        </div>
        <Table />
        {showResults ? (
          <div className="flex w-full justify-end mt-10 mb-10">
            <button
              className="mr-4 border border-white rounded-full px-4 py-2 w-[120px]"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="flex w-full justify-end mt-10 mb-10">
            <button
              className="mr-4 border border-white rounded-full px-4 py-2 w-[120px]"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </div>
        )}
      </div>
      {showResults && (
        <div className="max-w-6xl shadow-sm overflow-auto my-2">
          <TableResult />
        </div>
      )}
    </section>
  );

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  function handleCalculate() {
    dispatch({ type: "SHOW_RESULTS", payload: true });
  }

  function handleAddScenario() {
    dispatch({ type: "ADD_SCENARIO" });
  }
};

export default Calculator;
