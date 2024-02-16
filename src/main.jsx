import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { CalculatorProvider } from "./context/CalculatorContext";
import { ModalProvider } from "./context/ModalContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} scopes={["email"]}>
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <UserProvider>
                        <LoadingProvider>
                            <CalculatorProvider>
                                <App />
                            </CalculatorProvider>
                        </LoadingProvider>
                    </UserProvider>
                </ModalProvider>
            </QueryClientProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
