import axios, { AxiosResponse } from "axios";
import { tagI } from "./tags.api";

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
    const notes = await axios.get<noteI[]>("/api/notes", {
        withCredentials: true,
    });

    return notes.data;
};

export const getNote = async (id?: string) => {
    const notes = await axios.get<noteI>(`/api/notes/${id}`, {
        withCredentials: true,
    });

    return notes.data;
};

export const createNote = async (body: noteReqBodyI) => {
    return await axios.post<noteReqBodyI, AxiosResponse<noteI>>(
        "/api/notes",
        body,
        {
            withCredentials: true,
        }
    );
};

export const updateNote = async (body: noteReqBodyI, id?: string) => {
    return await axios.post<noteReqBodyI, AxiosResponse<noteI>>(
        `/api/notes/${id}`,
        body,
        {
            withCredentials: true,
        }
    );
};

export const deleteNote = async (id?: string) => {
    return await axios.delete(`/api/notes/${id}`, {
        withCredentials: true,
    });
};
