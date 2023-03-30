import { boolean, object, string, TypeOf } from "zod";

const body = {
    body: object({
        todo: string({
            required_error: "Title is required",
        }),
        finished: boolean({
            required_error: "Field is required",
        }),
    }),
};

const params = {
    params: object({
        id: string(),
    }),
};

export const createTodoSchema = object({
    ...body,
});

export const updateTodoSchema = object({
    ...body,
    ...params,
});

export const deleteTodoSchema = object({
    ...params,
});

export type createTodoType = TypeOf<typeof createTodoSchema>;
export type updateTodoType = TypeOf<typeof updateTodoSchema>;
export type deleteTodoType = TypeOf<typeof deleteTodoSchema>;
