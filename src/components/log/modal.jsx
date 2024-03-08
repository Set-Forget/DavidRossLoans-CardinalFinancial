import { Fragment, useContext } from "react";
import { LogsContext } from "../../context/LogContext";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import Button from "../Button";
import { formatFieldValue, formatFieldName } from "../../utils/utils";

export default function Modal() {
  const { state, dispatch } = useContext(LogsContext);
  const { showModal, selectedRow } = state;

  const dataToShow = Object.keys(selectedRow).map((scenarioIndex) => ({
    scenarioIndex,
    data: selectedRow[scenarioIndex],
  }));

  return (
    <Transition appear show={showModal} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between">
                  <Dialog.Title
                    as="h1"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Modified fields and values
                  </Dialog.Title>
                  <Button variant="ghost" onClick={closeModal}>
                    <XCircleIcon className="h-6 w-6 fill-black" />
                  </Button>
                </div>
                <div className="my-4">
                  {dataToShow.map((group, index) => (
                    <div key={group.scenarioIndex} className="my-2">
                      <h2 className="font-medium text-md">
                        Scenario {Number(group.scenarioIndex) + 1}
                      </h2>
                      <ul>
                        {group.data.map((item) => (
                          <li
                            key={item.fieldName + index}
                            className="flex w-full justify-between my-1 text-sm"
                          >
                            <span>{formatFieldName(item.fieldName)}</span>
                            <span>
                              {formatFieldValue(item.fieldName, item.value)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center">
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
      type: "SHOW_MODAL",
      payload: false,
    });
  }

  async function handleCopy() {
    let info = "";
    dataToShow.forEach((group) => {
      info += `Scenario ${Number(group.scenarioIndex) + 1}\n`;
      group.data.forEach((item) => {
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
