import { useReducer, useMemo, createContext } from "react";
import PropTypes from "prop-types";

export const ModalContext = createContext();

const initialState = {
    open: false,
    view: false,
    title: "",
    subtitle: "",
    payload: {},
};

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "OPEN_MODAL":
                return {
                    ...state,
                    open: true,
                    view: action.view,
                    title: action.title,
                    subtitle: action.subtitle,
                    payload: action.payload,
                };
            case "CLOSE_MODAL":
                return { ...state, open: false };
            default:
                return state;
        }
    }, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

ModalProvider.propTypes = {
    children: PropTypes.node,
};
