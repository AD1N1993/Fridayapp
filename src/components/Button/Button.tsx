import React, {useState} from "react";
import s from "./Button.module.scss"

type ButtonTypeProps = {
    value:string
    action: ()=> void
    mode?: "red"
    type?:string
}

export const Button = (props:ButtonTypeProps) =>{
    return(
        <button
            className={props.mode === "red" ? `${s.btn}  ${s.error}`:  s.btn}
            onClick={props.action} type={"submit"}>
            {props.value}
        </button>
    );
}