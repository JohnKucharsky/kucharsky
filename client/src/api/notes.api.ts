import { AxiosResponse } from "axios";
import { tagI } from "./tags.api";
import { axiosInstance } from "../shared/axios";

export interface noteI extends Omit<noteReqBodyI, "tags"> {
    _id: string;
    updatedAt: string;
    tags: tagI[];
}

export interface noteReqBodyI {
    title: string;
    markdown: string;
    tags: string[];
}

export const getNotes = async () => {
    const notes = await axiosInstance.get<noteI[]>("/api/notes");

    return notes.data;
};

export const getNote = async (id?: string) => {
    const notes = await axiosInstance.get<noteI>(`/api/notes/${id}`);

    return notes.data;
};

export const createNote = async (body: noteReqBodyI) => {
    return await axiosInstance.post<noteReqBodyI, AxiosResponse<noteI>>(
        "/api/notes",
        body
    );
};

export const updateNote = async (body: noteReqBodyI, id?: string) => {
    return await axiosInstance.post<noteReqBodyI, AxiosResponse<noteI>>(
        `/api/notes/${id}`,
        body
    );
};

export const deleteNote = async (id?: string) => {
    return await axiosInstance.delete(`/api/notes/${id}`);
};
