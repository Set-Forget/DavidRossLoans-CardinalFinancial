import { useEffect, useContext, useState } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Header from "./Header";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import Sidebar, { navigation } from "./Sidebar";
import { useLocation } from "react-router-dom";

const DEF_ROUTE = "home"

const LayoutInternal = ({ children }) => {
  const { loading } = useContext(LoadingContext);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const dashboardIndex = pathSegments.findIndex(
      (segment) => segment === DEF_ROUTE
    );
    if (dashboardIndex >= pathSegments.length - 1) {
      const route = navigation.find(item => item.href === DEF_ROUTE)
      setCurrentPage(route.name);
    }
    else {
      const path = pathSegments[dashboardIndex + 1];
      const route = navigation.find(item => item.href === path)
      setCurrentPage(route.name);
    }
  }, [location.pathname]);

  return (
    <div className="place-items-center bg-[#033652] text-white">
      <div className="flex w-full h-full min-h-[100dvh]">
        <Sidebar callback={setCurrentPage} value={currentPage} />
        <div className="flex w-full flex-col overflow-auto">
          <Header currentPage={currentPage} />
          {loading ? (
            <Spinner isLayout={true} />
          ) : (
            <main className="flex-1 content-area-height lg:content-area-width flex flex-col place-items-center gap-4 relative p-16 h-full lg:overflow-auto bg-[#02293f]">
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
        <main className="flex-1 w-full flex flex-col place-items-center gap-4 relative p-6 bg-[#02293f]">
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
