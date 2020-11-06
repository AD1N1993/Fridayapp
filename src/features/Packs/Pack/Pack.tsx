import React from "react";
import styles from "./Pack.module.scss"
import {PackType} from "../../../api/api";
import backgroundPack from "../../../assets/img/backgroundPack.jpg"
import {NavLink} from "react-router-dom";
import {setCurrentPackIdAC, setCurrentPackUserIdAC} from "../../Cards/Cards-reducer";
import {useDispatch} from "react-redux";

type PackPropsType = {
    pack: PackType
    openModalRemovePack: (packID: string) => void
    myUserID: string
}

export const Pack = (props: PackPropsType) => {
    const dispatch = useDispatch()

    const openModalRemovePack = () => {
        props.openModalRemovePack(props.pack._id)
    }
    const changeCurrentPackID = (packID: string, userID: string) => {
        dispatch(setCurrentPackIdAC(packID))
        dispatch(setCurrentPackUserIdAC(userID))
    }

    return (
        <div className={styles.packBlock} style={{backgroundImage: `url(${backgroundPack})`}}>
            <h3 className={styles.packTitle}>{props.pack.name}</h3>
            {/*{ props.pack.cardsCount === 0 ? <span className={styles.count}>Cards: {props.pack.cardsCount}</span>:*/}
                <NavLink aria-disabled={"true"} className={styles.count} to='/cards'
                         onClick={ () => changeCurrentPackID(props.pack._id, props.pack.user_id)}>
                    Cards: {props.pack.cardsCount}
                </NavLink>

            <div className={styles.author}>{props.pack.user_name}</div>
            <button className={styles.start}>
                <NavLink className={styles.link} to={'/learningProcess'} onClick={() => changeCurrentPackID(props.pack._id)}>
                    Start Learn
                </NavLink>
            </button>
            {props.myUserID === props.pack.user_id &&
            <button className={styles.deleteButton} onClick={openModalRemovePack}>x</button>}

        </div>
    )
}