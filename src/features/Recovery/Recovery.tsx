import React from "react";
import {NavLink} from "react-router-dom";


export const Recovery = () =>{
    return(
        <>
            <h1>Recovery Page</h1>
            <NavLink className={""} to="initiate" activeClassName={""}>
                <span className={""}>Recovery Password</span>
            </NavLink>
        </>
    );
}