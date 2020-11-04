import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {getCardsTC, InitialStateType, setCurrentCardPageAC} from "./Cards-reducer";
import {TableCards} from "./TableCards/TableCards";
import {Paginator} from "../../components/Paginator/Paginator";

export const Cards = () => {
    const {cards,totalCardsCount,pageSize,currentPage} = useSelector<AppRootStateType, InitialStateType>(state => state.cards)
    const currentPackID = useSelector<AppRootStateType, string>(state => state.cards.currentPackID)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsTC(currentPackID,currentPage))
    }, [currentPackID,currentPage])
    const onChangeCurrentPage = (currentPage: number) => {dispatch(setCurrentCardPageAC(currentPage))}
    return (<>
            <TableCards values={cards}/>
            <Paginator totalItemsCount={totalCardsCount} pageSize={pageSize.toString()} currentPage={currentPage} portionSize={4} onChangePage={onChangeCurrentPage}/>
    </>)
}