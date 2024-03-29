import PropTypes from "prop-types";
export default function Spinner({ isLayout = false }) {
  return (
    <div
      className={`flex flex-1 justify-center items-center w-full ${
        isLayout ? "bg-[#02293f]" : "bg-transparent"
      }`}
    >
      <div className="w-12">
        <div className="relative">
          <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
          <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-green-500 border-t-transparent shadow-md"></div>
        </div>
      </div>
    </div>
  );
}

Spinner.propTypes = {
  isLayout: PropTypes.boolean,
};
