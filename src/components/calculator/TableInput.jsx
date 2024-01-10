import { useContext, useState, useEffect } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import PropTypes from "prop-types";

const CalculatorInput = ({
  name,
  value,
  disabled = false,
  prefix = false,
  suffix = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [focus, setFocus] = useState(false);
  const { dispatch, state } = useContext(CalculatorContext);
  const { isReset } = state;

  useEffect(() => {
    if (!value || value === localValue) return;
    let val = value;
    val = val.replace(/[^0-9.]/g, "").replace(/(\.\d{2})\d+/, "$1");
    if (prefix) val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setLocalValue(val);
  }, [value, prefix, localValue]);

  useEffect(() => {
    if (!isReset) return;
    setLocalValue("");
  }, [isReset]);

  return (
    <div className={`flex items-center relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm ${focus ? "outline outline-2 outline-[#2684FF]" : ""}`}>
      {prefix && <span className="ml-2">$ </span>}
      {!prefix && !suffix && <>&nbsp;&nbsp;</>}
      <input
        className={`${
          suffix ? "text-right pr-1" : ""
        } w-full border-none pl-1 text-sm leading-5 text-gray-900 focus:ring-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]`}
        onChange={handleOnChange}
        name={name}
        value={localValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={name}
        disabled={disabled}
        type="text"
      />
      {suffix && <span className="mr-4">% </span>}
    </div>
  );

  function handleOnChange(e) {
    const [fieldName, scenarioIndex] = name.split("-");
    let val = e.target.value;
    const storeValue = val
      .replace(/[^0-9.]/g, "")
      .replace(/(\.\d{2})\d+/, "$1");
    let _localValue = "";
    if (prefix) _localValue = storeValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else _localValue = storeValue;
    setLocalValue(_localValue);
    dispatch({
      type: "UPDATE_SCENARIO",
      payload: {
        fieldName,
        scenarioIndex,
        value: storeValue,
      },
    });
  }

  function handleFocus() {
    setFocus(true)
  }

  function handleBlur() {
    setFocus(false)
  }

};

CalculatorInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  prefix: PropTypes.bool,
  suffix: PropTypes.bool,
};

export default CalculatorInput;
