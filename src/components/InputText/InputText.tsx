import React, {ChangeEvent, KeyboardEvent} from "react";
import s from "./InputText.module.scss"

type InputTextTypeProps = {
    value: string
    onChange: (inputValue: string) => void
    actionEnter: () => void;
    error?: boolean
}


export const InputText = (props: InputTextTypeProps) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.currentTarget.value;
        props.onChange(inputValue);
    }

    const actionEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.actionEnter();
        }

    }
    return (
        <>
            <input className={`${s.inputText} ${props.error && props.value !=="" ? s.error : ""}`}
                   type="text"
                   value={props.value}
                   onChange={onChange}
                   onKeyPress={actionEnter}

            />
            <span>{}</span>
        </>
    );
}