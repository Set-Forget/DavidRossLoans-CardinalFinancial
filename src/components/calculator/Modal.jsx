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
import { Dialog, Transition } from "@headlessui/react";
import { LogoIcon } from "./Icons";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { formatFieldName, formatFieldValue } from "../../utils/utils";
import html2canvas from "html2canvas";

export default function Modal() {
  const { state, dispatch } = useContext(CalculatorContext);
  const { logs } = state;
  const { showModalResults } = state;
  const componentRef = useRef();
  const hasLogs = Boolean(logs.length);
  const [imageDataUrl, setImageDataUrl] = useState(null);

  const generateImage = useCallback(() => {
    html2canvas(componentRef.current).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");
      setImageDataUrl(dataUrl);
    });
  }, []);

  useEffect(() => {
    if (!showModalResults) return;
    generateImage();
  }, [showModalResults]);

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
                  <button onClick={closeModal}>
                    <XCircleIcon className="h-6 w-6 fill-black" />
                  </button>
                </div>
                <div className="my-4">
                  {!imageDataUrl ? (
                    <div
                      ref={componentRef}
                      className="my-2 bg-[#02293f]"
                    >
                      <div className="w-full justify-start relative top-6 left-4">
                        <LogoIcon />
                      </div>
                      <TableResult />
                    </div>
                  ) : (
                    <div className="mt-8 flex w-full justify-center">
                      <img src={imageDataUrl} alt="Generated Result" />
                    </div>
                  )}
                </div>
                {hasLogs && (
                  <div className="w-full flex justify-center">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="w-[320px] text-white bg-[#033652] font-medium rounded-full text-md px-4 py-2 m-auto"
                    >
                      Copy Text
                    </button>
                  </div>
                )}
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
  }

  async function handleCopy() {
    const groupedData = logs.reduce((acc, item) => {
      const index = parseInt(item.scenarioIndex);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(item);
      return acc;
    }, []);
    if (!groupedData.length) return;
    let info = "";
    groupedData.forEach((group, index) => {
      info += `Scenario ${index + 1}\n`;
      group.forEach((item) => {
        info += `${formatFieldName(item.fieldName)}: ${formatFieldValue(
          item.fieldName,
          item.value
        )}\n`;
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
