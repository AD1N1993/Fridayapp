import React, {useState} from "react";
import s from "./Button.module.scss"

type ButtonTypeProps = {
    value: string
    action: () => void
    mode?: "red"|null
    type?: "button" | "submit" | "reset" | undefined
    disabled?: boolean
}

export const Button = (props:ButtonTypeProps) =>{
    return(
        <button
            className={props.mode === "red" ? `${s.btn}  ${s.error}`:  s.btn}
            onClick={props.action}
            type={props.type}
            disabled={props.disabled}
        >
            {props.value}
        </button>
    );
}