import { useCallback, useContext, useEffect } from "react";
import { DownIcon, UpIcon } from "./Icons";
import { CalculatorContext } from "../../context/CalculatorContext";
import { initialResult } from "../../reducer/Calculator";
import { formatCurrency } from "../../utils/utils";

const TableResult = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios, results, showModalResults } = state;

  const getPMT = useCallback((interestRate, loanAmountValue, loanTerm) => {
    const years = loanTerm.split(" ")[0];
    const monthlyPayments = Number(years) * 12;
    const rate = Number(interestRate?.split(" ")[0]);
    const monthlyPaymentsRate = rate / 12 / 100;
    const dividend = Number(loanAmountValue) * monthlyPaymentsRate;
    const divider = 1 - Math.pow(1 + monthlyPaymentsRate, -monthlyPayments);
    const result = dividend / divider;
    return Math.floor(result);
  }, []);

  const getTotalHousingExpense = useCallback(
    (
      interestRate,
      loanAmountValue,
      loanTerm,
      homeOwnersInsurance,
      mortgageInsurance,
      propertyTaxes
    ) => {
      const pmt = getPMT(interestRate, loanAmountValue, loanTerm);
      const sum =
        Number(homeOwnersInsurance) +
        Number(mortgageInsurance) +
        Number(propertyTaxes);
      return Number(pmt) + sum;
    },
    [getPMT]
  );

  useEffect(() => {
    if (!showModalResults) return;
    const newResults = scenarios.map((scenario) => {
      const { type, loanAmount, fundingFee } = scenario;
      const loanAmountFha = Number(loanAmount) + Number(loanAmount) * 0.0175;
      const loanAmountVa = Number(loanAmount) * Number(fundingFee);
      let loanAmountValue = 0;
      switch (type) {
        case "fha":
          loanAmountValue = loanAmountFha;
          break;
        case "va":
          loanAmountValue = loanAmountVa;
          break;
        default:
          loanAmountValue = loanAmount;
          break;
      }
      const principleAndInterest = getPMT(
        scenario.interestRate,
        loanAmountValue,
        scenario.loanTerm
      );
      const totalHousingExpense = getTotalHousingExpense(
        scenario.interestRate,
        loanAmountValue,
        scenario.loanTerm,
        scenario.homeOwnersInsurance,
        scenario.mortgageInsurance,
        scenario.propertyTaxes
      );
      const totalHousingExpenseWithHOA =
        totalHousingExpense + Number(scenario.HOAPayment);
      const totalDownPayment =
        Number(scenario.purchasePrice) - Number(loanAmountValue);
      const totalCashFromBorrower =
        Number(scenario.purchasePrice) - Number(loanAmountValue);
      return {
        ...initialResult,
        principleAndInterest: checkValue(principleAndInterest),
        totalHousingExpense: checkValue(totalHousingExpense),
        totalHousingExpenseWithHOA: checkValue(totalHousingExpenseWithHOA),
        totalDownPayment: checkValue(totalDownPayment),
        totalCashFromBorrower: checkValue(totalCashFromBorrower),
        homeOwnersInsurance: checkValue(scenario.homeOwnersInsurance),
        mortgageInsurance: checkValue(scenario.mortgageInsurance),
        propertyTaxes: checkValue(scenario.propertyTaxes),
      };
    });

    const checkDelta = (scenario, total, tmpTotal, name) => {
      const value = checkValue(Number(total) - Number(tmpTotal));
      return { value, vs: scenario, name };
    };

    const resultAndComparisons = newResults.map((scenario, index) => {
      const {
        mortgageInsurance,
        totalDownPayment,
        totalCashFromBorrower,
        totalHousingExpenseWithHOA,
      } = scenario;
      const comparisons = [];
      newResults.forEach((r, i) => {
        if (index === i) return;
        comparisons.push(
          checkDelta(
            i + 1,
            totalDownPayment,
            r.totalDownPayment,
            "Down Payment Delta"
          )
        );
        comparisons.push(
          checkDelta(
            i + 1,
            mortgageInsurance,
            r.mortgageInsurance,
            "Closing Cost Delta"
          )
        );
        comparisons.push(
          checkDelta(
            i + 1,
            totalCashFromBorrower,
            r.totalCashFromBorrower,
            "Cash From Borrower Delta"
          )
        );
        comparisons.push(
          checkDelta(
            i + 1,
            totalHousingExpenseWithHOA,
            r.totalHousingExpenseWithHOA,
            "Payment Difference"
          )
        );
      });
      const groupedComparisons = {};
      comparisons.forEach((comparison) => {
        if (!groupedComparisons[comparison.name]) {
          groupedComparisons[comparison.name] = [];
        }
        groupedComparisons[comparison.name].push(comparison);
      });
      return { ...scenario, comparisons: groupedComparisons };
    });
    dispatch({ type: "UPDATE_RESULTS", payload: resultAndComparisons });
        dispatch({
      type: "SET_IS_RESULTS_READY",
      payload: true,
    });
  }, [scenarios, getTotalHousingExpense, dispatch, getPMT, showModalResults]);

  return (
    <table className="border-collapse table-auto w-full text-lg">
      <thead>
        <tr>
          <th className="border-b border-slate-600 p-4 pt-0 pb-3 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
                key={`result-${index}`}
                className="text-lg font-normal border-b border-slate-600 p-4 pt-0 pb-3 text-white text-left"
              >
                Scenario {index + 1}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-slate-800">
        <tr>
          <td className="text-lg font-normal border-b border-slate-700 p-4 text-white">
            <span>Principle</span>
            <span className="ml-2">and</span>
            <span className="ml-2">Interest</span>
          </td>
          {results.map((result, index) => {
            const { principleAndInterest } = result;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(principleAndInterest)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-700 p-4 text-white">
            <span>Hazard</span>
            <span className="ml-2">Insurance</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { homeOwnersInsurance } = scenario;
            return (
              <td
                key={`homeOwnersInsurance-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(homeOwnersInsurance)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
            <span>Mortgage</span>
            <span className="ml-2">Insurance</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { mortgageInsurance } = scenario;
            return (
              <td
                key={`mortgageInsurance-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(mortgageInsurance)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
            <span>Property</span>
            <span className="ml-2">Taxes</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { propertyTaxes } = scenario;
            return (
              <td
                key={`propertyTaxes-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(propertyTaxes)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Housing</span>
            <span className="ml-2">Expense</span>
          </td>
          {results.map((result, index) => {
            const { totalHousingExpense } = result;
            return (
              <td
                key={`totalHousingExpense-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(totalHousingExpense)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Housing</span>
            <span className="ml-2">Expense</span>
            <span className="ml-2">With</span>
            <span className="ml-2">HOA</span>
          </td>
          {results.map((result, index) => {
            const { totalHousingExpenseWithHOA } = result;
            return (
              <td
                key={`totalHousingExpenseWithHOA-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(totalHousingExpenseWithHOA)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Down</span>
            <span className="ml-2">Payment</span>
          </td>
          {results.map((result, index) => {
            const { totalDownPayment } = result;
            return (
              <td
                key={`totalDownPayment-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(totalDownPayment)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
            <span>Total</span>
            <span className="ml-2">Cash</span>
            <span className="ml-2">From</span>
            <span className="ml-2">Borrower</span>
          </td>
          {results.map((result, index) => {
            const { totalCashFromBorrower } = result;
            return (
              <td
                key={`totalCashFromBorrower-${index}`}
                className="border-b border-slate-600 p-4 text-white"
              >
                $ {formatCurrency(totalCashFromBorrower)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
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
                className="border-b border-slate-600 p-4 text-white"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
            <span>Closing</span>
            <span className="ml-2">Cost</span>
            <span className="ml-2">Delta</span>
          </td>
          {scenarios.map((scenario, index) => {
            const { closingCosts: total } = scenario;
            const comparisons = [];
            scenarios.forEach((r, i) => {
              if (index === i) return;
              const { closingCosts: tmpTotal } = r;
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
                className="border-b border-slate-600 p-4 text-white"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
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
                className="border-b border-slate-600 p-4 text-white"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="text-lg font-normal border-b border-slate-600 p-4 text-white">
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
                className="border-b border-slate-600 p-4 text-white"
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
    return isNaN(number) ? "0" : Math.floor(number);
  }
};

export default TableResult;
