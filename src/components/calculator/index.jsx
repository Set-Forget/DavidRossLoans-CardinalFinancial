import { useContext, useState, useEffect, useRef } from "react";
import Table from "./Table";
import TableResult from "./TableResult";
import { AddIcon } from "./Icons";
import { CalculatorContext } from "../../context/CalculatorContext";
import {
  KEY_PURCHASE_PRICE,
  KEY_HOA_PAYMENT,
  MAX_SCENARIOS,
  KEY_PROPERTY_TAXES,
} from "./utils";
import Select from "react-select";

const Calculator = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { showResults, scenarios } = state;
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [options, setOptions] = useState([]);
  const [dealData, setDealData] = useState({
    purchasePrice: null,
    baseLoanAmount: null,
    downPaymentPercentage: null,
    HOAPayment: null,
    propertyTaxes: null,
  });
  const scenariosRef = useRef(scenarios);

  const apiUrl = "https://api.pipedrive.com/v1";
  const apiKey = import.meta.env.VITE_PIPEDRIVE_API_KEY;

  useEffect(() => {
    scenariosRef.current = scenarios;
  }, [scenarios]);

  useEffect(() => {
    const apiEndpoint =
      "/deals?status=all_not_deleted&start=0&limit=500&api_token=";
    fetch(apiUrl + apiEndpoint + apiKey)
      .then((response) => response.json())
      .then((res) => {
        const newOptions = res.data.map((d) => ({
          label: d.title,
          value: d.id,
        }));
        setOptions(newOptions);
      });
  }, [apiKey]);

  useEffect(() => {
    const { purchasePrice, downPaymentPercentage, baseLoanAmount } = dealData;
    if (!purchasePrice || !downPaymentPercentage || !baseLoanAmount) return;
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
          value: downPaymentPercentage,
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "baseLoanAmount",
          scenarioIndex: String(scenarioIndex),
          value: String(baseLoanAmount),
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "HOAPayment",
          scenarioIndex: String(scenarioIndex),
          value: String(dealData?.HOAPayment),
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "propertyTaxes",
          scenarioIndex: String(scenarioIndex),
          value: String(dealData?.propertyTaxes),
        },
      });
    });
  }, [dealData, dispatch, selectedDeal]);

  const showAddScenario = scenarios.length < MAX_SCENARIOS;

  return (
    <section className="rounded-xl">
      <div className="max-w-6xl shadow-sm my-2 rounded-xl">
        <div className="w-full flex justify-between my-6">
          <Select
            id="deals"
            value={selectedDeal}
            onChange={handleSelectChange}
            onInputChange={handleInputChange}
            options={options}
            className="max-w-sm h-[38px] border-none w-full bg-gray-50 text-gray-900 focus:ring-[#00B1A4] focus:border-[#00B1A4] block dark:bg-gray-700 dark:placeholder-gray-400"
          />
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
        {showResults ? (
          <div className="flex w-full justify-end mt-10 mb-10">
            <button
              className="mr-4 border border-white rounded-full px-4 py-2 w-[120px] text-white"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="flex w-full justify-end mt-10 mb-10">
            <button
              className="mr-4 border border-white rounded-full px-4 py-2 w-[120px] text-white"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </div>
        )}
      </div>
      {showResults && (
        <div className="max-w-6xl shadow-sm overflow-auto my-2">
          <TableResult />
        </div>
      )}
    </section>
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
        setOptions(newOptions);
      });
  }

  function searchDealById(id) {
    const apiEndpoint = `/deals/${id}?api_token=`;
    fetch(apiUrl + apiEndpoint + apiKey)
      .then((response) => response.json())
      .then((res) => {
        setDealData({
          purchasePrice: res.data[KEY_PURCHASE_PRICE],
          baseLoanAmount: res.data["value"],
          downPaymentPercentage: (
            (1 - res.data["value"] / res.data[KEY_PURCHASE_PRICE]) *
            100
          ).toFixed(2),
          HOAPayment: res.data[KEY_HOA_PAYMENT],
          propertyTaxes: res.data[KEY_PROPERTY_TAXES],
        });
      });
  }

  function handleSelectChange(selectedOption) {
    setSelectedDeal(selectedOption);
    searchDealById(selectedOption.value);
  }

  function handleInputChange(inputValue) {
    if (inputValue.length > 3) {
      searchDeal(inputValue);
    }
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
};

export default Calculator;
