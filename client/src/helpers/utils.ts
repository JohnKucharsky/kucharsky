import { AxiosError } from "axios";
import store from "../redux/store";
import { setUser } from "../redux/profileSlice";
import { getMe } from "../api/profile.api";
import { redirect } from "react-router-dom";
import i18n from "./i18n";

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
    login = "login",
    register = "register",
    notes_with_tags = "notes_with_tags",
    memory_game = "memory_game",
}

export enum rightInputElEnum {
    login = "login",
    tags = "tags",
    todos = "todos",
}

export const checkUser = async () => {
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

export const tooltipHelper = (limit: number, text?: string) => {
    if (!text) return "";
    return text.length > limit ? text : "";
};

export const widthRightInputEl = (type: rightInputElEnum) => {
    const isRu = i18n.language === "ru";
    if (type === rightInputElEnum.tags) {
        return isRu ? "6.5rem" : "4rem";
    }
    if (type === rightInputElEnum.todos) {
        return isRu ? "7rem" : "4.5rem";
    }
    if (type === rightInputElEnum.login) {
        return isRu ? "6rem" : "4.5rem";
    }
};
