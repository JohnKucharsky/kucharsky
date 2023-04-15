import s from "../Header.module.scss";
import { headerLinks } from "../Header.service";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@chakra-ui/react";

export function Links() {
    return (
        <div className={s.links_container}>
            {headerLinks.map((link) => (
                <NavLink
                    key={link.link}
                    style={{
                        width: link.width,
                    }}
                    className={({ isActive }) =>
                        isActive ? s.active_link : s.link
                    }
                    to={link.link}
                >
                    {link.title}
                </NavLink>
            ))}
        </div>
    );
}

export function MenuLinks() {
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
                            {link.title}
                        </MenuItem>
                    )}
                </NavLink>
            ))}
        </>
    );
}
