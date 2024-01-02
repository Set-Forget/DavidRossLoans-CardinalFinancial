import { useContext } from "react";
import RateListBox from "./RateListbox";
import CalculatorInput from "./TableInput";
import { CalculatorContext } from "../../context/CalculatorContext";

const Table = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios, showResults } = state;
  const showAddButton = !showResults && scenarios.length < 5;

  return (
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
              key={`scenario-${index}`}
                className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
              >
                Scenario {index + 1}
                {index >= 2 && (
                  <button
                    className="ml-52"
                    onClick={() =>
                      dispatch({ type: "REMOVE_SCENARIO", payload: index })
                    }
                  >
                    X
                  </button>
                )}
              </th>
            );
          })}
          {showAddButton && (
            <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
              <button className="text-lg" onClick={handleAddScenario}>
                +
              </button>
            </th>
          )}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">
        <tr>
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Purchase Price
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`purchasePrice-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`purchasePrice-${index}`}
                value={scenario.purchasePrice}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Down Payment Percentage
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`downPaymentPercentage-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`downPaymentPercentage-${index}`}
                value={scenario.downPaymentPercentage}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Base Loan Amount
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`baseLoanAmount-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`baseLoanAmount-${index}`}
                value={scenario.baseLoanAmount}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Monthly Mortgage Insurance
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`monthlyMortgageInsurance-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`monthlyMortgageInsurance-${index}`}
                value={
                  isNaN((scenario.baseLoanAmount * 0.85) / 12)
                    ? "0"
                    : String((scenario.baseLoanAmount * 0.85) / 12)
                }
                disabled
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Property Taxes
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`propertyTaxes-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`propertyTaxes-${index}`}
                value={scenario.propertyTaxes}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Home-Owners Insurance
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`homeOwnersInsurance-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`homeOwnersInsurance-${index}`}
                value={scenario.homeOwnersInsurance}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            HOA Payment
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`HOAPayment-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`HOAPayment-${index}`}
                value={scenario.HOAPayment}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Total Closing Costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`totalClosingCosts-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`totalClosingCosts-${index}`}
                value={scenario.totalClosingCosts}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Conventional Mortgage Insurance Paid Up Front
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`mortgageInsurancePaidUpFront-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`mortgageInsurancePaidUpFront-${index}`}
                value={scenario.mortgageInsurancePaidUpFront}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Interest Rate
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`interestRate-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <RateListBox
                name={`interestRate-${index}`}
                value={scenario.interestRate}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );

  function handleAddScenario() {
    dispatch({ type: "ADD_SCENARIO" });
  }
};

export default Table;
