import { useContext } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import PropTypes from "prop-types";

const CalculatorInput = ({ name, value, disabled = false }) => {
  const { dispatch } = useContext(CalculatorContext);
  return (
    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
      <input
        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
        onChange={handleOnChange}
        name={name}
        value={value}
        id={name}
        disabled={disabled}
        type="text"
      />
    </div>
  );

  function handleOnChange(e) {
    const [fieldName, scenarioIndex] = name.split("-");
    dispatch({
      type: "UPDATE_SCENARIO",
      payload: {
        fieldName,
        scenarioIndex,
        value: e.target.value
      }
    });
  }
};

CalculatorInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CalculatorInput;
