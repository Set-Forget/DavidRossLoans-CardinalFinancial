import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router";
import PropTypes from "prop-types";

export default function App({ children }) {
  return (
    <Router>
      <AppRoutes>{children}</AppRoutes>
    </Router>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
