import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CalculatorContext } from "../context/CalculatorContext";
import { LoadingContext } from "../context/LoadingContext";
import {
  KEY_PURCHASE_PRICE,
  KEY_HOA_PAYMENT,
  KEY_PROPERTY_TAXES,
  KEY_LOAN_TERM,
  KEY_DOWN_PAYMENT_AMOUNT,
  KEY_MORTGAGE_INSURANCE,
} from "../utils/utils";
import { BASE_URL } from "../router";
import Select from "react-select";

const Calculator = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CalculatorContext);
  const { setLoading } = useContext(LoadingContext);
  const { scenarios, deal, selectedDeal, options } = state;
  const scenariosRef = useRef(scenarios);

  const apiUrl = "https://api.pipedrive.com/v1";
  const apiKey = import.meta.env.VITE_PIPEDRIVE_API_KEY;

  useEffect(() => {
    scenariosRef.current = scenarios;
  }, [scenarios]);

  useEffect(() => {
    setLoading(true);
    try {
      const apiEndpoint =
        "/deals?status=all_not_deleted&start=0&limit=500&api_token=";
      fetch(apiUrl + apiEndpoint + apiKey)
        .then((response) => response.json())
        .then((res) => {
          const newOptions = res.data.map((d) => ({
            label: d.title,
            value: d.id,
          }));
          dispatch({ type: "SET_OPTIONS", payload: newOptions });
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

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
    if (!selectedDeal.value) return;
    navigate(`${BASE_URL}calculator/${selectedDeal.value}`);
  }, [deal, dispatch, selectedDeal]);

  return (
    <>
      <h2 className="font-bold text-lg text-white">Conventional Calculator </h2>
      <p className="text-white">
        Workout your property taxes with the calculator below.
      </p>
      <section className="rounded-xl w-full">
        <div className="shadow-sm my-2 rounded-xl">
          <div className="w-full flex my-6">
            <Select
              id="deals"
              value={selectedDeal}
              onChange={handleSelectChange}
              onInputChange={handleInputChange}
              options={options}
              className="max-w-sm mx-auto h-[38px] border-none w-full bg-gray-50 text-gray-900 focus:ring-[#00B1A4] focus:border-[#00B1A4] block dark:bg-gray-700 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </section>
    </>
  );

  function searchDeal(dealTitle) {
    const apiEndpoint =
      "/deals/search?term=" + dealTitle + "&fields=title&start=0&api_token=";
    fetch(apiUrl + apiEndpoint + apiKey)
      .then((response) => response.json())
      .then((res) => {
        const newOptions = res.data.items.map((d) => ({
          label: d.item.title,
          value: d.item.id,
        }));
        dispatch({ type: "SET_OPTIONS", payload: newOptions });
      });
  }

  function searchDealById(id) {
    const apiEndpoint = `/deals/${id}?api_token=`;
    fetch(apiUrl + apiEndpoint + apiKey)
      .then((response) => response.json())
      .then((res) => {
        console.log("dealPage", res.data);
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
  }

  function handleSelectChange(selectedOption) {
    dispatch({ type: "SET_SELECTED_DEAL", payload: selectedOption });
    searchDealById(selectedOption.value);
    dispatch({ type: "RESET" });
  }

  function handleInputChange(inputValue) {
    if (inputValue.length > 3) {
      searchDeal(inputValue);
    }
  }
};

export default Calculator;
