import { useAppDispatch, useTypedSelector } from "../../redux/store";
import { AiFillGithub } from "react-icons/ai";
import { Button, Heading, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import s from "./Header.module.scss";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { logout } from "../../api/loginRegister.api";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/profileSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { Links, MenuLinks } from "./components/HeaderLinks";
import { pagesNames } from "../../helpers/utils";
import { useTranslation } from "react-i18next";

export default function Header() {
    const user = useTypedSelector((s) => s.profile.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { t, i18n } = useTranslation("translation");

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

    const langClick = () => {
        const changeLang = (lang: "ru" | "en") => {
            i18n.changeLanguage(lang).then(() =>
                localStorage.setItem("lang", lang)
            );
        };
        if (i18n.language === "ru") {
            changeLang("en");
        } else {
            changeLang("ru");
        }
    };

    return (
        <div className={s.main}>
            <Links />

            <div className={s.up656}>
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

            <Button
                onClick={langClick}
                size="sm"
                colorScheme="blue"
                variant="outline"
                style={{
                    textTransform: "capitalize",
                }}
            >
                {i18n.language || "en"}
            </Button>

            <Heading size="sm">{user?.name}</Heading>

            <Button onClick={onLogout} size="sm" colorScheme="blue">
                {t("logout")}
            </Button>
        </div>
    );
}
