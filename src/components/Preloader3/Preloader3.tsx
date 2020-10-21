import React from "react";
import s from "./Preloader3.module.scss"
import preloader from "../../assets/img/loader.gif"

export const Preloader3 = () => {
    return(
        <div className={s.wrapper}>
            <img src={preloader} alt="loading..."/>
        </div>
    );
}