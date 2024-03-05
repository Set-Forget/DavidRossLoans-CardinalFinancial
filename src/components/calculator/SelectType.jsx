import { Fragment, useState, useContext, useEffect, useCallback } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

const SelectType = ({ scenarioIndex, name }) => {
  const { dispatch, state } = useContext(CalculatorContext);
  const values = [
    {
      name: `Conventional - Scenario ${scenarioIndex + 1}`,
      value: "conventional",
    },
    { name: `VA - Scenario ${scenarioIndex + 1}`, value: "va" },
    { name: `FHA - Scenario ${scenarioIndex + 1}`, value: "fha" },
  ];

  const getTypeValue = useCallback((arg) => {
    switch (arg) {
      case "conventional":
        return values[0];
      case "va":
        return values[1];
      case "fha":
        return values[2];
      default:
        return values[0];
    }
  }, []);
  const type = state.scenarios[scenarioIndex].type;
  const defValue = getTypeValue(type);
  const [value, setValue] = useState(defValue);

  useEffect(() => {
    const scenarioType = state.scenarios[scenarioIndex].type;
    if (scenarioType === value.value) return;
    const newDefValue = getTypeValue(scenarioType);
    setValue(newDefValue);
  }, [
    state.scenarios[scenarioIndex].type,
    scenarioIndex,
    value.value,
    values,
    getTypeValue,
  ]);

  return (
    <Listbox as="div" value={value.value} onChange={handleOnChange}>
      <div>
        <Listbox.Button
          className={`h-[2.25rem] w-full flex justify-between cursor-default rounded-lg py-2 pl-3 pr-1 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
        >
          <span className="block truncate text-white w-full text-right">
            {value.name}
          </span>
          <span className="pointer-events-none inset-y-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {values.map((item) => (
              <Listbox.Option
                key={item.value}
                name={name}
                className={({ active }) =>
                  `flex cursor-default select-none py-2 px-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-black"
                  }`
                }
                value={item.value}
              >
                <span
                  className={`block truncate w-full text-right ${
                    item.value === value.value ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.name}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );

  function handleOnChange(e) {
    const item = getTypeValue(e);
    setValue(item);
    dispatch({
      type: "UPDATE_SCENARIO",
      payload: {
        fieldName: name,
        scenarioIndex: String(scenarioIndex),
        value: e,
      },
    });
  }
};

SelectType.propTypes = {
  name: PropTypes.string.isRequired,
  scenarioIndex: PropTypes.number.isRequired,
};

export default SelectType;
