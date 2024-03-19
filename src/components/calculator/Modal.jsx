import {
  Fragment,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import TableResult from "./TableResult";
import Button from "../Button";
import { Dialog, Transition } from "@headlessui/react";
import { LogoIcon } from "./Icons";
import { XCircleIcon } from "@heroicons/react/20/solid";
import html2canvas from "html2canvas";

export default function Modal() {
  const { state, dispatch } = useContext(CalculatorContext);
  const { results, showModalResults, isResultsCalculated } = state;
  const componentRef = useRef();
  const [imageDataUrl, setImageDataUrl] = useState(null);

  const generateImage = useCallback(() => {
    html2canvas(componentRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      setImageDataUrl(dataUrl);
    });
  }, []);

  useEffect(() => {
    if (!showModalResults ||!isResultsCalculated) return;
    generateImage();
  }, [showModalResults, isResultsCalculated]);

  return (
    <Transition appear show={showModalResults} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-screen transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-end">
                  <Button variant="ghost" onClick={closeModal}>
                    <XCircleIcon className="h-6 w-6 fill-black" />
                  </Button>
                </div>
                <div className="my-4">
                  {imageDataUrl && isResultsCalculated ? (
                    <div className="mt-8 flex w-full justify-center">
                      <img src={imageDataUrl} alt="Generated Result" />
                    </div>
                  ) : (
                    <div ref={componentRef} className="my-2 bg-[#02293f]">
                      <div className="w-full justify-start relative top-6 left-4">
                        <LogoIcon />
                      </div>
                      <TableResult />
                    </div>
                  )}
                </div>
                <div className="w-full flex justify-center">
                  <Button onClick={handleCopy}>Copy Text</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  function closeModal() {
    dispatch({
      type: "SHOW_MODAL_RESULTS",
      payload: false,
    });
    dispatch({
      type: "SET_IS_RESULTS_READY",
      payload: false,
    });
  }

  async function handleCopy() {
    let info = "";
    results.forEach((scenario, index) => {
      info += `Scenario ${index + 1}\n`;
      info += `Principle and Interest: $ ${scenario.principleAndInterest}\n`;
      info += `Hazard Insurance: $ ${scenario.homeOwnersInsurance}\n`;
      info += `Mortgage Insurance: $ ${scenario.mortgageInsurance}\n`;
      info += `Property Taxes: $ ${scenario.propertyTaxes}\n`;
      info += `Total Housing Expense: $ ${scenario.totalHousingExpense}\n`;
      info += `Total Housing Expense with HOA: $ ${scenario.totalHousingExpenseWithHOA}\n`;
      info += `Total Down Payment: $ ${scenario.totalDownPayment}\n`;
      info += `Total Cash From Borrower: $ ${scenario.totalCashFromBorrower}\n`;
      Object.keys(scenario.comparisons).forEach((name) => {
        const comparisonList = scenario.comparisons[name];
        info += `${name}: `;
        comparisonList.forEach((comparison, i) => {
          info += `Vs Scenario ${comparison.vs} $ ${comparison.value}`;
          if (i < comparisonList.length - 1) {
            info += ", ";
          }
        });
        info += "\n";
      });
      info += "\n";
    });
    try {
      await navigator.clipboard.writeText(info);
    } catch (err) {
      console.error(err);
    }
  }
}
