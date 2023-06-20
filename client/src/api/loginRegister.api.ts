import { AxiosResponse } from "axios";
import { userI } from "./profile.api";
import { loginInputType } from "../pages/Login/Login.service";
import { axiosInstance } from "../helpers/axios";
import { registerInputType } from "../pages/Register/Register.service";

export const registerUser = async (
    body: Omit<registerInputType, "passwordConfirmation">
) => {
    return await axiosInstance.post<
        Omit<registerInputType, "passwordConfirmation">,
        AxiosResponse<userI>
    >("/api/register", { ...body });
};

export const loginUser = async (body: loginInputType) => {
    return await axiosInstance.post<loginInputType, AxiosResponse<userI>>(
        "/api/login",
        { ...body }
    );
};

export const logout = async () => {
    return await axiosInstance.post<unknown, AxiosResponse<string>>(
        "/api/logout"
    );
};
