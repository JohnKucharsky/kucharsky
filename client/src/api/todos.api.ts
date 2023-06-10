import axios, { AxiosResponse } from "axios";

export interface todoI extends todoReqBodyI {
    _id: string;
    updatedAt: string;
}

export interface todoReqBodyI {
    todo: string;
    finished: boolean;
}

export const getTodos = async () => {
    const todos = await axios.get<todoI[]>("/api/todos", {
        withCredentials: true,
    });

    return todos.data;
};

export const createTodo = async (body: todoReqBodyI) => {
    return await axios.post<todoReqBodyI, AxiosResponse<todoI>>(
        "/api/todos",
        body,
        {
            withCredentials: true,
        }
    );
};

export const updateTodo = async (body: todoReqBodyI, id: string) => {
    return await axios.post<todoReqBodyI, AxiosResponse<todoI>>(
        `/api/todos/${id}`,
        body,
        {
            withCredentials: true,
        }
    );
};

export const deleteTodo = async (id: string) => {
    return await axios.delete(`/api/todos/${id}`, {
        withCredentials: true,
    });
};
