import { object, string, TypeOf } from "zod";

const body = {
    body: object({
        label: string({
            required_error: "Field is required",
        }),
    }),
};

const params = {
    params: object({
        id: string(),
    }),
};

export const createTagsSchema = object({
    ...body,
});

export const updateTagsSchema = object({
    ...body,
    ...params,
});

export const deleteTagsSchema = object({
    ...params,
});

export type createTagsType = TypeOf<typeof createTagsSchema>;
export type updateTagsType = TypeOf<typeof updateTagsSchema>;
export type deleteTagsType = TypeOf<typeof deleteTagsSchema>;
