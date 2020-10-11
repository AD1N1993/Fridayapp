import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.scss"

export const Header = () => {
    return(
        <>
        <header className={s.header}>
            <nav>
                <ul className={s.navList}>
                    <NavLink className={s.navLink} to="/" activeClassName={""}>
                        <li className={s.linkItem}> Profile</li>
                    </NavLink>

                    <NavLink className={s.navLink} to="login" activeClassName={""}>
                        <li className={s.linkItem}> Login</li>
                    </NavLink>
                    <NavLink className={s.navLink} to="signup" activeClassName={""}>
                        <li className={s.linkItem}> Signup</li>
                    </NavLink>

                </ul>
            </nav>
        </header>
        </>);
}