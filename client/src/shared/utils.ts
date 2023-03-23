import { AxiosError } from "axios";
import store from "../redux/store";
import { setUser } from "../redux/profileSlice";

export const resetOn403 = (err: AxiosError) => {
    if (err?.request?.status === 403) {
        window.location.reload();
        store.dispatch(setUser({ user: null }));
    }
    return null;
};
