import { Fragment, useRef, useState, useContext, useEffect } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { rates } from "./rates";
import { CheckIcon } from "./Icons";
import PropTypes from "prop-types";

const RateListBox = ({ name, value }) => {
  const { dispatch, state } = useContext(CalculatorContext);
  const { scenarios } = state;
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const _value = value.split(" ")[0];
  
  useEffect(() => {
    if (!ref.current) return;
    const width = ref.current.clientWidth;
    setWidth(width);
  }, [scenarios.length]);

  return (
    <div className="-top-5">
      <Listbox value={value} onChange={handleOnChange}>
        <div className="mt-1" ref={ref}>
          <Listbox.Button className="h-[2.25rem] w-full flex justify-between cursor-default rounded-lg bg-white py-2 pl-3 pr-1 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-black w-full text-right">{_value}{value && " %"}</span>
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
            <Listbox.Options
              style={{ width: `${width}px` }}
              className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              {rates.map((item) => (
                <Listbox.Option
                  key={item}
                  name=""
                  className={({ active }) =>
                    `flex cursor-default select-none py-2 px-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-black"
                    }`
                  }
                  value={item}
                >
                  {item === value && <CheckIcon />}
                  <span
                    className={`block truncate w-full text-right ${
                      item === value ? "font-bold" : "font-normal"
                    }`}
                  >
                    {item}
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );

  function handleOnChange(e) {
    const [fieldName, scenarioIndex] = name.split("-");
    dispatch({
      type: "UPDATE_SCENARIO",
      payload: {
        fieldName,
        scenarioIndex,
        value: e,
      },
    });
  }
};

RateListBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default RateListBox;
