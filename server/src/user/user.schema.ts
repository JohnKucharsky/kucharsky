import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        email: string({ required_error: "Email is required" }).email(
            "Invalid email"
        ),
        name: string({
            required_error: "Name is required",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password too short - should be 6 chars minimum"),
    }),
});

export type registerUserType = TypeOf<typeof createUserSchema>;
