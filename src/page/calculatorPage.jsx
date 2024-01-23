import { useCallback, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "../components/calculator/Table";
import TableResult from "../components/calculator/TableResult";
import { AddIcon } from "../components/calculator/Icons";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { CalculatorContext } from "../context/CalculatorContext";
import { LoadingContext } from "../context/LoadingContext";
import { MAX_SCENARIOS } from "../utils/utils";
import {
  KEY_PURCHASE_PRICE,
  KEY_LOAN_TERM,
  KEY_DOWN_PAYMENT_AMOUNT,
  KEY_HOA_PAYMENT,
  KEY_PROPERTY_TAXES,
  KEY_MORTGAGE_INSURANCE
} from "../utils/utils";
import { BASE_URL } from "../router";

export default function CalculatorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CalculatorContext);
  const { setLoading } = useContext(LoadingContext);
  const { showResults, scenarios, deal, selectedDeal } = state;

  const scenariosRef = useRef(scenarios);

  useEffect(() => {
    scenariosRef.current = scenarios;
  }, [scenarios]);

  const getDealById = useCallback(async () => {
    const apiUrl = "https://api.pipedrive.com/v1";
    const apiKey = import.meta.env.VITE_PIPEDRIVE_API_KEY;
    const apiEndpoint = `/deals/${id}?api_token=`;
    try {
      const response = await fetch(apiUrl + apiEndpoint + apiKey);
      const resJSON = await response.json();
      if (!resJSON.success) {
        navigate(`${BASE_URL}calculator`);
        return;
      }
      const { data } = resJSON;
      dispatch({
        type: "SET_DEAL",
        payload: {
          purchasePrice: data[KEY_PURCHASE_PRICE],
          loanAmount: data["value"],
          downPaymentPercentage: (
            (1 - data["value"] / data[KEY_PURCHASE_PRICE]) *
            100
          ).toFixed(2),
          loanTerm: String(data[KEY_LOAN_TERM] / 12),
          HOAPayment: data[KEY_HOA_PAYMENT],
          propertyTaxes: data[KEY_PROPERTY_TAXES],
          downPaymentAmount: data[KEY_DOWN_PAYMENT_AMOUNT],
          mortgageInsurance: data[KEY_MORTGAGE_INSURANCE],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, [id, navigate, BASE_URL, dispatch]);

  useEffect(() => {
    if (selectedDeal?.value) return;
    setLoading(true);
    getDealById();
    setLoading(false);
  }, [setLoading, selectedDeal?.value, getDealById]);

  useEffect(() => {
    if (!deal) return
    const { purchasePrice, loanAmount } = deal;
    if (!purchasePrice || !loanAmount) return;
    scenariosRef.current.forEach((_, scenarioIndex) => {
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "purchasePrice",
          scenarioIndex: String(scenarioIndex),
          value: String(purchasePrice),
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "downPaymentPercentage",
          scenarioIndex: String(scenarioIndex),
          value: deal.downPaymentPercentage,
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "loanAmount",
          scenarioIndex: String(scenarioIndex),
          value: String(loanAmount),
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "loanTerm",
          scenarioIndex: String(scenarioIndex),
          value: deal?.loanTerm ? deal?.loanTerm + " years" : "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "HOAPayment",
          scenarioIndex: String(scenarioIndex),
          value: deal?.HOAPayment ?? "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "propertyTaxes",
          scenarioIndex: String(scenarioIndex),
          value: deal?.propertyTaxes ?? "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "downPaymentAmount",
          scenarioIndex: String(scenarioIndex),
          value: deal?.downPaymentAmount ?? "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "singlePremiumMortgageInsurance",
          scenarioIndex: String(scenarioIndex),
          value: deal?.mortgageInsurance ?? "",
        },
      });
    });
  }, [deal, dispatch, selectedDeal]);

  const showAddScenario = scenarios.length < MAX_SCENARIOS;

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
    navigate(`${BASE_URL}calculator`);
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
