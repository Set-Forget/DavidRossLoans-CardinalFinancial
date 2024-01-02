import { useCallback, useContext, useEffect } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import { initialResult } from "../../reducer/Calculator";

const TableResult = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { scenarios, results, showResults } = state;

  const getPMT = useCallback((interestRate, baseLoanAmount) => {
    const monthlyPayments = 30 * 12;
    const rate = Number(interestRate?.split("%")[0]);
    const monthlyPaymentsRate = rate / 12 / 100;
    const dividend = Number(baseLoanAmount) * monthlyPaymentsRate;
    const divider = 1 - Math.pow(1 + monthlyPaymentsRate, -monthlyPayments);
    return (dividend / divider).toFixed(2);
  }, []);

  const getTotalHousingExpense = useCallback(
    (
      interestRate,
      baseLoanAmount,
      homeOwnersInsurance,
      monthlyMortgageInsurance,
      propertyTaxes
    ) => {
      const pmt = getPMT(interestRate, baseLoanAmount);
      const sum =
        Number(homeOwnersInsurance) +
        Number(monthlyMortgageInsurance) +
        Number(propertyTaxes);
      return pmt + sum;
    },
    [getPMT]
  );

  useEffect(() => {
    if (!showResults) return;
    const newResults = scenarios.map((scenario) => {
      const principleAndInterest = getPMT(
        scenario.interestRate,
        scenario.baseLoanAmount
      );
      const totalHousingExpense = getTotalHousingExpense(
        scenario.interestRate,
        scenario.baseLoanAmount,
        scenario.homeOwnersInsurance,
        scenario.monthlyMortgageInsurance,
        scenario.propertyTaxes
      );
      const totalHousingExpenseWithHOA =
        totalHousingExpense + Number(scenario.HOAPayment);
      const totalDownPayment =
        Number(scenario.purchasePrice) - Number(scenario.baseLoanAmount);
      const totalCashFromBorrower =
        Number(scenario.purchasePrice) - Number(scenario.baseLoanAmount);
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
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
            {""}
          </th>
          {scenarios.map((_, index) => {
            return (
              <th
                key={`result-${index}`}
                className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
              >
                Scenario {index + 1}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-slate-800">
        <tr>
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Principle and Interest
          </td>
          {results.map((result, index) => {
            const { principleAndInterest } = result;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(principleAndInterest)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Home-Owners Insurance
          </td>
          {scenarios.map((scenario, index) => {
            const { homeOwnersInsurance } = scenario;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(homeOwnersInsurance)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Monthly Mortgage Insurance
          </td>
          {scenarios.map((scenario, index) => {
            const { monthlyMortgageInsurance } = scenario;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(monthlyMortgageInsurance)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Property Taxes
          </td>
          {scenarios.map((scenario, index) => {
            const { propertyTaxes } = scenario;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(propertyTaxes)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Total Housing Expense
          </td>
          {results.map((result, index) => {
            const { totalHousingExpense } = result;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(totalHousingExpense)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Total Housing Expense With the HOA
          </td>
          {results.map((result, index) => {
            const { totalHousingExpenseWithHOA } = result;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(totalHousingExpenseWithHOA)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Total Down Payment
          </td>
          {results.map((result, index) => {
            const { totalDownPayment } = result;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(totalDownPayment)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Total Cash From Borrower
          </td>
          {results.map((result, index) => {
            const { totalCashFromBorrower } = result;
            return (
              <td
                key={`principleAndInterest-${index}`}
                className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
              >
                ${checkValue(totalCashFromBorrower)}
              </td>
            );
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Down Payment Delta
          </td>
          {results.map((result, index) => {
            const { totalDownPayment: total } = result;
            return results.map((r, i) => {
              if (index === i) return;
              const { totalDownPayment: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              return (
                <td
                  key={`principleAndInterest-${index}`}
                  className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
                >
                  Vs Scenario {i}: ${value} {value >= 0 ? "↑" : "↓"}
                </td>
              );
            });
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Closing Cost Delta
          </td>
          {scenarios.map((scenario, index) => {
            const { mortgageInsurancePaidUpFront: total } = scenario;
            return scenarios.map((s, i) => {
              if (index === i) return;
              const { mortgageInsurancePaidUpFront: tmpTotal } = s;
              const value = checkValue(total - tmpTotal);
              return (
                <td
                  key={`principleAndInterest-${index}`}
                  className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
                >
                  Vs Scenario {i}: ${value} {value >= 0 ? "↑" : "↓"}
                </td>
              );
            });
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Cash From Borrower Delta
          </td>
          {results.map((result, index) => {
            const { totalCashFromBorrower: total } = result;
            return results.map((r, i) => {
              if (index === i) return;
              const { totalCashFromBorrower: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              return (
                <td
                  key={`principleAndInterest-${index}`}
                  className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
                >
                  Vs Scenario {i}: ${value} {value >= 0 ? "↑" : "↓"}
                </td>
              );
            });
          })}
        </tr>
        <tr>
          <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
            Payment Difference
          </td>
          {results.map((result, index) => {
            const { totalHousingExpenseWithHOA: total } = result;
            return results.map((r, i) => {
              if (index === i) return;
              const { totalHousingExpenseWithHOA: tmpTotal } = r;
              const value = checkValue(total - tmpTotal);
              return (
                <td
                  key={`principleAndInterest-${index}`}
                  className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400"
                >
                  Vs Scenario {i}: ${value} {value >= 0 ? "↑" : "↓"}<br/>
                </td>
              );
            });
          })}
        </tr>
      </tbody>
    </table>
  );

  function checkValue(value) {
    const number = Number(value);
    return isNaN(number) ? 0 : number;
  }
};

export default TableResult;
