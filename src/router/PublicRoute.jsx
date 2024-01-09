import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BASE_URL } from ".";
import Layout from "../components/Layout";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const { email: isAuthenticated } = user;

  if (isAuthenticated) return <Navigate to={`${BASE_URL}home`} replace />;

  return <Layout>{children}</Layout>;
};

PublicRoute.propTypes = {
  children: PropTypes.node,
};

export default PublicRoute;
