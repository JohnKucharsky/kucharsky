import { useAppDispatch, useTypedSelector } from "../../redux/store";
import { AiFillGithub } from "react-icons/ai";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import s from "./Header.module.scss";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { logout } from "../../api/loginRegister.api";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/profileSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { Links, MenuLinks } from "./components/HeaderLinks";
import { pagesNames } from "../../shared/utils";

export default function Header() {
    const user = useTypedSelector((s) => s.profile.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logoutMutation = useMutation<AxiosResponse<string>, void, unknown>(
        logout
    );

    const onLogout = async () => {
        try {
            await logoutMutation.mutateAsync({});
            navigate(`/${pagesNames.login}`);
            dispatch(setUser({ user: null }));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={s.main}>
            <Links />

            <div className={s.up416}>
                <Menu>
                    <MenuButton as={Button}>
                        <GiHamburgerMenu />
                    </MenuButton>
                    <MenuList>
                        <MenuLinks />
                    </MenuList>
                </Menu>
            </div>

            <div></div>

            <Link to={"https://github.com/JohnKucharsky/todoapp"}>
                <AiFillGithub fontSize={24} className={s.git} />
            </Link>

            <h4 className={s.user_text}>{user?.name}</h4>

            <Button onClick={onLogout} size="sm" colorScheme="blue">
                Logout
            </Button>
        </div>
    );
}
