import { AxiosResponse } from "axios";
import { axiosInstance } from "../helpers/axios";

export interface tagI extends tagReqBodyI {
    _id: string;
    updatedAt: string;
}

export interface tagReqBodyI {
    label: string;
}

export const getTags = async () => {
    const tags = await axiosInstance.get<tagI[]>("/api/tags");

    return tags.data;
};

export const createTag = async (body: tagReqBodyI) => {
    return await axiosInstance.post<tagReqBodyI, AxiosResponse<tagI>>(
        "/api/tags",
        body
    );
};

export const updateTag = async (body: tagReqBodyI, id: string) => {
    return await axiosInstance.post<tagReqBodyI, AxiosResponse<tagI>>(
        `/api/tags/${id}`,
        body
    );
};

export const deleteTag = async (id: string) => {
    return await axiosInstance.delete(`/api/tags/${id}`);
};
