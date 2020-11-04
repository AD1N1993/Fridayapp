import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {getCardsTC} from "../Cards/Cards-reducer";
import {CardType} from "../../api/api";
import {setCurrentCardAC} from "./learningProcess-reducer";

export const LearningProcess = () => {

    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const currentPackID = useSelector<AppRootStateType, string>(state => state.cards.currentPackID)
    useEffect(()=> {
        dispatch(getCardsTC(currentPackID))
    }, [currentPackID])

    useEffect(() => {
        let card = Math.floor(Math.random() * cards.length)
        dispatch(setCurrentCardAC(cards[card]))
    }, [cards])

    const currentCard = useSelector<AppRootStateType, CardType>(state => state.learningProcess.currentCard)
    const setCurrentCard = () => {
        let card = Math.floor(Math.random() * cards.length)
        dispatch(setCurrentCardAC(cards[card]))
    }
    const [isShowAnswer, setShowAnswer] = useState(true)

    const showAnswer = () => {
        setShowAnswer(false)
    }

    const showQuestion = () => {
        setShowAnswer(true)
        setCurrentCard()
    }



    return (
        <div>
            LearningProcess
            {isShowAnswer && <div>
                {currentCard ? "Question:" + currentCard.question : ""}
                <button onClick={showAnswer}>Show answer</button>
            </div>}

            {!isShowAnswer && <div>
                {currentCard ? "Answer:" + currentCard.answer : ""}
                <button onClick={showQuestion}>Next question </button>
            </div>}
        </div>
    )
}