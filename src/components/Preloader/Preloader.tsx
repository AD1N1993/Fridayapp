import React from "react";
import s from "./Preloader.module.scss"
import preloader from "../../assets/img/loader.gif"

export const Preloader = () => {
    return(
        <div className={s.overlay}>
        <div className={s.wrapper}>
            <img src={preloader} alt="loading..."/>
        </div>
        </div>
    );
}