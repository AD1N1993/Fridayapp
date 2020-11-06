import React, {useState} from "react";
import s from "./Paginator.module.scss"
import {Select} from "../Select/Select";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: string
    currentPage: number
    portionSize: number
    onChangePage: (pageNumber: number) => void
}

export const Paginator = ({totalItemsCount, pageSize, currentPage, onChangePage, portionSize}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalItemsCount / +pageSize);
    let pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let lastPage = pages[pages.length - 1]
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;
    const setNextPage = () => {
        onChangePage(currentPage + 1)
        if (currentPage === rightPortionNumber) {
            setPortionNumber(portionNumber + 1)
        }
    }
    const setPrevPage = () => {
        onChangePage(currentPage - 1)
        if (currentPage === leftPortionPageNumber) {
            setPortionNumber(portionNumber - 1)
        }
    }
    const setLastPage = () => {
        onChangePage(lastPage);
        setPortionNumber(portionCount);
    }
    const setFirstPage = () => {
        onChangePage(1);
        setPortionNumber(1);
    }
    return (
        <>
            <div className={s.paginatorWrapper}>
                <button className={`${s.btn} ${s.btnLeft}`}
                        onClick={setPrevPage}
                        disabled={currentPage === pages[0]}>
                    {"<"}
                </button>
                <ul className={s.pagesList}>
                    {portionNumber > 1 &&
					<li className={`${currentPage === 1 ? s.selectedPage : ""} ${s.pagesItems}`}
						onClick={setFirstPage}>{1}...</li>}
                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
                        .map(p => {
                            return <li key={p}
                                       className={`${currentPage === p ? s.selectedPage : ""} ${s.pagesItems}`}
                                       onClick={() => {
                                           onChangePage(p)
                                       }}>{p}</li>
                        })}
                    {portionNumber < portionCount &&<span>...</span>}
                    {portionNumber < portionCount && 
					<li className={`${currentPage === lastPage ? s.selectedPage : s.lastPage} ${s.pagesItems}`}
						onClick={setLastPage}>{lastPage}</li>}
                </ul>
                <button className={`${s.btn} ${s.btnRight}`}
                        onClick={setNextPage}
                        disabled={currentPage === pages[pages.length - 1]}>{">"}</button>
                Size:<Select pageSize={pageSize}/>
            </div>
        </>
    )
}