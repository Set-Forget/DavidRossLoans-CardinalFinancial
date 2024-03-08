import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { DialogProvider } from "./context/DialogContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    scopes={["email"]}
  >
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <DialogProvider>
            <UserProvider>
              <LoadingProvider>
                <App />
              </LoadingProvider>
            </UserProvider>
          </DialogProvider>
        </ModalProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
