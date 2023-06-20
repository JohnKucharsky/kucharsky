import { AxiosResponse } from "axios";
import { axiosInstance } from "../helpers/axios";

export interface todoI extends todoReqBodyI {
    _id: string;
    updatedAt: string;
}

export interface todoReqBodyI {
    todo: string;
    finished: boolean;
}

export const getTodos = async () => {
    const todos = await axiosInstance.get<todoI[]>("/api/todos");

    return todos.data;
};

export const createTodo = async (body: todoReqBodyI) => {
    return await axiosInstance.post<todoReqBodyI, AxiosResponse<todoI>>(
        "/api/todos",
        body
    );
};

export const updateTodo = async (body: todoReqBodyI, id: string) => {
    return await axiosInstance.post<todoReqBodyI, AxiosResponse<todoI>>(
        `/api/todos/${id}`,
        body
    );
};

export const deleteTodo = async (id: string) => {
    return await axiosInstance.delete(`/api/todos/${id}`);
};
