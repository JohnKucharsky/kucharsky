import axios from "axios";

export const getTodos = async () => {
    const todos = await axios.get<{ status: string }>("/api/todos", {
        withCredentials: true,
    });

    return todos.data;
};
