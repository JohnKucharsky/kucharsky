import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import s from "../../shared/styles/LoginRegister.module.scss";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/loginRegister.api";
import { useMutation } from "react-query";
import { userI } from "../../api/profile.api";
import { omit } from "lodash";
import { AxiosResponse } from "axios";
import {
    pagesNames,
    rightInputElEnum,
    widthRightInputEl,
} from "../../helpers/utils";
import { useTranslation } from "react-i18next";
import {
    registerInputType,
    validationSchemaRegister,
} from "./Register.service";

export default function Register() {
    const [show, setShow] = useState({
        password: false,
        confirm: false,
    });
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<registerInputType>({
        resolver: zodResolver(validationSchemaRegister),
    });

    const navigate = useNavigate();
    const { t } = useTranslation("translation");

    const mutation = useMutation<
        AxiosResponse<userI>,
        void,
        Omit<registerInputType, "passwordConfirmation">
    >((body) => registerUser(body));

    const onSubmit = async (data: registerInputType) => {
        try {
            await mutation.mutateAsync(omit(data, "passwordConfirmation"));

            navigate(`/${pagesNames.login}`);
        } catch (e: any) {
            console.error(e);
            if (e?.response?.data?.code === 11000) {
                setError("email", {
                    type: "server",
                    message: t("takenEmail"),
                });
            }
        }
    };

    return (
        <div className={s.center_login}>
            <div className={s.container}>
                <Heading fontWeight={600} textAlign="center">
                    {t("joinUs")}
                </Heading>

                <form
                    className={s.form_container}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormControl isInvalid={!!errors?.name}>
                        <FormLabel color="#6b7280">{t("name")}</FormLabel>
                        <InputGroup size="lg">
                            <InputLeftElement
                                pointerEvents="none"
                                children={
                                    <BsPerson color="gray" fontSize="1.3rem" />
                                }
                            />
                            <Input
                                variant="filled"
                                {...register("name")}
                                placeholder={t("johnDoe")}
                            />
                        </InputGroup>
                        <FormHelperText color="red.500">
                            <ErrorMessage errors={errors} name="name" />
                        </FormHelperText>
                    </FormControl>

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
                                type={show.password ? "text" : "password"}
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
                                    onClick={() =>
                                        setShow((p) => {
                                            return {
                                                ...p,
                                                password: !p.password,
                                            };
                                        })
                                    }
                                >
                                    {show.password ? t("hide") : t("show")}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText color="red.500">
                            <ErrorMessage errors={errors} name="password" />
                        </FormHelperText>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.passwordConfirmation}>
                        <FormLabel color="#6b7280">
                            {t("confirmPassword")}
                        </FormLabel>
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
                                type={show.confirm ? "text" : "password"}
                                {...register("passwordConfirmation")}
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
                                    onClick={() =>
                                        setShow((p) => {
                                            return {
                                                ...p,
                                                confirm: !p.confirm,
                                            };
                                        })
                                    }
                                >
                                    {show.confirm ? t("hide") : t("show")}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText color="red.500">
                            <ErrorMessage
                                errors={errors}
                                name="passwordConfirmation"
                            />
                        </FormHelperText>
                    </FormControl>

                    <Button
                        mt="1rem"
                        size="lg"
                        colorScheme="blue"
                        width="100%"
                        type="submit"
                    >
                        {t("register")}
                    </Button>
                </form>

                <p className={s.divider}>
                    <span>{t("or")}</span>
                </p>

                <Button
                    onClick={() => navigate(`/${pagesNames.login}`)}
                    variant="link"
                    colorScheme="blue"
                >
                    {t("login")}
                </Button>
            </div>
        </div>
    );
}
