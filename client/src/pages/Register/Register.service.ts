import { object, z } from "zod";
import { loginValidationShared } from "../Login/Login.service";
import i18n from "../../helpers/i18n";

export const validationSchemaRegister = object({
    name: z
        .string()
        .min(3, i18n.t("atLeast6Char"))
        .max(40, i18n.t("max40char")),
    ...loginValidationShared,
    passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: i18n.t("passwordsDontMatch"),
    path: ["passwordConfirmation"],
});

export type registerInputType = z.infer<typeof validationSchemaRegister>;
