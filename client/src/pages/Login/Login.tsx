import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import s from "../../shared/styles/LoginRegister.module.scss";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { userI } from "../../api/profile.api";
import { loginUser } from "../../api/loginRegister.api";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/profileSlice";
import { loginInputType, validationSchemaLogin } from "./Login.service";
import { useTranslation } from "react-i18next";
import { rightInputElEnum, widthRightInputEl } from "../../helpers/utils";

export default function Login() {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<loginInputType>({
        resolver: zodResolver(validationSchemaLogin),
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t } = useTranslation("translation");

    const loginMutation = useMutation<
        AxiosResponse<userI>,
        void,
        loginInputType
    >((body) => loginUser(body));

    const onSubmit = async (data: loginInputType) => {
        try {
            const res = await loginMutation.mutateAsync(data);

            dispatch(setUser({ user: res.data }));
            navigate("/app/todos");
        } catch (e: any) {
            console.error(e);
            if (e?.response?.status === 401) {
                ["password", "email"].map((v) => {
                    return setError(v as "email" | "password", {
                        type: "server",
                        message: t("wrongCredentials"),
                    });
                });
            }
        }
    };

    const fillFields = () => {
        setValue("email", "user@mail.com");
        setValue("password", "super_user");
    };

    return (
        <div className={s.center_login}>
            <div className={s.container}>
                <Heading fontWeight={600} textAlign="center">
                    {t("welcomeBack")}
                </Heading>
                <form
                    className={s.form_container}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormControl isInvalid={!!errors?.email}>
                        <FormLabel color="#6b7280">{t("email")}</FormLabel>
                        <InputGroup size="lg">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <AiOutlineMail
                                        color="gray"
                                        fontSize="1.3rem"
                                    />
                                }
                            />
                            <Input
                                variant="filled"
                                {...register("email")}
                                placeholder="john@mail.com"
                            />
                        </InputGroup>
                        <FormHelperText color="red.500">
                            <ErrorMessage errors={errors} name="email" />
                        </FormHelperText>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.password}>
                        <FormLabel color="#6b7280">{t("password")}</FormLabel>
                        <InputGroup size="lg">
                            <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                fontSize="1.2em"
                                children={
                                    <AiOutlineLock
                                        color="gray"
                                        fontSize="1.3rem"
                                    />
                                }
                            />
                            <Input
                                pr={widthRightInputEl(rightInputElEnum.login)}
                                variant="filled"
                                type={show ? "text" : "password"}
                                {...register("password")}
                                placeholder="******"
                            />
                            <InputRightElement
                                width={widthRightInputEl(
                                    rightInputElEnum.login
                                )}
                            >
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShow((p) => !p)}
                                >
                                    {show ? t("hide") : t("show")}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText color="red.500">
                            <ErrorMessage errors={errors} name="password" />
                        </FormHelperText>
                    </FormControl>

                    <Button
                        mt="1rem"
                        colorScheme="blue"
                        width="100%"
                        size="lg"
                        type="submit"
                    >
                        {t("login")}
                    </Button>
                </form>

                <p className={s.divider}>
                    <span>{t("or")}</span>
                </p>

                <div className={s.button_c}>
                    <Button
                        onClick={() => navigate("/register")}
                        variant="link"
                        colorScheme="blue"
                    >
                        {t("register")}
                    </Button>
                    <span
                        style={{
                            color: "#3182ce",
                        }}
                    >{` / `}</span>
                    <Button
                        variant="link"
                        colorScheme="blue"
                        onClick={fillFields}
                    >
                        {t("testAccess")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
