import axios from "axios";

export const getTodos = async () => {
    const todos = await axios.get<{ status: string }>("/api/todos", {
        withCredentials: true,
        headers: {
            Accept: " application/json",
            "Content-Type": "application/json",
        },
    });

    return todos.data;
};
