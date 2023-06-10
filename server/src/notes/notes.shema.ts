import { object, string, TypeOf } from "zod";

const body = {
    body: object({
        title: string({
            required_error: "Field is required",
        }),
        markdown: string({
            required_error: "Field is required",
        }),
        tags: string({
            required_error: "Field is required",
        }).array(),
    }),
};

const params = {
    params: object({
        id: string(),
    }),
};

export const createNotesSchema = object({
    ...body,
});

export const updateNotesSchema = object({
    ...body,
    ...params,
});

export const deleteNotesSchema = object({
    ...params,
});

export type createNotesType = TypeOf<typeof createNotesSchema>;
export type updateNotesType = TypeOf<typeof updateNotesSchema>;
export type deleteNotesType = TypeOf<typeof deleteNotesSchema>;
