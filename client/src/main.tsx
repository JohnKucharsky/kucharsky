import React from "react";
import ReactDOM from "react-dom/client";
import "../index.scss";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import store from "./redux/store";
import { Provider } from "react-redux";
import { queryClient } from "./helpers/queryClient";
import { router } from "./routes";
import { I18nextProvider } from "react-i18next";
import i18n from "./helpers/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <I18nextProvider i18n={i18n}>
                        <RouterProvider router={router} />
                    </I18nextProvider>
                </QueryClientProvider>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
);
