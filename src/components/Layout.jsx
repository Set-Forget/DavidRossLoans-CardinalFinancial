import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Header from "./Header";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const { loading } = useContext(LoadingContext);

  return (
    <div className="flex flex-col place-items-center h-screen text-stone-800 dark:bg-slate-700 dark:text-white">
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <main
          className="flex-1 w-full flex flex-col place-items-center gap-4 relative p-6"
          style={{
            background: "linear-gradient(180deg, #05293e, #033652)",
          }}
        >
          {children}
        </main>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
