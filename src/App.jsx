import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Header from "./components/Header";
import PropTypes from 'prop-types';

export default function App({ children }) {
  const headerStyle = {
    background: "linear-gradient(180deg, #05293e, #033652)",
  };

  return (
    <Router>
      <div className="flex flex-col place-items-center h-screen text-stone-800 dark:bg-slate-700 dark:text-white">
        <Header />
        <main
          className="flex-1 w-full flex flex-col place-items-center gap-4 relative p-6"
          style={headerStyle}
        >
          <AppRoutes />
          <div className="w-full h-full bg-white rounded-lg p-4 m-4 flex flex-col place-items-center gap-4 dark:bg-transparent">
            {children}
          </div>
        </main>
      </div>
    </Router>
  );
}

App.propTypes = {
  children: PropTypes.node
};
