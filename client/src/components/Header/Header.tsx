import { useAppDispatch, useTypedSelector } from "../../redux/store";
import { Button } from "@chakra-ui/react";
import s from "./Header.module.scss";
import { SiMongodb, SiExpress, SiReact, SiTypescript } from "react-icons/si";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { logout } from "../../api/loginRegister";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/profileSlice";

export default function Header() {
    const user = useTypedSelector((s) => s.profile.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logoutMutation = useMutation<AxiosResponse<string>, void, unknown>(
        logout
    );

    return (
        <div className={s.main}>
            <div className={s.icons}>
                <SiTypescript color="#3b82f6" fontSize="1.2rem" />
                <SiMongodb color="#3b82f6" fontSize="1.2rem" />
                <SiExpress color="#3b82f6" fontSize="1.2rem" />
                <SiReact color="#3b82f6" fontSize="1.2rem" />
            </div>
            <div></div>
            <h4 className={s.user_text}>{user?.name}</h4>

            <Button
                onClick={async () => {
                    await logoutMutation.mutateAsync({});
                    navigate("/login");
                    dispatch(setUser({ user: null }));
                }}
                size="sm"
                colorScheme="blue"
            >
                Logout
            </Button>
        </div>
    );
}
