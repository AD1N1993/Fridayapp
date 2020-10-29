import React, {useEffect} from "react";
import styles from "./Packs.module.css"
import {TablePacks} from "../../components/Table/Table";
import {PackType} from "../../api/api";
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
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
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
        //
        dispatch(getPacksTC(currentPage + "", pageSize + "", packName + "", min+"", max+"",
            `${update}updated`));
    }, [packName, currentPage, dispatch, pageSize,min,max, update])


    return (
        <>
            <h1>Packs Page</h1>

            <FindForm/>

            <Sort/>
            <div>
                <h2>PACKS</h2>
                <TablePacks values={packs}/>
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
//
// =======
// import styles from "./Packs.module.css"
// import {TablePacks} from "../../components/Table/Table";
// import {useDispatch, useSelector} from "react-redux";
// import {AppRootStateType} from "../../app/store";
// import {PackType} from "../../api/api";
// import {getPacksTC} from "./Packs-reducer";
//
// export const Packs = () => {
//     const dispatch = useDispatch()
//     const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.packs)
//     const currentPage = useSelector<AppRootStateType, number>(state => state.packs.currentPage)
//     const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
//
//     useEffect(() => {
//         dispatch(getPacksTC(currentPage, pageSize))
//     }, [currentPage, pageSize])
//
//     return (
//         <div>
//             <h2>PACKS</h2>
//             <TablePacks values={packs}/>
//         </div>
//     )
// }