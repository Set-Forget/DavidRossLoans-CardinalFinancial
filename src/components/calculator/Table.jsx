import { useContext } from "react";
import ListBox from "./Listbox";
import CalculatorInput from "./TableInput";
import { CalculatorContext } from "../../context/CalculatorContext";
import { RemoveIcon } from "./Icons";
import SelectType from "./SelectType";
import { SelectVaFoundingFee, SelectWaived } from "./SelectsVa";
import { formatCurrency } from "../../utils/utils";

const Table = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios } = state;

  const hasVaType = scenarios.some((item) => item.type === "va");

  return (
    <table className="border-collapse table-auto w-full text-md table-inputs">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
                key={`scenario-${index}`}
                className="font-normal border-b dark:border-slate-600 p-3 pt-2 pb-3 text-white text-left"
              >
                <div className="flex">
                  <SelectType scenarioIndex={index} name="type" />
                  {index >= 2 && (
                    <button
                      className="text-white relative float-right"
                      onClick={() => {
                        dispatch({ type: "REMOVE_SCENARIO", payload: index });
                        dispatch({ type: "REMOVE_RESULT", payload: index });
                      }}
                    >
                      <RemoveIcon />
                    </button>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="dark:bg-slate-800">
        <tr>
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-white">
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
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Loan Amount
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`loanAmount-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`loanAmount-${index}`}
                value={String(scenario.loanAmount)}
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Loan Term
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`loanTerm-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <ListBox name={`loanTerm-${index}`} value={scenario.loanTerm} />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-white">
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
                suffix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-white">
            Down Payment Amount
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`downPaymentAmount-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                prefix
                name={`downPaymentAmount-${index}`}
                value={String(scenario.downPaymentAmount)}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Interest Rate
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`interestRate-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <ListBox
                name={`interestRate-${index}`}
                value={scenario.interestRate}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Charge for interest rate
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`points-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`points-${index}`}
                value={scenario.points}
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Homeowners
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`homeOwnersInsurance-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`homeOwnersInsurance-${index}`}
                value={scenario.homeOwnersInsurance}
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Monthly Mortgage Insurance
          </td>
          {scenarios.map((scenario, index) => {
            return (
              <td
                key={`monthlyMortgageInsurance-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                <CalculatorInput
                  name={`monthlyMortgageInsurance-${index}`}
                  value={scenario.monthlyMortgageInsurance}
                  prefix
                />
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
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
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
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
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Single Premium Mortgage Insurance
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`singlePremiumMortgageInsurance-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`singlePremiumMortgageInsurance-${index}`}
                value={scenario.singlePremiumMortgageInsurance}
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Prepaid & Escrow closing costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`prepaidEscrowClosingCosts-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`prepaidEscrowClosingCosts-${index}`}
                value={scenario.prepaidEscrowClosingCosts}
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Closing Costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`closingCosts-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <CalculatorInput
                name={`closingCosts-${index}`}
                value={scenario.closingCosts}
                prefix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Total Closing Costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`totalClosingCosts-${index}`}
              className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
            >
              <span className="opacity-75 cursor-not-allowed flex bg-white rounded-lg w-full justify-start border-none p-2 text-sm leading-5 text-gray-900">
                $ {getTotalClosingCost(scenario)}
              </span>
            </td>
          ))}
        </tr>
        {hasVaType && (
          <>
            <tr>
              <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
                Funding Fee
              </td>
              {scenarios.map((scenario, index) => (
                <td
                  key={`fundingFee-${index}`}
                  className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
                >
                  {scenario.type === "va" ? (
                    <SelectVaFoundingFee
                      name={`fundingFee-${index}`}
                      value={scenario.fundingFee}
                    />
                  ) : (
                    <span className="flex w-full justify-center">-</span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-white">
                Waiver of VA Funding Fee”
              </td>
              {scenarios.map((scenario, index) => (
                <td
                  key={`waived-${index}`}
                  className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
                >
                  {scenario.type === "va" ? (
                    <SelectWaived
                      name={`waived-${index}`}
                      value={scenario.waived}
                    />
                  ) : (
                    <span className="flex w-full justify-center">-</span>
                  )}
                </td>
              ))}
            </tr>
          </>
        )}
      </tbody>
    </table>
  );

  function getTotalClosingCost(scenario) {
    const {
      points,
      singlePremiumMortgageInsurance,
      prepaidEscrowClosingCosts,
      closingCosts,
    } = scenario;
    const _points = Number(points);
    const _singlePremiumMortgageInsurance = Number(
      singlePremiumMortgageInsurance
    );
    const _prepaidEscrowClosingCosts = Number(prepaidEscrowClosingCosts);
    const _closingCosts = Number(closingCosts);
    return (
      _points +
      _singlePremiumMortgageInsurance +
      _prepaidEscrowClosingCosts +
      _closingCosts
    );
  }
};

export default Table;
