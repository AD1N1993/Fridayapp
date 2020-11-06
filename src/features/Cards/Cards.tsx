import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {getCardsTC, InitialStateType, setCurrentCardPageAC} from "./Cards-reducer";
import {TableCards} from "./TableCards/TableCards";
import {Paginator} from "../../components/Paginator/Paginator";
import {useParams, Redirect} from "react-router-dom"
import s from "./Cards.module.scss"
export const Cards = () => {
    const {cards, totalCardsCount, pageSize, currentPage} = useSelector<AppRootStateType, InitialStateType>(state => state.cards)
    const {packId} = useParams()
    console.log(packId)
    const dispatch = useDispatch()

    useEffect(() => {
        if(packId)
        dispatch(getCardsTC(packId, currentPage))
    }, [packId, currentPage])
    if(!packId) return <Redirect to={"/packs"}/>
    const onChangeCurrentPage = (currentPage: number) => {
        dispatch(setCurrentCardPageAC(currentPage))
    }
    return (<div className={s.cardsWrapper}>
        <TableCards values={cards}/>
        <Paginator totalItemsCount={totalCardsCount} pageSize={pageSize.toString()} currentPage={currentPage}
                   portionSize={pageSize} onChangePage={onChangeCurrentPage}/>
    </div>)
}