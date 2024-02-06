import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { PIPE } from "../utils/utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem("user");
    return localData ? JSON.parse(localData) : "";
  });

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    if (!user.email) return;
    const admins = import.meta.env.VITE_ADMIN;
    const adminList = admins.split(PIPE);
    const isAdmin = adminList.includes((user.email));
    setUser({...user, admin: isAdmin});
  }, [user?.email])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
