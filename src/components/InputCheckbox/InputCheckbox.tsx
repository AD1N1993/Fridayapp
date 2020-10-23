import React, {ChangeEvent} from "react";
import s from "./InputCheckbox.module.scss"

type inputCheckboxTypeProps = {
    checked: boolean
    changeStatus: (e: ChangeEvent<HTMLInputElement>) => void
    value: string;
    id?: number
    name?:string
}

export const InputCheckBox = (props: inputCheckboxTypeProps) => {

    // const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    //     let id = props.id || +e.currentTarget.id;
    //     props.changeStatus(e.currentTarget.checked, id);
    // }
    return (
        <>
            <label className={`${s.checkbox} ${props.checked ? s.active : ""}`}>
                <input className={s.input} type="checkbox"  checked={props.checked} onChange={props.changeStatus} name={"rememberMe"}/>
                <span>{props.value}</span>
            </label>
        </>
    );
}