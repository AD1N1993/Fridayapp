import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";


export const Main = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {

       return <Redirect to={'/login'}/>
    }
    return (
        <>
            <h1>Welcome</h1>
            <h4>Cards for your mind v 1.0 beta</h4>
            <h4>Click Packs and start learning right now!</h4>
            <label htmlFor="1">ddddddd
                <input type="file" id={"1"} style={{display:"none"}}/>
            </label>
        </>
    );
}

