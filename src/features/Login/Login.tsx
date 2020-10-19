import React from "react";
import {NavLink} from "react-router-dom";


export const Login = () =>{
    return(
        <>
            <h1>Login Page</h1>
            <NavLink className={""} to="recovery" activeClassName={""}>
                <span className={""}> Forget Password?</span>
            </NavLink>
        </>
    );
}