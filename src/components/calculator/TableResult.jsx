import { useCallback, useContext, useEffect } from "react";
import { DownIcon, UpIcon } from "./Icons";
import { CalculatorContext } from "../../context/CalculatorContext";
import { initialResult } from "../../reducer/Calculator";
import { formatCurrency } from "../../utils/utils";

const TableResult = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios, results, showModalResults } = state;

  const getPMT = useCallback((interestRate, loanAmount, loanTerm) => {
    const years = loanTerm.split(" ")[0];
    const monthlyPayments = Number(years) * 12;
    const rate = Number(interestRate?.split(" ")[0]);
    const monthlyPaymentsRate = rate / 12 / 100;
    const dividend = Number(loanAmount) * monthlyPaymentsRate;
    const divider = 1 - Math.pow(1 + monthlyPaymentsRate, -monthlyPayments);
    return (dividend / divider).toFixed(2);
  }, []);

  const getTotalHousingExpense = useCallback(
    (
      interestRate,
      loanAmount,
      loanTerm,
      homeOwnersInsurance,
      monthlyMortgageInsurance,
      propertyTaxes
    ) => {
      const pmt = getPMT(interestRate, loanAmount, loanTerm);
      const sum =
        Number(homeOwnersInsurance) +
        Number(monthlyMortgageInsurance) +
        Number(propertyTaxes);
      return Number(pmt) + sum;
    },
    [getPMT]
  );

  useEffect(() => {
    if (!showModalResults) return;
    const newResults = scenarios.map((scenario) => {
      const principleAndInterest = getPMT(
        scenario.interestRate,
        scenario.loanAmount,
        scenario.loanTerm
      );
      const totalHousingExpense = getTotalHousingExpense(
        scenario.interestRate,
        scenario.loanAmount,
        scenario.loanTerm,
        scenario.homeOwnersInsurance,
        scenario.monthlyMortgageInsurance,
        scenario.propertyTaxes
      );
      const totalHousingExpenseWithHOA =
        totalHousingExpense + Number(scenario.HOAPayment);
      const totalDownPayment =
        Number(scenario.purchasePrice) - Number(scenario.loanAmount);
      const totalCashFromBorrower =
        Number(scenario.purchasePrice) - Number(scenario.loanAmount);
      return {
        ...initialResult,
        principleAndInterest,
        totalHousingExpense,
        totalHousingExpenseWithHOA,
        totalDownPayment,
        totalCashFromBorrower,
      };
    });

    dispatch({ type: "UPDATE_RESULTS", payload: newResults });
  }, [scenarios, getTotalHousingExpense, dispatch, getPMT, showModalResults]);

  return (
    <table className="border-collapse table-auto w-full text-lg">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 p-4 pt-0 pb-3 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
                key={`result-${index}`}
                className="text-lg font-normal border-b dark:border-slate-600 p-4 pt-0 pb-3 text-white text-left"
              >
                Scenario {index + 1}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="dark:bg-slate-800">
        <tr>
          <td className="text-lg font-normal border-b border-slate-100 dark:border-slate-700 p-4 text-white">
            <span>Principle</span>
            <span className="ml-2">and</span>
            <span className="ml-2">Interest</span>
          </td>
          {results.map((result, index) => {
            const { principleAndInterest } = result;
            const value = checkValue(principleAndInterest);
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-100 dark:border-slate-700 p-4 text-white">
            <span>Homeowners</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { homeOwnersInsurance } = scenario;
            const value = checkValue(homeOwnersInsurance);
            return (
              <td
                key={`homeOwnersInsurance-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Monthly</span>
            <span className="ml-2">Mortgage</span>
            <span className="ml-2">Insurance</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { loanAmount } = scenario;
            const value = checkValue((loanAmount * 0.85) / 12);
            return (
              <td
                key={`monthlyMortgageInsurance-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Property</span>
            <span className="ml-2">Taxes</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { propertyTaxes } = scenario;
            const value = checkValue(propertyTaxes);
            return (
              <td
                key={`propertyTaxes-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Housing</span>
            <span className="ml-2">Expense</span>
          </td>
          {results.map((result, index) => {
            const { totalHousingExpense } = result;
            const value = checkValue(totalHousingExpense);
            return (
              <td
                key={`totalHousingExpense-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Housing</span>
            <span className="ml-2">Expense</span>
            <span className="ml-2">With</span>
            <span className="ml-2">HOA</span>
          </td>
          {results.map((result, index) => {
            const { totalHousingExpenseWithHOA } = result;
            const value = checkValue(totalHousingExpenseWithHOA);
            return (
              <td
                key={`totalHousingExpenseWithHOA-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Down</span>
            <span className="ml-2">Payment</span>
          </td>
          {results.map((result, index) => {
            const { totalDownPayment } = result;
            const value = checkValue(totalDownPayment);
            return (
              <td
                key={`totalDownPayment-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Cash</span>
            <span className="ml-2">From</span>
            <span className="ml-2">Borrower</span>
          </td>
          {results.map((result, index) => {
            const { totalCashFromBorrower } = result;
            const value = checkValue(totalCashFromBorrower);
            return (
              <td
                key={`totalCashFromBorrower-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(value)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Down</span>
            <span className="ml-2">Payment</span>
            <span className="ml-2">Delta</span>
          </td>
          {results.map((result, index) => {
            const { totalDownPayment: total } = result;
            const comparisons = [];
            results.forEach((r, i) => {
              if (index === i) return;
              const { totalDownPayment: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              comparisons.push(
                <span
                  className="flex items-center whitespace-nowrap"
                  key={`downPaymentDelta-${index}-${i}`}
                >
                  Vs Scenario {i + 1}:
                  <span
                    className={`flex items-center ml-2 ${
                      value >= 0 ? "text-[#2BCE9D]" : "text-[#FC3945]"
                    }`}
                  >
                    $&nbsp;{formatCurrency(value)}&nbsp;
                    {value >= 0 ? (
                      <div className="relative -bottom-2.5 left-1">
                        <UpIcon />
                      </div>
                    ) : (
                      <div className="relative -bottom-2 left-1">
                        <DownIcon />
                      </div>
                    )}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`closingCostDelta-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Closing</span>
            <span className="ml-2">Cost</span>
            <span className="ml-2">Delta</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { singlePremiumMortgageInsurance: total } = scenario;
            const comparisons = [];
            scenarios.forEach((r, i) => {
              if (index === i) return;
              const { singlePremiumMortgageInsurance: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              comparisons.push(
                <span
                  className="flex items-center whitespace-nowrap"
                  key={`closingCostDelta-${index}-${i}`}
                >
                  Vs Scenario {i + 1}:
                  <span
                    className={`flex items-center ml-2 ${
                      value >= 0 ? "text-[#2BCE9D]" : "text-[#FC3945]"
                    }`}
                  >
                    $&nbsp;{formatCurrency(value)}&nbsp;
                    {value >= 0 ? (
                      <div className="relative -bottom-2.5 left-1">
                        <UpIcon />
                      </div>
                    ) : (
                      <div className="relative -bottom-2 left-1">
                        <DownIcon />
                      </div>
                    )}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`closingCostDelta-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Cash</span>
            <span className="ml-2">From</span>
            <span className="ml-2">Borrower</span>
            <span className="ml-2">Delta</span>
          </td>
          {results.map((result, index) => {
            const { totalCashFromBorrower: total } = result;
            const comparisons = [];
            results.forEach((r, i) => {
              if (index === i) return;
              const { totalCashFromBorrower: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              comparisons.push(
                <span
                  className="flex items-center whitespace-nowrap"
                  key={`cashFromBorrowerDelta-${index}-${i}`}
                >
                  Vs Scenario {i + 1}:
                  <span
                    className={`flex items-center ml-2 ${
                      value >= 0 ? "text-[#2BCE9D]" : "text-[#FC3945]"
                    }`}
                  >
                    $&nbsp;{formatCurrency(value)}&nbsp;
                    {value >= 0 ? (
                      <div className="relative -bottom-2.5 left-1">
                        <UpIcon />
                      </div>
                    ) : (
                      <div className="relative -bottom-2 left-1">
                        <DownIcon />
                      </div>
                    )}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`cashFromBorrowerDelta-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            <span>Payment</span>
            <span className="ml-2">Difference</span>
          </td>
          {results.map((result, index) => {
            const { totalHousingExpenseWithHOA: total } = result;
            const comparisons = [];
            results.forEach((r, i) => {
              if (index === i) return;
              const { totalHousingExpenseWithHOA: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              comparisons.push(
                <span
                  className="flex items-center whitespace-nowrap"
                  key={`paymentDifference-${index}-${i}`}
                >
                  Vs Scenario {i + 1}:
                  <span
                    className={`flex items-center ml-2 ${
                      value >= 0 ? "text-[#2BCE9D]" : "text-[#FC3945]"
                    }`}
                  >
                    $&nbsp;{formatCurrency(value)}&nbsp;
                    {value >= 0 ? (
                      <div className="relative -bottom-2.5 left-1">
                        <UpIcon />
                      </div>
                    ) : (
                      <div className="relative -bottom-2 left-1">
                        <DownIcon />
                      </div>
                    )}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`paymentDifferences-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-white"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );

  function checkValue(value) {
    const number = Number(value);
    return isNaN(number) ? "0" : number.toFixed(2);
  }
};

export default TableResult;
