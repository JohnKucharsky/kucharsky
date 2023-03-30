import React from "react";
import ReactDOM from "react-dom/client";
import "../index.scss";
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./pages/Register/Register";
import AppLayout from "./layouts/AppLayout";
import Todos from "./pages/Todos/Todos";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./redux/store";
import { Provider } from "react-redux";

import { getMe } from "./api/profile";
import { setUser } from "./redux/profileSlice";

export const queryClient = new QueryClient();

const checkUser = async () => {
    try {
        const user = await getMe();
        store.dispatch(setUser(user));
        if (user.user) {
            return redirect("/app/todos");
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, loader: () => redirect("/login") },
            {
                path: "login",
                loader: checkUser,
                element: <Login />,
            },
            {
                path: "register",
                loader: checkUser,
                element: <Register />,
            },
        ],
    },
    {
        path: "app",
        element: <AppLayout />,
        loader: () => {
            if (!store.getState().profile.user) {
                return redirect("/login");
            }
            return null;
        },
        children: [
            { index: true, loader: () => redirect("/app/todos") },
            {
                path: "todos",
                element: <Todos />,
            },
        ],
    },
    {
        path: "*",
        loader: () => redirect("/"),
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);
