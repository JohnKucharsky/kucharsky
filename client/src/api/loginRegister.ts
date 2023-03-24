import axios, { AxiosResponse } from "axios";
import { userI } from "./profile";

export interface userRegisterI extends userLoginI {
    name: string;
}

export interface userLoginI {
    email: string;
    password: string;
}

export const registerUser = async (body: userRegisterI) => {
    return await axios.post<userRegisterI, AxiosResponse<userI>>(
        "/api/register",
        { ...body },
        { withCredentials: true }
    );
};

export const loginUser = async (body: userLoginI) => {
    return await axios.post<userLoginI, AxiosResponse<userI>>(
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
