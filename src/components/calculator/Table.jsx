import { useContext } from "react";
import ListBox from "./Listbox";
import CalculatorInput from "./TableInput";
import { CalculatorContext } from "../../context/CalculatorContext";
import SelectType from "./SelectType";
import { SelectVaFoundingFee, SelectWaived } from "./SelectsVa";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "../Button";

const Table = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios } = state;

  const hasVaType = scenarios.some((item) => item.type === "va");
  const hasFhaType = scenarios.some((item) => item.type === "fha");

  return (
    <table className="border-collapse table-fixed xl:table-auto w-full text-md table-inputs">
      <thead>
        <tr>
          <th className="border-b border-slate-600 p-4 pt-0 pb-3 text-slate-200 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
                key={`scenario-${index}`}
                className="font-normal border-b border-slate-600 p-3 pt-2 pb-3 text-white text-left"
              >
                <div className="flex justify-between">
                  <SelectType scenarioIndex={index} name="type" />
                  {index >= 2 && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        dispatch({ type: "REMOVE_SCENARIO", payload: index });
                        dispatch({ type: "REMOVE_RESULT", payload: index });
                      }}
                    >
                      <TrashIcon className="w-5 h-5 fill-white" />
                    </Button>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-slate-800">
        <tr>
          <td className="border-b border-slate-700 p-4 text-white">
            Purchase Price
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`purchasePrice-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            Loan Amount
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`loanAmount-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
            >
              <CalculatorInput
                name={`loanAmount-${index}`}
                value={String(scenario.loanAmount)}
                prefix
              />
            </td>
          ))}
        </tr>
        {hasFhaType && (
          <>
            <tr>
              <td className="border-b border-slate-600 p-4 text-white">
                Loan Amount FHA
              </td>
              {scenarios.map((scenario, index) => {
                return (
                  <td
                    key={`loanAmountFha-${index}`}
                    className="border-b border-slate-600 p-4 text-slate-400"
                  >
                    {scenario.type === "fha" ? (
                      <CalculatorInput
                        name={`loanAmountFha-${index}`}
                        value={String(scenario.loanAmountFha)}
                        prefix
                      />
                    ) : (
                      <span className="flex w-full justify-center">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="border-b border-slate-600 p-4 text-white">
                Monthly Mortgage Insurance
              </td>
              {scenarios.map((scenario, index) => {
                const { purchasePrice, loanAmount, loanTerm } = scenario;
                const mip = getMIP(purchasePrice, loanAmount, loanTerm);
                return (
                  <td
                    key={`monthlyMortgageInsurance-${index}`}
                    className="border-b border-slate-600 p-4 text-slate-400"
                  >
                    {scenario.type === "fha" ? (
                      <div className="flex relative">
                        {loanAmount && (
                          <div className="group relative">
                            <InformationCircleIcon className="h-5 w-5 text-white cursor-pointer absolute left-[-24px] top-2" />
                            <span className="group-hover:opacity-100 group-hover:visible transition-opacity bg-white px-1 text-sm text-black rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 invisible mx-auto z-50 top-[-64px]">
                              <div className="flex flex-col p-2">
                                <span className="truncate">
                                  Formula:{" "}
                                  {"(" + loanAmount + " * " + mip + ") / 12"}
                                </span>
                              </div>
                            </span>
                          </div>
                        )}
                      <CalculatorInput
                        name={`monthlyMortgageInsurance-${index}`}
                        value={String(scenario.monthlyMortgageInsurance)}
                        prefix
                      />
                      </div>
                    ) : (
                      <span className="flex w-full justify-center">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </>
        )}
        {hasVaType && (
          <>
            <tr>
              <td className="border-b border-slate-600 p-4 text-white">
                Loan Amount VA
              </td>
              {scenarios.map((scenario, index) => {
                const { loanAmount, fundingFee } = scenario;
                const loanAmountVa = Number(loanAmount) * Number(fundingFee);
                return (
                  <td
                    key={`loanAmountVa-${index}`}
                    className="border-b border-slate-600 p-4 text-slate-400"
                  >
                    {scenario.type === "va" ? (
                      <CalculatorInput
                        name={`loanAmountVa-${index}`}
                        value={String(scenario.loanAmountVa)}
                        prefix
                      />
                    ) : (
                      <span className="flex w-full justify-center">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="border-b border-slate-600 p-4 text-white">
                Funding Fee
              </td>
              {scenarios.map((scenario, index) => (
                <td
                  key={`fundingFee-${index}`}
                  className="border-b border-slate-600 p-4 text-slate-400"
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
              <td className="border-b border-slate-600 p-4 text-white">
                Waiver of VA Funding Fee
              </td>
              {scenarios.map((scenario, index) => (
                <td
                  key={`waived-${index}`}
                  className="border-b border-slate-600 p-4 text-slate-400"
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
        <tr>
          <td className="border-b border-slate-600 p-4 text-white">
            Loan Term
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`loanTerm-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
            >
              <ListBox name={`loanTerm-${index}`} value={scenario.loanTerm} />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-700 p-4 text-white">
            Down Payment Percentage
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`downPaymentPercentage-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
            >
              <CalculatorInput
                name={`downPaymentPercentage-${index}`}
                value={String(scenario.downPaymentPercentage)}
                suffix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-700 p-4 text-white">
            Down Payment Amount
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`downPaymentAmount-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            Note Rate
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`interestRate-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
            >
              <ListBox
                name={`interestRate-${index}`}
                value={scenario.interestRate}
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-600 p-4 text-white">
            <div className="flex relative">
              <span>APR</span>
              <div className="group relative">
                <InformationCircleIcon className="h-5 w-5 text-white cursor-pointer relative left-3 top-[2px]" />
                <span className="group-hover:opacity-100 group-hover:visible transition-opacity bg-white px-1 text-sm text-black rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 invisible mx-auto z-50 top-[-64px]">
                  <div className="flex flex-col p-2">
                    <span className="truncate">APR (%) | Octane Sync</span>
                  </div>
                </span>
              </div>
            </div>
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`apr-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
            >
              <CalculatorInput
                name={`apr-${index}`}
                value={String(scenario.apr)}
                suffix
              />
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-600 p-4 text-white">
            Charge for interest rate
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`points-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            Hazard Insurance
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`homeOwnersInsurance-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            Mortgage Insurance
          </td>
          {scenarios.map((scenario, index) => {
            return (
              <td
                key={`mortgageInsurance-${index}`}
                className="border-b border-slate-600 p-4 text-slate-400"
              >
                <CalculatorInput
                  name={`mortgageInsurance-${index}`}
                  value={scenario.mortgageInsurance}
                  prefix
                />
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-600 p-4 text-white">
            Property Taxes
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`propertyTaxes-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            HOA Payment
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`HOAPayment-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            Prepaid & Escrow Closing Costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`prepaidEscrowClosingCosts-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            Closing Costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`closingCosts-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
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
          <td className="border-b border-slate-600 p-4 text-white">
            Total Closing Costs
          </td>
          {scenarios.map((scenario, index) => (
            <td
              key={`totalClosingCosts-${index}`}
              className="border-b border-slate-600 p-4 text-slate-400"
            >
              <div className="flex relative">
                <div className="group relative">
                  <InformationCircleIcon className="h-5 w-5 text-white cursor-pointer absolute left-[-24px] top-2" />
                  <span className="group-hover:opacity-100 group-hover:visible transition-opacity bg-white px-1 text-sm text-black rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 invisible mx-auto z-50 top-[-64px]">
                    <div className="flex flex-col p-2">
                      <span className="truncate">
                        Charge for interest rate:{" $"}
                        {Number(scenario.points)}
                      </span>
                      <span className="truncate">
                        Mortgage Insurance:{" $"}
                        {Number(scenario.mortgageInsurance)}
                      </span>
                      <span className="truncate">
                        Prepaid & Escrow:{" $"}
                        {Number(scenario.prepaidEscrowClosingCosts)}
                      </span>
                      <span className="truncate">
                        Closing Costs:{" $"}
                        {Number(scenario.closingCosts)}
                      </span>
                    </div>
                  </span>
                </div>
                <CalculatorInput
                  name={`totalClosingCosts-${index}`}
                  value={String(scenario.totalClosingCosts)}
                  prefix
                />
              </div>
            </td>
          ))}
        </tr>
        <tr>
          <td className="border-b border-slate-600 p-4 text-white">
            Loan to Value
          </td>
          {scenarios.map((scenario, index) => {
            const { purchasePrice, loanAmount } = scenario;
            const showInfo =
              Boolean(Number(purchasePrice)) && Boolean(Number(loanAmount));
            return (
              <td
                key={`loanToValue-${index}`}
                className="border-b border-slate-600 p-4 text-slate-400"
              >
                <div className="flex relative">
                  {showInfo && (
                    <div className="group relative">
                      <InformationCircleIcon className="h-5 w-5 text-white cursor-pointer absolute left-[-24px] top-2" />
                      <span className="group-hover:opacity-100 group-hover:visible transition-opacity bg-white px-1 text-sm text-black rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 invisible mx-auto z-50 top-[-64px]">
                        <div className="flex flex-col p-2">
                          <span className="truncate">
                            Formula: {(purchasePrice + " / " + loanAmount) + " * 100"}
                          </span>
                        </div>
                      </span>
                    </div>
                  )}
                  <CalculatorInput
                    name={`loanToValue-${index}`}
                    value={String(scenario.loanToValue)}
                    suffix
                  />
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );

  function getMIP(purchasePrice, loanAmount, loanTerm) {
    const DEFAULT_LOAN_AMOUNT = 726200;
    const LTV = (Number(purchasePrice) / Number(loanAmount)) * 100;
    const loanTermNumber = Number(loanTerm.split(" ")[0]);
    if (loanTermNumber <= 15) {
      if (Number(loanAmount) <= DEFAULT_LOAN_AMOUNT) {
        if (LTV <= 90) return 15;
        else return 40;
      } else {
        if (LTV <= 78) return 15;
        else if (LTV > 78 && LTV <= 90) return 40;
        else return 65;
      }
    } else {
      if (Number(loanAmount) <= DEFAULT_LOAN_AMOUNT) {
        if (LTV <= 95) return 50;
        else return 55;
      } else {
        if (LTV <= 95) return 70;
        else return 75;
      }
    }
  }

};

export default Table;
