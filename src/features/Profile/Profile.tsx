import React from "react";
import {InputText} from "../../components/InputText/InputText";
import {Button} from "../../components/Button/Button";


export const Profile = () =>{
    return(
        <>
            <h1>Profile Page</h1>
            <InputText value={""} onChange={()=>{}} actionEnter={()=>{alert("enter")}}/>
            <Button value={"click"} action={()=>{alert("click")}}/>
        </>
    );
}

