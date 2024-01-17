import { useCallback, useContext, useEffect } from "react";
import { DownIcon, UpIcon } from "./Icons";
import { CalculatorContext } from "../../context/CalculatorContext";
import { initialResult } from "../../reducer/Calculator";

const TableResult = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios, results, showResults } = state;

  const getPMT = useCallback((interestRate, loanAmount, loanTerm) => {
    const years = loanTerm.split(" ")[0]
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
    if (!showResults) return;
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
  }, [scenarios, getTotalHousingExpense, dispatch, getPMT, showResults]);


  return (
    <table className="border-collapse table-auto w-full text-md">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 p-4 pt-0 pb-3 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
                key={`result-${index}`}
                className="font-normal border-b dark:border-slate-600 p-4 pt-0 pb-3 text-white text-left"
              >
                Scenario {index + 1}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="dark:bg-slate-800">
        <tr>
          <td className="font-normal border-b border-slate-100 dark:border-slate-700 p-4 text-white">
            Principle and Interest
          </td>
          {results.map((result, index) => {
            const { principleAndInterest } = result;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue(principleAndInterest)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-100 dark:border-slate-700 p-4 text-white">
            Home-Owners Insurance
          </td>
          {scenarios.map((scenario, index) => {
            const { homeOwnersInsurance } = scenario;
            return (
              <td
                key={`homeOwnersInsurance-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue(homeOwnersInsurance)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Monthly Mortgage Insurance
          </td>
          {scenarios.map((scenario, index) => {
            const { loanAmount } = scenario;
            return (
              <td
                key={`monthlyMortgageInsurance-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue((loanAmount * 0.85) / 12)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Property Taxes
          </td>
          {scenarios.map((scenario, index) => {
            const { propertyTaxes } = scenario;
            return (
              <td
                key={`propertyTaxes-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue(propertyTaxes)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Total Housing Expense
          </td>
          {results.map((result, index) => {
            const { totalHousingExpense } = result;
            return (
              <td
                key={`totalHousingExpense-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue(totalHousingExpense)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Total Housing Expense With the HOA
          </td>
          {results.map((result, index) => {
            const { totalHousingExpenseWithHOA } = result;
            return (
              <td
                key={`totalHousingExpenseWithHOA-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue(totalHousingExpenseWithHOA)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Total Down Payment
          </td>
          {results.map((result, index) => {
            const { totalDownPayment } = result;
            return (
              <td
                key={`totalDownPayment-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue(totalDownPayment)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Total Cash From Borrower
          </td>
          {results.map((result, index) => {
            const { totalCashFromBorrower } = result;
            return (
              <td
                key={`totalCashFromBorrower-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                $ {checkValue(totalCashFromBorrower)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Down Payment Delta
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
                    $&nbsp;{value}&nbsp;{value >= 0 ? <UpIcon /> : <DownIcon />}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`closingCostDelta-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Closing Cost Delta
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
                   $&nbsp;{value}&nbsp;{value >= 0 ? <UpIcon /> : <DownIcon />}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`closingCostDelta-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Cash From Borrower Delta
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
                    $&nbsp;{value}&nbsp;{value >= 0 ? <UpIcon /> : <DownIcon />}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`cashFromBorrowerDelta-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
              >
                <div className="flex flex-col">{comparisons}</div>
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="font-normal border-b border-slate-200 dark:border-slate-600 p-4 text-white">
            Payment Difference
          </td>
          {results.map((result, index) => {
            const { totalHousingExpenseWithHOA: total } = result;
            const comparisons = [];
            results.forEach((r, i) => {
              if (index === i) return;
              const { totalHousingExpenseWithHOA: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              comparisons.push(
                <span className="flex items-center whitespace-nowrap" key={`paymentDifference-${index}-${i}`}>
                  Vs Scenario {i + 1}:
                  <span
                    className={`flex items-center ml-2 ${
                      value >= 0 ? "text-[#2BCE9D]" : "text-[#FC3945]"
                    }`}
                  >
                    $&nbsp;{value}&nbsp;{value >= 0 ? <UpIcon /> : <DownIcon />}
                  </span>
                </span>
              );
            });
            return (
              <td
                key={`paymentDifferences-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-400"
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
