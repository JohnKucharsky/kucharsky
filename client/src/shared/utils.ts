import { AxiosError } from "axios";
import store from "../redux/store";
import { setUser } from "../redux/profileSlice";

export const resetOn403 = (err: AxiosError, callback: () => void) => {
    if (err?.request?.status === 403) {
        callback();
        store.dispatch(setUser({ user: null }));
    }
    return null;
};

export enum pagesNames {
    todos = "todos",
    books = "books",
    tic_tac_toe = "tic_tac_toe",
    login = "login",
    register = "register",
}
