import { Fragment, useRef, useState, useContext, useEffect } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { rates, years } from "../../utils/utils";
import { CheckIcon } from "./Icons";
import PropTypes from "prop-types";

const ListBox = ({ name, value }) => {
  const { dispatch, state } = useContext(CalculatorContext);
  const { scenarios, isReset } = state;
  const [width, setWidth] = useState(0);
  const [focus, setFocus] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const ref = useRef(null);
  const _value = value.split(" ")[0];
  const [fieldName, scenarioIndex] = name.split("-");
  const isLoanTerm = fieldName === "loanTerm";
  const values = isLoanTerm ? years : rates;
  const valueToShow = (value ? _value : "") + (isLoanTerm ? " years" : " %");

  useEffect(() => {
    if (!ref.current) return;
    const width = ref.current.clientWidth;
    setWidth(width);
  }, [scenarios.length]);

  useEffect(() => {
    if (isReset) setIsEdited(false);
  }, [isReset]);

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
        <Listbox.Button className={`h-[2.25rem] w-full flex justify-between cursor-default rounded-lg ${isEdited ? "bg-yellow-100" : "bg-white"}  py-2 pl-3 pr-1 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}>
          <span className="block truncate text-black w-full text-right">
            {valueToShow}
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
  );

  function handleOnChange(e) {
    if (!isEdited) setIsEdited(true);
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

ListBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ListBox;
