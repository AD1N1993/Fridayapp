import React, {useEffect} from "react";
import {TablePacks} from "../../components/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import s from "./Packs.module.scss"
import commonStyles from "../../common/styles/common.module.scss"
import {getPacksTC, InitialStateType, setCurrentPageAC} from "./Packs-reducer";
import {FindForm} from "../../components/FindForm/FindForm";
import {Paginator} from "../../components/Paginator/Paginator";
import {Redirect} from "react-router-dom";
import 'rc-slider/assets/index.css';
export const Packs = () => {
    const {findPackName,packs,min,max,update,totalPacksCount,currentPage,pageSize} = useSelector<AppRootStateType, InitialStateType>(state => state.packs)
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const onChangeCurrentPage = (currentPage: number) => {dispatch(setCurrentPageAC(currentPage))}

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getPacksTC(findPackName + "", min, max, `${update}`, currentPage,
            +pageSize));
    }, [findPackName, currentPage, dispatch, pageSize, min, max, update])
    if (!isLoggedIn) {

        return <Redirect to={'/login'}/>
    }
    return (
        <div className={commonStyles.container}>
            <div className={s.content}>
                <div className={s.stickyContainer}>
                    <div className={s.settings}>
                        <h3>Filters</h3>
                        <FindForm/>

                    </div>
                </div>
                <div className={s.packsWrapper}>
                    <TablePacks values={packs}/>
                    <div className={s.paginator}>
                        <Paginator totalItemsCount={totalPacksCount}
                                   pageSize={pageSize} currentPage={currentPage}
                                   portionSize={7}
                                   onChangePage={onChangeCurrentPage}/>
                    </div>

                </div>
            </div>
        </div>
    );
}
