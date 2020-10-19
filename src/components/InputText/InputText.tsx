import React, {ChangeEvent, KeyboardEvent} from "react";
import s from "./InputText.module.scss"

type InputTextTypeProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    actionEnter?: () => void;
    error?: boolean
    name?:string
    placeholder?:string
    type:string

}

export const InputText = (props: InputTextTypeProps) => {

    const actionEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && props.actionEnter) {
            props.actionEnter();
        }

    }
    return (
        <>
            <input className={`${s.inputText} ${props.error && props.value !=="" ? s.error : ""}`}
                   type={props.type}
                   value={props.value}
                   onChange={props.onChange}
                   onKeyPress={actionEnter}
                   name={props.name}
                   placeholder={props.placeholder}
            />
        </>
    );
}