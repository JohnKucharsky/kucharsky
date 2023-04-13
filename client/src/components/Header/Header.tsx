import { useAppDispatch, useTypedSelector } from "../../redux/store";
import { AiFillGithub } from "react-icons/ai";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import s from "./Header.module.scss";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { logout } from "../../api/loginRegister";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/profileSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link as RouterLink } from "react-router-dom";

function Links() {
    return (
        <div className={s.links_container}>
            <NavLink
                className={({ isActive }) =>
                    isActive ? s.active_link : s.link
                }
                to={"/app/books"}
            >
                Books
            </NavLink>

            <NavLink
                className={({ isActive }) =>
                    isActive ? s.active_link : s.link
                }
                to={"/app/todos"}
            >
                Todos
            </NavLink>
        </div>
    );
}

function MenuLinks() {
    return (
        <>
            <NavLink to={"/app/books"}>
                {({ isActive }) => (
                    <MenuItem
                        style={{
                            backgroundColor: isActive ? "#e5e7eb" : undefined,
                        }}
                    >
                        Books
                    </MenuItem>
                )}
            </NavLink>

            <NavLink to={"/app/todos"}>
                {({ isActive }) => (
                    <MenuItem
                        style={{
                            backgroundColor: isActive ? "#e5e7eb" : undefined,
                        }}
                    >
                        Todos
                    </MenuItem>
                )}
            </NavLink>
        </>
    );
}

export default function Header() {
    const user = useTypedSelector((s) => s.profile.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const logoutMutation = useMutation<AxiosResponse<string>, void, unknown>(
        logout
    );

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

            <RouterLink to={"https://github.com/JohnKucharsky/todoapp"}>
                <AiFillGithub fontSize={24} className={s.git} />
            </RouterLink>

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
