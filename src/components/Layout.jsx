import { useContext, useState } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Header from "./Header";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Sidebar, { navigation } from "./Sidebar";

const LayoutInternal = ({ children }) => {
  const { loading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(navigation[0].name);

  return (
    <div className="place-items-center bg-[#033652] text-white">
      <div className="flex w-full h-full min-h-[100dvh]">
        <Sidebar callback={setCurrentPage} value={currentPage} />
        <div className="flex w-full flex-col overflow-auto">
          <Header currentPage={currentPage} />
          {loading ? (
            <Spinner isLayout={true} />
          ) : (
            <main
              className="flex-1 content-area-height lg:content-area-width flex flex-col place-items-center gap-4 relative p-16 h-full lg:overflow-auto bg-[#02293f]"
            >
              {children}
            </main>
          )}
        </div>
      </div>
    </div>
  );
};

LayoutInternal.propTypes = {
  children: PropTypes.node,
};

export const LayoutExternal = ({ children }) => {
  const { loading } = useContext(LoadingContext);

  return (
    <div className="flex flex-col place-items-center h-screen bg-[#033652] text-white">
      <Header />
      {loading ? (
        <Spinner isLayout={true} />
      ) : (
        <main
          className="flex-1 w-full flex flex-col place-items-center gap-4 relative p-6 bg-[#02293f]"
        >
          {children}
        </main>
      )}
    </div>
  );
};

LayoutExternal.propTypes = {
  children: PropTypes.node,
};

export default LayoutInternal;
