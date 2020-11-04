import React, {useState} from "react";
import styles from "./Card.module.scss"
import backgroundPack from "../../../../assets/img/BackgroundPack.jpg"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CardType} from "../../../../api/api";
import {AppRootStateType} from "../../../../app/store";

type PropsCardType = {
    card: CardType
}

export const Card = (props: PropsCardType) => {
    const myUserID = useSelector<AppRootStateType, string>(state => state.app.myUserID)
    // const dispatch = useDispatch()
    //
    // const removePack = () => {
    //     props.removePack(props.pack._id)
    // }
    // const changeCurrentPackID = (packID: string) => {
    //     dispatch(setCurrentPackIdAC(packID))
    // }
        const [ flip,setFlip] = useState(false)
    return (
        <>

            <div className={styles.box} >
                {myUserID === props.card.cardsPack_id &&
				<button className={styles.deleteButton} onClick={()=>{}}>x</button>}
                <div className={`${styles.boxInner} ${flip ? styles.active:""} `} >
                    <div className={styles.boxFront} style={{backgroundImage: `url(${backgroundPack})`}}>
                        <p className={styles.text}>{props.card.question}</p>
                        <button className={styles.start} onClick={()=>{setFlip(true)}}>Show answer</button>
                    </div>
                    <div className={styles.boxBack} style={{backgroundImage: `url(${backgroundPack})`}}>
                       <p className={styles.text}>{props.card.answer}</p>
                        <button className={styles.start} onClick={()=>{setFlip(false)}}>Show question</button>
                    </div>
                </div>
            </div>
        </>
    )
}