import React from "react";
import s from "./Button.module.scss"

type ButtonTypeProps = {
    value:string
    action?: () => void
    mode?: "red"
    type?:"button" | "submit" | "reset" | undefined
    disabled?: boolean
}

export const Button = (props:ButtonTypeProps) =>{
    return(
        <button
            className={props.mode === "red" ? `${s.btn}  ${s.error}`:  s.btn}
            onClick={props.action}
            disabled={props.disabled}
            type={props.type}>
            {props.value}
        </button>
    );
}