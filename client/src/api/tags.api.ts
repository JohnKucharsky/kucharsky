import axios, { AxiosResponse } from "axios";

export interface tagI extends tagReqBodyI {
    _id: string;
    updatedAt: string;
}

export interface tagReqBodyI {
    label: string;
}

export const getTags = async () => {
    const tags = await axios.get<tagI[]>("/api/tags", {
        withCredentials: true,
    });

    return tags.data;
};

export const createTag = async (body: tagReqBodyI) => {
    return await axios.post<tagReqBodyI, AxiosResponse<tagI>>(
        "/api/tags",
        body,
        {
            withCredentials: true,
        }
    );
};

export const updateTag = async (body: tagReqBodyI, id: string) => {
    return await axios.post<tagReqBodyI, AxiosResponse<tagI>>(
        `/api/tags/${id}`,
        body,
        {
            withCredentials: true,
        }
    );
};

export const deleteTag = async (id: string) => {
    return await axios.delete(`/api/tags/${id}`, {
        withCredentials: true,
    });
};
