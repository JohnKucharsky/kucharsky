import { object, z } from "zod";
import i18n from "../../helpers/i18n";

export const loginValidationShared = {
    email: z
        .string()
        .email(i18n.t("incorrectEmail"))
        .max(40, i18n.t("max40char")),
    password: z
        .string()
        .min(6, i18n.t("atLeast6Char"))
        .max(40, i18n.t("max40char")),
};

export const validationSchemaLogin = object(loginValidationShared);

export type loginInputType = z.infer<typeof validationSchemaLogin>;
