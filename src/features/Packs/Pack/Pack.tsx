import React from "react";
import styles from "./Pack.module.css"
import {PackType} from "../../../api/api";

type PackPropsType = {
    pack: PackType
    removePack: (packID: string) => void
    myUserID: string
}

export const Pack = (props: PackPropsType) => {

    const removePack = () => {
        props.removePack(props.pack._id)
    }

    return (
        <div className={styles.packBlock}>
            <h2>{props.pack.name}</h2>
            <div>{props.pack.user_name}</div>
            <div><a href="#">cards</a></div>
            <div>{props.pack.user_id}</div>
            { props.myUserID === props.pack.user_id && <button onClick={removePack}>delete pack</button>}
        </div>
    )
}