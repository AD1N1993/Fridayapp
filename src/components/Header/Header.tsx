import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Header.module.scss"
import {Button} from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../features/Login/auth-reducer";
import {AppRootStateType} from "../../app/store";
import {Preloader} from "../Preloader/Preloader";
import {RequestStatusType} from "../../app/app-reducer";

export const Header = () => {

    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <>
            {appStatus === 'loading' && <Preloader/>}
            <header className={s.header}>
                <nav>
                    <ul className={s.navList}>
                        <NavLink className={s.navLink} to="/" activeClassName={""}>
                            <li className={s.linkItem}> Profile</li>
                        </NavLink>
                        <NavLink className={s.navLink} to="/packs" activeClassName={""}>
                            <li className={s.linkItem}> Packs</li>
                        </NavLink>

                        {!isLogged
                            ? <NavLink className={s.navLink} to="login" activeClassName={""}>
                                <li className={s.linkItem}> Login</li>
                            </NavLink>
                            : null}
                        <NavLink className={s.navLink} to="signup" activeClassName={""}>
                            <li className={s.linkItem}> Signup</li>
                        </NavLink>
                        <NavLink className={s.navLink} to="packs" activeClassName={""}>
                            <li className={s.linkItem}>Packs</li>
                        </NavLink>
                        {isLogged ? <Button value={"Log out"} action={logout}/> : null}

                    </ul>
                </nav>
            </header>
        </>);
}