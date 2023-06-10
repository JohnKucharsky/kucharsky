import { AxiosError } from "axios";
import store from "../redux/store";
import { setUser } from "../redux/profileSlice";

export const handleError = (err: AxiosError, callback: () => void) => {
    if (err?.request?.status === 403) {
        callback();
        store.dispatch(setUser({ user: null }));
    }
    console.error(err);
    return null;
};

export enum pagesNames {
    todos = "todos",
    books = "books",
    tic_tac_toe = "tic_tac_toe",
    login = "login",
    register = "register",
    notes_with_tags = "notes_with_tags",
}
