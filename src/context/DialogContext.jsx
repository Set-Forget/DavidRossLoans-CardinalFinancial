import { useReducer, useMemo, createContext } from "react";
import PropTypes from "prop-types";

export const DialogContext = createContext();

const initialState = {
    open: false,
    title: "",
    description: "",
    payload: null,
    onConfirm: () => {},
};

export const DialogProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "OPEN_DIALOG":
                return {
                    ...state,
                    open: true,
                    title: action.title,
                    description: action.description,
                    payload: action.payload,
                    onConfirm: action.onConfirm,
                };
            case "CLOSE_DIALOG":
                return { ...state, open: false };
            default:
                return state;
        }
    }, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
};

DialogProvider.propTypes = {
    children: PropTypes.node,
};
