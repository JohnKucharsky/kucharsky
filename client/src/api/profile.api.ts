import { axiosInstance } from "../helpers/axios";

export interface userI {
    id: string;
    name: string;
    email: string;
}

export interface userProfileI {
    user: userI | null;
}

export const getMe = async () => {
    const user = await axiosInstance.get<userProfileI>("/api/me");

    return user.data;
};
