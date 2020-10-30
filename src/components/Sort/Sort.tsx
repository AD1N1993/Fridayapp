import React, {useState} from "react";
import {Range} from 'rc-slider';
import s from "./Sort.module.scss"
import 'rc-slider/assets/index.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setMinMaxValueAC, setUpdatePacksAC, SortType} from "../../features/Packs/Packs-reducer";

export const Sort = () => {
    const min = useSelector<AppRootStateType, number>(state => state.packs.min)
    const max = useSelector<AppRootStateType, number>(state => state.packs.max)
    const dispatch = useDispatch()
    let [value, setValue] = useState<Array<number>>([min,max])
    let onRangeValue = (value: number[]) => {
        setValue(value)
        dispatch(setMinMaxValueAC(value))
    }
    let setUpdatePacks = (value:SortType) =>{
        dispatch(setUpdatePacksAC(value))
    }
    return (
        <>
            <div className={s.range}>
                Number of cards: {value[0]} - {value[1]}
                <Range min={0} max={20} step={1} dots={false} defaultValue={value} onChange={onRangeValue}
                       pushable={true} />
                       <span onClick={()=>{setUpdatePacks(SortType.new)}}>show new packs first</span> --- <span onClick={()=>{setUpdatePacks(SortType.old)}}>show old packs first</span>
            </div>
        </>
    );
}

