import { object, z } from "zod";

export const validationSchemaLogin = object({
    email: z.string().email("Incorrect email").max(40, "Max 40 characters"),
    password: z
        .string()
        .min(6, "At least 6 characters")
        .max(40, "Max 40 characters"),
});

export type loginInputType = z.infer<typeof validationSchemaLogin>;
