import React from "react";
import styles from "./Pack.module.scss"
import {PackType} from "../../../api/api";
import backgroundPack from "../../../assets/img/backgroundPack.jpg"
import {NavLink} from "react-router-dom";
import {setCurrentPackIdAC} from "../../Cards/Cards-reducer";
import {useDispatch} from "react-redux";

type PackPropsType = {
    pack: PackType
    openModalRemovePack: (packID: string) => void
    myUserID: string
}

export const Pack = (props: PackPropsType) => {
    const dispatch = useDispatch()

    const removePack = () => {
        props.openModalRemovePack(props.pack._id)
    }
    const changeCurrentPackID = (packID: string) => {
        debugger
        dispatch(setCurrentPackIdAC(packID))
    }

    return (
        <div className={styles.packBlock} style={{backgroundImage: `url(${backgroundPack})`}}>
            <h2>{props.pack.name}</h2>
            <NavLink to='/cards' onClick={ () => changeCurrentPackID(props.pack._id)}>
                <div className={styles.cardsShow}>
                    Cards: {props.pack.cardsCount}
                </div>
            </NavLink>
            <div>{props.pack.user_name}</div>
            <button className={styles.start} onClick={removePack}>Start Learn</button>
            {props.myUserID === props.pack.user_id &&
            <button className={styles.deleteButton} onClick={removePack}>x</button>}

        </div>
    )
}