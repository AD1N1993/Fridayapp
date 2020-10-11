import React, {useState} from "react";
import s from "./Button.module.scss"

type ButtonTypeProps = {
    value:string
    action: ()=> void
    mode?: "red"
}

export const Button = (props:ButtonTypeProps) =>{

    return(
        <button
            className={props.mode === "red" ? `${s.btn}  ${s.error}`:  s.btn}
            onClick={props.action}>
            {props.value}
        </button>
    );
}