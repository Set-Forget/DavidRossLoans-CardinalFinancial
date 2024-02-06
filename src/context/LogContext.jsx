import { useReducer, useMemo, createContext } from "react";
import { logsReducer } from "../reducer/Log";
import PropTypes from "prop-types";

export const LogsContext = createContext();

const initialState = {
  showModal: false,
  logsData: [],
  selectedRow: null,
};

export const LogsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logsReducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <LogsContext.Provider value={contextValue}>
      {children}
    </LogsContext.Provider>
  );
};

LogsProvider.propTypes = {
  children: PropTypes.node,
};
