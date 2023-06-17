import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "../index.scss";
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppLayout from "./layouts/AppLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./redux/store";
import { Provider } from "react-redux";
import { checkUser, pagesNames } from "./shared/utils";
import { ErrorBoundary } from "react-error-boundary";
import FallbackError from "./shared/helpers/FallbackError";
import DefaultSkeleton from "./skeletons/DefaultSkeleton";
import Books from "./pages/Books/Books";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
});

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Todos = lazy(() => import("./pages/Todos/Todos"));
const BookDetails = lazy(() => import("./pages/Books/BookDetails"));
const NotesWithTags = lazy(() => import("./pages/NotesWithTags/NotesWithTags"));
const NewAndEditNote = lazy(
    () => import("./pages/NotesWithTags/NewAndEditNote")
);
const ViewNote = lazy(() => import("./pages/NotesWithTags/ViewNote"));
const MemoryGame = lazy(() => import("./pages/MemoryGame/MemoryGame"));

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, loader: () => redirect(`/${pagesNames.login}`) },
            {
                path: pagesNames.login,
                loader: checkUser,
                element: (
                    <ErrorBoundary FallbackComponent={FallbackError}>
                        <Suspense fallback={<DefaultSkeleton />}>
                            <Login />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: pagesNames.register,
                loader: checkUser,
                element: (
                    <ErrorBoundary FallbackComponent={FallbackError}>
                        <Suspense fallback={<DefaultSkeleton />}>
                            <Register />
                        </Suspense>
                    </ErrorBoundary>
                ),
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
                element: (
                    <ErrorBoundary FallbackComponent={FallbackError}>
                        <Suspense fallback={<DefaultSkeleton />}>
                            <Todos />
                        </Suspense>
                    </ErrorBoundary>
                ),
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
                        element: (
                            <ErrorBoundary FallbackComponent={FallbackError}>
                                <Suspense fallback={<DefaultSkeleton />}>
                                    <BookDetails />
                                </Suspense>
                            </ErrorBoundary>
                        ),
                    },
                ],
            },
            {
                path: pagesNames.notes_with_tags,
                children: [
                    {
                        index: true,
                        element: (
                            <ErrorBoundary FallbackComponent={FallbackError}>
                                <Suspense fallback={<DefaultSkeleton />}>
                                    <NotesWithTags />
                                </Suspense>
                            </ErrorBoundary>
                        ),
                    },
                    {
                        path: "new",
                        element: (
                            <ErrorBoundary FallbackComponent={FallbackError}>
                                <Suspense fallback={<DefaultSkeleton />}>
                                    <NewAndEditNote />
                                </Suspense>
                            </ErrorBoundary>
                        ),
                    },
                    {
                        path: "view/:id",
                        element: (
                            <ErrorBoundary FallbackComponent={FallbackError}>
                                <Suspense fallback={<DefaultSkeleton />}>
                                    <ViewNote />
                                </Suspense>
                            </ErrorBoundary>
                        ),
                    },
                    {
                        path: "edit/:id",
                        element: (
                            <ErrorBoundary FallbackComponent={FallbackError}>
                                <Suspense fallback={<DefaultSkeleton />}>
                                    <NewAndEditNote />
                                </Suspense>
                            </ErrorBoundary>
                        ),
                    },
                ],
            },
            {
                path: pagesNames.memory_game,
                element: (
                    <ErrorBoundary FallbackComponent={FallbackError}>
                        <Suspense fallback={<DefaultSkeleton />}>
                            <MemoryGame />
                        </Suspense>
                    </ErrorBoundary>
                ),
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
