import axios from "axios";

export interface userI {
    id: string;
    name: string;
    email: string;
}

export interface userProfileI {
    user: userI | null;
}

export const getMe = async () => {
    const user = await axios.get<userProfileI>("/api/me", {
        withCredentials: true,
        headers: {
            Accept: " application/json",
        },
    });

    return user.data;
};
