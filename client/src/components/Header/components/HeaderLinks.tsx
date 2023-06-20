import s from "../Header.module.scss";
import { headerLinks } from "../Header.service";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export function Links() {
    const { t } = useTranslation("translation");

    return (
        <div className={s.links_container}>
            {headerLinks.map((link) => (
                <NavLink
                    key={link.link}
                    className={({ isActive }) =>
                        isActive ? s.active_link : s.link
                    }
                    to={link.link}
                >
                    {t(link.trans)}
                </NavLink>
            ))}
        </div>
    );
}

export function MenuLinks() {
    const { t } = useTranslation("translation");

    return (
        <>
            {headerLinks.map((link) => (
                <NavLink key={link.link} to={link.link}>
                    {({ isActive }) => (
                        <MenuItem
                            style={{
                                backgroundColor: isActive
                                    ? "#e5e7eb"
                                    : undefined,
                            }}
                        >
                            {t(link.trans)}
                        </MenuItem>
                    )}
                </NavLink>
            ))}
        </>
    );
}
