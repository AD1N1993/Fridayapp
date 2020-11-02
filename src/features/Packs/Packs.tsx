import React, {useEffect} from "react";
import {TablePacks} from "../../components/Table/Table";
import {PackType} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import s from "./Packs.module.scss"
import {getPacksTC, setCurrentPageAC} from "./Packs-reducer";
import {FindForm} from "../../components/FindForm/FindForm";
import { Sort } from "../../components/Sort/Sort";
import {Paginator} from "../../components/Paginator/Paginator";
import {Select} from "../../components/Select/Select";
import {Redirect} from "react-router-dom";

export const Packs = () => {
    const packName = useSelector<AppRootStateType, string>(state => state.packs.findPackName)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
    const min = useSelector<AppRootStateType, number>(state => state.packs.min)
    const max = useSelector<AppRootStateType, number>(state => state.packs.max)
    const update = useSelector<AppRootStateType, number>(state => state.packs.update)
    const dispatch = useDispatch();
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.packs.totalPacksCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
    const pageSize = useSelector<AppRootStateType, string>(state => state.packs.pageSize)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const onChangeCurrentPage = (currentPage: number) => {dispatch(setCurrentPageAC(currentPage))}

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getPacksTC(packName + "", min, max, `${update}updated`, currentPage,
            +pageSize));
    }, [packName, currentPage, dispatch, pageSize,min,max, update])
    if (!isLoggedIn) {

        return <Redirect to={'/login'}/>
    }
    return (
        <>
            <h2>PACKS</h2>
            <FindForm/>
            <Sort/>
            <div>
                <TablePacks values={packs}/>
            </div>
            <div className={s.settings}>
                <Paginator totalItemsCount={totalItemsCount}
                           pageSize={pageSize} currentPage={currentPage}
                           portionSize={7}
                           onChangePage={onChangeCurrentPage}/>
                Size:<Select/>
            </div>

        </>
    );
}
