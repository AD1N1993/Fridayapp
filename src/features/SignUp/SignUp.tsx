import React from "react";
import styles from "./SignUp.module.scss"


export const SignUp = () => {
    return (
        <>
            <h2>Registration</h2>
            <form>
                <input placeholder={'email'}/>
                <input placeholder={'password'} type='password'/>
                <button>register</button>
            </form>
        </>
    );
}