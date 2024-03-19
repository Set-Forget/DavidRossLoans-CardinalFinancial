import { useCallback, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "./Table";
import { PlusIcon } from "@heroicons/react/20/solid";
import { CalculatorContext } from "../../context/CalculatorContext";
import { UserContext } from "../../context/UserContext";
import { LoadingContext } from "../../context/LoadingContext";
import {
  MAX_SCENARIOS,
  KEY_PURCHASE_PRICE,
  KEY_LOAN_TERM,
  KEY_DOWN_PAYMENT_AMOUNT,
  KEY_HOA_PAYMENT,
  KEY_PROPERTY_TAXES,
  KEY_MORTGAGE_INSURANCE,
  KEY_NOTE_RATE,
  KEY_HAZARD_INSURANCE,
  calculateDownPaymentPercentage,
  API_URL,
  KEY_APR,
} from "../../utils/utils";
import Modal from "./Modal";
import Button from "../Button";
import Select from "react-select";

const apiUrl = "https://api.pipedrive.com/v1";
const apiKey = import.meta.env.VITE_PIPEDRIVE_API_KEY;

export default function SectionCalculator() {
  const { id: idParam } = useParams();
  const { state, dispatch } = useContext(CalculatorContext);
  const { user } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);
  const { showModalResults, scenarios, deal, selectedDeal, options } = state;
  const scenariosRef = useRef(scenarios);

  useEffect(() => {
    scenariosRef.current = scenarios;
  }, [scenarios]);

  const getDealById = useCallback(
    async (id) => {
      const apiEndpoint = `/deals/${id}?api_token=`;
      try {
        const response = await fetch(apiUrl + apiEndpoint + apiKey);
        const resJSON = await response.json();
        const { data } = resJSON;
        const purchasePrice = data[KEY_PURCHASE_PRICE];
        const loanAmount = data["value"];
        const downPaymentPercentage = calculateDownPaymentPercentage(
          loanAmount,
          purchasePrice
        );
        const loanTerm = String(data[KEY_LOAN_TERM] / 12);
        const HOAPayment = data[KEY_HOA_PAYMENT];
        const propertyTaxes = data[KEY_PROPERTY_TAXES];
        const interestRate = data[KEY_NOTE_RATE];
        const apr = data[KEY_APR];
        const homeOwnersInsurance = data[KEY_HAZARD_INSURANCE];
        const defaultDownPaymentAmount =
          Number(purchasePrice) - Number(loanAmount);
        const downPaymentAmount = data[KEY_DOWN_PAYMENT_AMOUNT];
        const downPaymentAmountValue =
          downPaymentAmount || defaultDownPaymentAmount;
        const mortgageInsurance = data[KEY_MORTGAGE_INSURANCE];
        dispatch({
          type: "SET_DEAL",
          payload: {
            purchasePrice,
            loanAmount,
            downPaymentPercentage,
            loanTerm,
            HOAPayment,
            propertyTaxes,
            downPaymentAmount: downPaymentAmountValue,
            interestRate,
            apr,
            homeOwnersInsurance,
            mortgageInsurance,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    try {
      setLoading(true);
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
  }, [setLoading, dispatch]);

  useEffect(() => {
    if (selectedDeal?.value || !idParam) return;
    setLoading(true);
    getDealById(idParam);
    setLoading(false);
  }, [setLoading, selectedDeal?.value, getDealById, idParam]);

  useEffect(() => {
    if (!deal) return;
    const { purchasePrice, loanAmount } = deal;
    if (!purchasePrice || !loanAmount) return;
    const formatNumbers = (arg) => String(Math.floor(Number(arg)));
    scenariosRef.current.forEach((_, scenarioIndex) => {
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "purchasePrice",
          scenarioIndex: String(scenarioIndex),
          value: formatNumbers(purchasePrice),
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
          value: formatNumbers(loanAmount),
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
          value: deal?.HOAPayment ? formatNumbers(deal?.HOAPayment) : "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "propertyTaxes",
          scenarioIndex: String(scenarioIndex),
          value: deal?.propertyTaxes ? formatNumbers(deal?.propertyTaxes) : "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "downPaymentAmount",
          scenarioIndex: String(scenarioIndex),
          value: deal?.downPaymentAmount
            ? formatNumbers(deal?.downPaymentAmount)
            : "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "mortgageInsurance",
          scenarioIndex: String(scenarioIndex),
          value: deal?.mortgageInsurance
            ? formatNumbers(deal?.mortgageInsurance)
            : "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "interestRate",
          scenarioIndex: String(scenarioIndex),
          value: deal?.interestRate ?? "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "apr",
          scenarioIndex: String(scenarioIndex),
          value: deal?.apr ?? "",
        },
      });
      dispatch({
        type: "UPDATE_SCENARIO",
        payload: {
          fieldName: "homeOwnersInsurance",
          scenarioIndex: String(scenarioIndex),
          value: deal?.homeOwnersInsurance
            ? formatNumbers(deal?.homeOwnersInsurance)
            : "",
        },
      });
    });
  }, [deal, dispatch, selectedDeal]);

  const showAddScenario = scenarios.length < MAX_SCENARIOS;
  return (
    <section className="w-full">
      <div className="max-w-6xl mb-2">
        <div className="w-full flex justify-between mb-6">
          <div className="flex w-[320px]">
            <Select
              id="deals"
              value={selectedDeal}
              onChange={handleSelectChange}
              onInputChange={handleInputChange}
              options={options}
              placeholder="Select deal"
              className="max-w-sm mx-auto h-[38px] border-none w-full text-gray-700 focus:ring-[#00B1A4] focus:border-[#00B1A4] block bg-slate-800 placeholder-gray-400"
            />
          </div>
          {showAddScenario && (
            <Button onClick={handleAddScenario}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Scenario
            </Button>
          )}
        </div>
        <div className="flex flex-col">
          <Table />
          <div className="flex w-full justify-end mt-10 mb-10 gap-6">
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleCalculate}>Calculate</Button>
          </div>
          {showModalResults && <Modal />}
        </div>
      </div>
    </section>
  );

  function handleSelectChange(selectedOption) {
    dispatch({ type: "SET_SELECTED_DEAL", payload: selectedOption });
    getDealById(selectedOption.value);
    dispatch({ type: "RESET" });
  }

  function handleInputChange(inputValue) {
    if (inputValue.length > 3) {
      const apiEndpoint =
        "/deals/search?term=" + inputValue + "&fields=title&start=0&api_token=";
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
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  async function handleCalculate() {
    dispatch({ type: "SHOW_MODAL_RESULTS", payload: true });
    const { logs } = state;
    const hasLogs = Boolean(logs.length);
    if (!hasLogs) return;
    try {
      const newDate = new Date().toISOString();
      let dataToLog = {
        time: newDate,
        email: user.email,
        action: "Calculate",
        deal: idParam,
        values: JSON.stringify(logs),
      };
      dataToLog = JSON.stringify(dataToLog);
      dataToLog = encodeURIComponent(dataToLog);
      const url = `${API_URL}?action=addLogCalculator&&logData=${dataToLog}`;
      await fetch(url);
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddScenario() {
    dispatch({ type: "ADD_SCENARIO" });
  }
}
