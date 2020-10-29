import React, {useEffect} from "react";
import styles from "./Packs.module.css"
import {TablePacks} from "../../components/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {PackType} from "../../api/api";
import {getPacksTC} from "./Packs-reducer";

export const Packs = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
    const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)

    useEffect(() => {
        dispatch(getPacksTC(currentPage, pageSize))
    }, [currentPage, pageSize])

    return (
        <div>
            <h2>PACKS</h2>
            <TablePacks values={packs}/>
        </div>
    )
}