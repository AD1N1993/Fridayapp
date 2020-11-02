import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {CardType} from "../../api/api";
import {getCardsTC} from "./Cards-reducer";

export const Cards = () => {
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const currentPackID = useSelector<AppRootStateType, string>(state => state.cards.currentPackID)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsTC(currentPackID))
    }, [currentPackID])

    return (
        <div>
            {cards.map(c => <div>{c.question}</div>)}
            {/*<TableCards values={cards}/>*/}
        </div>
    )
}