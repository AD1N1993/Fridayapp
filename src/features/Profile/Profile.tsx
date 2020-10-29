import React from "react";
import {InputText} from "../../components/InputText/InputText";
import {Button} from "../../components/Button/Button";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";


export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {

        return <Redirect to={'/login'}/>
    }


    return (
        <>
            <h1>Profile Page</h1>
            <InputText value={""} onChange={() => {
            }} actionEnter={() => {
                alert("enter")
            }} type={"text"}/>
            <Button value={"click"} action={() => {
                alert("click")
            }}/>
        </>
    );
}

