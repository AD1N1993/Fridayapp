import React, {useState} from "react";
import {InputText} from "../../components/InputText/InputText";
import {Button} from "../../components/Button/Button";


export const Profile = () =>{
    let [inputValue, setInputValue] = useState<string>("");
    return(

        <>
            <h1>Profile Page</h1>
            <InputText value={inputValue} onChange={setInputValue} actionEnter={()=>{alert("enter")}}/>
            <Button value={"click"} action={()=>{alert("click")}}/>
        </>
    );
}