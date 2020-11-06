import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {getCardsTC} from "../Cards/Cards-reducer";
import {CardType} from "../../api/api";
import {setCurrentCardAC} from "./learningProcess-reducer";
import {Card} from "../Cards/TableCards/Card/Card";
import s from "./LearningProcess.module.scss"
import styles from "../../common/styles/common.module.scss"
import Rating from "react-rating";
import empty from "../../assets/img/empty.png"
import full from "../../assets/img/full.png"
export const LearningProcess = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const currentPackID = useSelector<AppRootStateType, string>(state => state.cards.currentPackID)
    useEffect(() => {
        if (currentPackID) {
            dispatch(getCardsTC(currentPackID))
        }
    }, [currentPackID])

    useEffect(() => {
        let card = Math.floor(Math.random() * cards.length)
        let currentCard = cards[card]
        if (currentCard) {
            dispatch(setCurrentCardAC(currentCard))
        }
    }, [cards])

    const currentCard = useSelector<AppRootStateType, CardType | null>(state => state.learningProcess.currentCard)

    const setCurrentCard = () => {
        let card = Math.floor(Math.random() * cards.length)
        dispatch(setCurrentCardAC(cards[card]))
    }


    return (
        <div className={styles.container}>
            <div className={s.learnWrapper}>
                {currentCard && <Card card={currentCard}/>}
                <Rating 
                    emptySymbol={<img src={empty} className="icon"  alt={"s"} style={{width:"25px",height:"25px"}}/> }
                    fullSymbol={<img src={full} className="icon"  alt={"s"} style={{width:"25px",height:"25px"}}/>}

                />
                <button onClick={setCurrentCard}>Next question</button>
            </div>
        </div>
    )
}