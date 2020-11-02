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
                <NavLink className={s.logo}  to="/" activeClassName={""}>
                <div className={s.logo}>SmartCards</div>
                </NavLink>
                <nav>
                    <ul className={s.navList}>
                        <NavLink className={s.navLink} to="/profile" activeClassName={s.navLinkActive}>
                            <li className={s.linkItem}> Profile</li>
                        </NavLink>
                        <NavLink className={s.navLink} to="signUp" activeClassName={s.navLinkActive}>
                            <li className={s.linkItem}> Signup</li>
                        </NavLink>
                        <NavLink className={s.navLink} to="cards" activeClassName={""}>
                            <li className={s.linkItem}>Cards</li>
                        </NavLink>
                        <NavLink className={s.navLink} to="packs" activeClassName={s.navLinkActive}>
                            <li className={s.linkItem}>Packs</li>
                        </NavLink>
                    </ul>
                </nav>
                <div>
                    {isLogged ?  <span className={s.login} onClick={logout}> Logout</span> : null}
                    {!isLogged
                        ? <NavLink className={s.login} to="login" activeClassName={""}>
                            <span> LogIn</span>
                        </NavLink>
                        : null}
                </div>
            </header>
        </>);
}