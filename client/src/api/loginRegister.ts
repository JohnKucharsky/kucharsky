import axios, { AxiosResponse } from "axios";
import { userI } from "./profile";
import { loginInputType } from "../pages/Login/Login";
import { registerInputType } from "../pages/Register/Register";

export const registerUser = async (
    body: Omit<registerInputType, "passwordConfirmation">
) => {
    return await axios.post<
        Omit<registerInputType, "passwordConfirmation">,
        AxiosResponse<userI>
    >("/api/register", { ...body }, { withCredentials: true });
};

export const loginUser = async (body: loginInputType) => {
    return await axios.post<loginInputType, AxiosResponse<userI>>(
        "/api/login",
        { ...body },
        { withCredentials: true }
    );
};

export const logout = async () => {
    return await axios.post<unknown, AxiosResponse<string>>("/api/logout", {
        withCredentials: true,
    });
};
