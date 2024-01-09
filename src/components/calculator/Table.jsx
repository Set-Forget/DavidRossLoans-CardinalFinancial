import { useContext } from "react";
import RateListBox from "./RateListbox";
import CalculatorInput from "./TableInput";
import { CalculatorContext } from "../../context/CalculatorContext";
import { RemoveIcon } from "./Icons";

const Table = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios } = state;

  return (
    <table className="border-collapse table-fixed text-md">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
                key={`scenario-${index}`}
                className="font-bold border-b dark:border-slate-600 p-4 pt-2 pb-3 text-white text-left"
              >
                Scenario {index + 1}
                {index >= 2 && (
                  <button
                    className="font-bold text-white relative float-right"
                    onClick={() => {
                      dispatch({ type: "REMOVE_SCENARIO", payload: index });
                      dispatch({ type: "REMOVE_RESULT", payload: index });
                    }}
                  >
                    <RemoveIcon />
                  </button>
                )}
              </th>
            );
          })}

        </tr>
      </thead>
      <tbody className="dark:bg-slate-800">
        <tr>
          <td className="font-bold border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-white">
            Purchase Price
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`purchasePrice-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput name={`purchasePrice-${index}`} value={scenario.purchasePrice} prefix />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-white">
            Down Payment Percentage
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`downPaymentPercentage-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput name={`downPaymentPercentage-${index}`} value={scenario.downPaymentPercentage} suffix />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
            Base Loan Amount
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`baseLoanAmount-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput name={`baseLoanAmount-${index}`} value={scenario.baseLoanAmount} prefix />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
            Monthly Mortgage Insurance
          </td>
          {scenarios.map((scenario, index) => {
            return (
              <td
                key={`monthlyMortgageInsurance-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                <span className="opacity-75 cursor-not-allowed flex bg-white rounded-lg w-full justify-start border-none p-2 text-sm leading-5 text-gray-900 focus:ring-0">
                ${" "}{scenario.monthlyMortgageInsurance}
                </span>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
            Property Taxes
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`propertyTaxes-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput name={`propertyTaxes-${index}`} value={scenario.propertyTaxes} prefix />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
            Home-Owners Insurance
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`homeOwnersInsurance-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput name={`homeOwnersInsurance-${index}`} value={scenario.homeOwnersInsurance} prefix />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
            HOA Payment
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`HOAPayment-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput name={`HOAPayment-${index}`} value={scenario.HOAPayment} prefix />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
            Total Closing Costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`totalClosingCosts-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput name={`totalClosingCosts-${index}`} value={scenario.totalClosingCosts} prefix />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
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
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="font-bold border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-white">
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
};

export default Table;
