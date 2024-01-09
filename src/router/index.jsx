import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../page/loginPage";
import SearchPage from "../page/searchPage";
import CalculatorPage from "../page/calculatorPage";

export const BASE_URL = "/DavidRossLoans-CardinalFinancial/";

const AppRoutes = () => {
  return (
    <Routes>
      {customRoute("", LoginPage, false)}
      {customRoute("home", SearchPage, true)}
      {customRoute("calculator", CalculatorPage, true)}
    </Routes>
  );
};

function customRoute(path, Page, isProtected) {
  const page = isProtected ? (
    <ProtectedRoute>
      <Page />
    </ProtectedRoute>
  ) : (
    <PublicRoute>
      <Page />
    </PublicRoute>
  );

  return <Route path={`${BASE_URL}${path}`} element={page} />;
}

export default AppRoutes;
