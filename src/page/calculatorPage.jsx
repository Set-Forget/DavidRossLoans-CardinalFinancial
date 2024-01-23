import { useCallback, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "../components/calculator/Table";
import TableResult from "../components/calculator/TableResult";
import { AddIcon } from "../components/calculator/Icons";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { CalculatorContext } from "../context/CalculatorContext";
import { LoadingContext } from "../context/LoadingContext";
import { MAX_SCENARIOS } from "../utils/utils";
import { BASE_URL } from "../router";
import Spinner from "../components/Spinner";

export default function CalculatorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CalculatorContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { showResults, scenarios, selectedDeal } = state;
  const apiUrl = "https://api.pipedrive.com/v1";
  const apiKey = import.meta.env.VITE_PIPEDRIVE_API_KEY;

  const getDealById = useCallback(() => {
    setLoading(true);
    const apiEndpoint = `/deals/${id}?api_token=`;
    try {
      fetch(apiUrl + apiEndpoint + apiKey)
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            navigate(`${BASE_URL}calculator`);
            return;
          }
          dispatch({
            type: "SET_DEAL",
            payload: {
              purchasePrice: res.data[KEY_PURCHASE_PRICE],
              loanAmount: res.data["value"],
              downPaymentPercentage: (
                (1 - res.data["value"] / res.data[KEY_PURCHASE_PRICE]) *
                100
              ).toFixed(2),
              loanTerm: String(res.data[KEY_LOAN_TERM] / 12),
              HOAPayment: res.data[KEY_HOA_PAYMENT],
              propertyTaxes: res.data[KEY_PROPERTY_TAXES],
              downPaymentAmount: res.data[KEY_DOWN_PAYMENT_AMOUNT],
              mortgageInsurance: res.data[KEY_MORTGAGE_INSURANCE],
            },
          });
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDeal?.value) return;
    getDealById();
  }, [selectedDeal, getDealById]);

  const showAddScenario = scenarios.length < MAX_SCENARIOS;

  if (loading) return <Spinner isLayout />;

  return (
    <>
      <h2 className="font-bold text-lg text-white">Conventional Calculator </h2>
      <p className="text-white">
        Workout your property taxes with the calculator below.
      </p>
      <section className="rounded-xl">
        <div className="max-w-6xl shadow-sm my-2 rounded-xl">
          <div className="w-full flex justify-between my-6">
            <button onClick={handleGoBack} className="flex items-center">
              <ChevronLeftIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
              Go back
            </button>
            <button
              className="flex items-center text-md font-medium whitespace-nowrap mb-1 border border-white rounded-full px-3 py-2 text-white"
              onClick={handleAddScenario}
              disabled={!showAddScenario}
            >
              Add Scenario&nbsp;
              <AddIcon />
            </button>
          </div>
          <Table />
          <div className="flex w-full justify-end mt-10 mb-10 gap-6">
            <button
              className="border border-white rounded-full px-4 py-2 w-[120px] text-white"
              onClick={handleReset}
            >
              Reset
            </button>
            {!showResults && (
              <button
                className="border border-white rounded-full px-4 py-2 w-[120px] text-white"
                onClick={handleCalculate}
              >
                Calculate
              </button>
            )}
          </div>
        </div>
        {showResults && (
          <div className="max-w-6xl shadow-sm overflow-auto my-2">
            <TableResult />
          </div>
        )}
      </section>
    </>
  );

  function handleGoBack() {
    navigate(-1);
    dispatch({
      type: "SET_DEAL",
      payload: null,
    });
    dispatch({
      type: "SET_SELECTED_DEAL",
      payload: null,
    });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  function handleCalculate() {
    dispatch({ type: "SHOW_RESULTS", payload: true });
  }

  function handleAddScenario() {
    dispatch({ type: "ADD_SCENARIO" });
  }
}
