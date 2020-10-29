import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {FindForm} from "../../components/FindForm/FindForm";
import {getPacksTC, setCurrentPageAC} from "./Packs-reducer";
import {Paginator} from "../../components/Paginator/Paginator";
import {Select} from "../../components/Select/Select";
import s from "./Packs.module.scss"
import {Sort} from "../../components/Sort/Sort";

export const Packs = () => {
    const packName = useSelector<AppRootStateType, string>(state => state.packs.findPackName)
    const packs = useSelector<AppRootStateType, Array<any>>(state => state.packs.packs)
    const min = useSelector<AppRootStateType, number>(state => state.packs.min)
    const max = useSelector<AppRootStateType, number>(state => state.packs.max)
    const update = useSelector<AppRootStateType, number>(state => state.packs.update)
    const dispatch = useDispatch();
    const totalItemsCount = useSelector<AppRootStateType, number>(state => state.packs.totalPacksCount)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
    const pageSize = useSelector<AppRootStateType, string>(state => state.packs.pageSize)
    const onChangeCurrentPage = (currentPage: number) => {
        dispatch(setCurrentPageAC(currentPage))
    }

    useEffect(() => {
        dispatch(getPacksTC(packName, min+"", max+"", `${update}updated`, currentPage + "", pageSize, ""));
    }, [packName, currentPage, dispatch, pageSize,min,max, update])


    return (
        <>
            <h1>Packs Page</h1>

            <FindForm/>

            <Sort/>
            <div>
                {packs.map(p => <ul>
                    <li>{p.name}</li>
                </ul>)}
            </div>
            <div className={s.settings}>
                <Paginator totalItemsCount={totalItemsCount}
                           pageSize={pageSize} currentPage={currentPage}
                           portionSize={7}
                           onChangePage={onChangeCurrentPage}
                />
                Size:<Select/>
            </div>

        </>
    );
}

