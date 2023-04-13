import { object, z } from "zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import s from "../../shared/styles/LoginRegister.module.scss";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/loginRegister";
import { useMutation } from "react-query";
import { userI } from "../../api/profile";
import { omit } from "lodash";
import { AxiosResponse } from "axios";

const validationSchemaRegister = object({
    name: z
        .string()
        .min(3, "At least 3 characters")
        .max(40, "Max 40 characters"),
    email: z.string().email("Incorrect email").max(40, "Max 40 characters"),
    password: z
        .string()
        .min(6, "At least 6  characters")
        .max(40, "Max 40 characters"),
    passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});

export type registerInputType = z.infer<typeof validationSchemaRegister>;

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
    const mutation = useMutation<
        AxiosResponse<userI>,
        void,
        Omit<registerInputType, "passwordConfirmation">
    >((body) => registerUser(body));

    const navigate = useNavigate();

    const onSubmit = async (data: registerInputType) => {
        try {
            await mutation.mutateAsync(omit(data, "passwordConfirmation"));

            navigate("/login");
        } catch (e: any) {
            console.error(e);
            if (e?.response?.data?.code === 11000) {
                setError("email", {
                    type: "server",
                    message: "Email has been taken",
                });
            }
        }
    };

    return (
        <div className={s.center_login}>
            <div className={s.container}>
                <h4 className={s.title}>Join Us!</h4>
                <form
                    className={s.form_container}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormControl isInvalid={!!errors?.name}>
                        <FormLabel color="#6b7280">Name</FormLabel>
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
                                placeholder="John Doe"
                            />
                        </InputGroup>
                        <FormHelperText color="red.500">
                            <ErrorMessage errors={errors} name="name" />
                        </FormHelperText>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.email}>
                        <FormLabel color="#6b7280">Email</FormLabel>
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
                        <FormLabel color="#6b7280">Password</FormLabel>
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
                                pr="4.5rem"
                                variant="filled"
                                type={show.password ? "text" : "password"}
                                {...register("password")}
                                placeholder="******"
                            />
                            <InputRightElement width="4.5rem">
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
                                    {show.password ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText color="red.500">
                            <ErrorMessage errors={errors} name="password" />
                        </FormHelperText>
                    </FormControl>

                    <FormControl isInvalid={!!errors?.passwordConfirmation}>
                        <FormLabel color="#6b7280">Confirm Password</FormLabel>
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
                                pr="4.5rem"
                                variant="filled"
                                type={show.confirm ? "text" : "password"}
                                {...register("passwordConfirmation")}
                                placeholder="******"
                            />
                            <InputRightElement width="4.5rem">
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
                                    {show.confirm ? "Hide" : "Show"}
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
                        Register
                    </Button>
                </form>
                <p className={s.divider}>
                    <span>or</span>
                </p>
                <Button
                    onClick={() => navigate("/login")}
                    variant="link"
                    colorScheme="blue"
                >
                    Login
                </Button>
            </div>
        </div>
    );
}
