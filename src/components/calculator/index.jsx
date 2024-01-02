import { useContext } from "react";
import Table from "./Table";
import TableResult from "./TableResult";
import { CalculatorContext } from "../../context/CalculatorContext";

const Calculator = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { showResults } = state;

  return (
    <div className="mt-2 -mb-3">
      <div className="bg-slate-50 rounded-xl overflow-auto dark:bg-slate-800/25">
        <div className="rounded-xl overflow-auto">
          <div className="shadow-sm overflow-auto my-2">
            <Table />
            <div className="flex w-full justify-end my-10">
              <button className="mr-4" onClick={handleReset}>
                Reset
              </button>
              <button onClick={handleCalculate}>Calculate</button>
            </div>
            {showResults && <TableResult />}
          </div>
        </div>
      </div>
    </div>
  );

  function handleReset() {
    dispatch({ type: 'RESET' });
  }

  function handleCalculate() {
    dispatch({ type: 'SHOW_RESULTS', payload: true });
  }
}

export default Calculator;