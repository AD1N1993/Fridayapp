import React from "react";
import {NavLink, useParams} from "react-router-dom";
import s from "./Header.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {logoutTC} from "../../features/Login/auth-reducer";
import {AppRootStateType} from "../../app/store";
import {Preloader} from "../Preloader/Preloader";
import {RequestStatusType} from "../../app/app-reducer";
import {CardType} from "../../api/api";

export const Header = () => {

    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const cards = useSelector<AppRootStateType,Array<CardType>>(state => state.cards.cards)

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
                        <NavLink className={s.navLink} to="/main" activeClassName={s.navLinkActive}>
                            <li className={s.linkItem}> Main</li>
                        </NavLink>
                        <NavLink className={s.navLink} to="/signUp" activeClassName={s.navLinkActive}>
                            <li className={s.linkItem}> Signup</li>
                        </NavLink>
                        {cards.length !== 0 && <NavLink className={s.navLink} to='/cards' activeClassName={s.navLinkActive}>
						  <li className={s.linkItem}>Cards</li>
						</NavLink>}
                        <NavLink className={s.navLink} to="/packs" activeClassName={s.navLinkActive}>
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