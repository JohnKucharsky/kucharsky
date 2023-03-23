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
import { ErrorMessage } from "@hookform/error-message";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, z } from "zod";
import s from "../../shared/styles/LoginRegister.module.scss";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { userI } from "../../api/profile";
import { loginUser, userLoginI } from "../../api/loginRegister";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/profileSlice";

const validationSchemaLogin = object({
    email: z.string().email("Incorrect email").max(40, "Max 40 characters"),
    password: z
        .string()
        .min(6, "At least 3 characters")
        .max(40, "Max 40 characters"),
});

type loginInputType = z.infer<typeof validationSchemaLogin>;

export default function Login() {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginInputType>({
        resolver: zodResolver(validationSchemaLogin),
    });
    const mutation = useMutation<AxiosResponse<userI>, void, userLoginI>(
        (body) => loginUser(body)
    );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: loginInputType) => {
        try {
            const res = await mutation.mutateAsync(data);

            if (res.statusText === "OK") {
                dispatch(setUser({ user: res.data }));
                navigate("/app/todos");
            } else {
                console.info(res);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="center_login">
            <div className={s.container}>
                <h4 className={s.title}>Welcome back!</h4>
                <form
                    className={s.form_container}
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                                type={show ? "text" : "password"}
                                {...register("password")}
                                placeholder="******"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShow((p) => !p)}
                                >
                                    {show ? "Hide" : "Show"}
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
                        Login
                    </Button>
                </form>
                <p className={s.divider}>
                    <span>or</span>
                </p>
                <Button
                    onClick={() => navigate("/register")}
                    variant="link"
                    colorScheme="blue"
                >
                    Register
                </Button>
            </div>
        </div>
    );
}
