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
import Books from "./pages/Books/Books";
import BookDetails from "./pages/Books/BookDetails";
import TicTacToe from "./pages/TicTacToe/TicTacToe";
import { pagesNames } from "./shared/utils";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
});

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
            { index: true, loader: () => redirect(`/${pagesNames.login}`) },
            {
                path: pagesNames.login,
                loader: checkUser,
                element: <Login />,
            },
            {
                path: pagesNames.register,
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
                return redirect(`/${pagesNames.login}`);
            }
            return null;
        },
        children: [
            { index: true, loader: () => redirect("/app/todos") },
            {
                path: pagesNames.todos,
                element: <Todos />,
            },
            {
                path: pagesNames.books,
                children: [
                    {
                        index: true,
                        element: <Books />,
                    },
                    {
                        path: ":book_id",
                        element: <BookDetails />,
                    },
                ],
            },
            {
                path: pagesNames.tic_tac_toe,
                element: <TicTacToe />,
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
        <ChakraProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
);
