import { Fragment, useState, useContext, useEffect, useRef } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export const SelectVaFoundingFee = ({ name, value }) => {
  const { dispatch, state } = useContext(CalculatorContext);
  const { scenarios } = state;
  const [width, setWidth] = useState(0);
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);
  const [fieldName, scenarioIndex] = name.split("-");
  const values = [
    "0",
    `Less than 5% = 2.15%`,
    `5% or more =  1.5%`,
    `10% or more = 1.25%`,
    `Less than 5% = 3.3%`,
  ];

  useEffect(() => {
    if (!ref.current) return;
    const width = ref.current.clientWidth;
    setWidth(width);
  }, [scenarios.length, value]);

  return (
    <Listbox
      as="div"
      value={value}
      disabled={value === "0"}
      onChange={handleOnChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`${
        focus ? "outline outline-2 outline-[#2684FF] rounded-lg" : ""
      }`}
    >
      <div ref={ref}>
        <Listbox.Button
          className={`h-[2.25rem] w-full flex justify-between cursor-default rounded-lg py-2 pl-3 pr-1 text-left bg-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
        >
          <span className="block truncate text-black w-full text-right">
            {value}
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
          <Listbox.Options
            style={{ width: `${width}px` }}
            className="z-50 absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            {values.map((item) => (
              <Listbox.Option
                key={item}
                disabled={item === "0"}
                className={({ active }) =>
                  `flex cursor-default select-none py-2 px-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-black"
                  }`
                }
                value={item}
              >
                {item === value && <CheckIcon className="h-5 w-5" />}
                <span
                  className={`block w-full text-right ${
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
  );

  function handleOnChange(e) {
    dispatch({
      type: "UPDATE_SCENARIO",
      payload: {
        fieldName,
        scenarioIndex,
        value: e,
      },
    });
  }

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }
};

export const SelectWaived = ({ name, value }) => {
  const { dispatch, state } = useContext(CalculatorContext);
  const { scenarios } = state;
  const [width, setWidth] = useState(0);
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);
  const values = ["yes", "no"];
  const [fieldName, scenarioIndex] = name.split("-");

  useEffect(() => {
    if (!ref.current) return;
    const width = ref.current.clientWidth;
    setWidth(width);
  }, [scenarios.length]);

  return (
    <Listbox
      as="div"
      value={value}
      onChange={handleOnChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`${
        focus ? "outline outline-2 outline-[#2684FF] rounded-lg" : ""
      }`}
    >
      <div ref={ref}>
        <Listbox.Button
          className={`h-[2.25rem] w-full flex justify-between cursor-default rounded-lg py-2 pl-3 pr-1 text-left bg-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
        >
          <span className="block truncate text-black w-full text-right capitalize">
            {value}
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
          <Listbox.Options
            style={{ width: `${width}px` }}
            className="z-50 absolute mt-1 max-h-60 w-auto overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            {values.map((item) => (
              <Listbox.Option
                key={item}
                name=""
                className={({ active }) =>
                  `flex cursor-default select-none py-2 px-4 capitalize ${
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
  );

  function handleOnChange(e) {
    dispatch({
      type: "UPDATE_SCENARIO",
      payload: {
        fieldName,
        scenarioIndex,
        value: e,
      },
    });
    dispatch({
      type: "UPDATE_SCENARIO",
      payload: {
        fieldName: "fundingFee",
        scenarioIndex,
        value: e === "yes" ? "0" : "",
      },
    });
  }

  function handleFocus() {
    setFocus(true);
  }

  function handleBlur() {
    setFocus(false);
  }
};
