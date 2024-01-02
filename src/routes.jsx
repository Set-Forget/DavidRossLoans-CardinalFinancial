import { Routes, Route } from 'react-router-dom';
import LoginPage from './page/loginPage'
import SearchPage from './page/searchPage'

export const BASE_URL = "/DavidRossLoans-CardinalFinancial/";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={BASE_URL} element={<LoginPage />} />
      <Route path={`${BASE_URL}home`} element={<SearchPage />} />
    </Routes>
  );
};

export default AppRoutes;