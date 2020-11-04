import React from "react";
import {useFormik} from "formik";
import s from "./FindForms.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    getPacksTC, setCurrentPageAC,
    setMinMaxValueAC,
    setPacksNameAC,
    setPageSizeAC,
    setUpdatePacksAC
} from "../../features/Packs/Packs-reducer";
import {Range} from "rc-slider";
import {AppRootStateType} from "../../app/store";

export const FindForm = () => {
    const min = useSelector<AppRootStateType, number>(state => state.packs.min)
    const max = useSelector<AppRootStateType, number>(state => state.packs.max)
    const dispatch = useDispatch()
    let onRangeValue = (value: number[]) => {
        dispatch(setMinMaxValueAC(value))
    }

    let setUpdateNamePacks = (value: string) => {
        dispatch(setUpdatePacksAC(value))
    }

    const resetPacks = () => {
        dispatch(setMinMaxValueAC([0,20]))
        dispatch(setPageSizeAC("6"))
        dispatch(setCurrentPageAC(1))
        dispatch(getPacksTC())
    }
    const formik = useFormik({
        initialValues: {
            stringSearch: '',
        },
        onSubmit: values => {
            dispatch(setPacksNameAC(values.stringSearch));
            formik.resetForm();

        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (values.stringSearch.length > 10) {
                errors.stringSearch = 'Max 10 chars';
            }
            return errors;
        },
    })

    return (
        <div className={s.findFormWrapper}>
            <form onSubmit={formik.handleSubmit} className={s.findForm}>
                <input className={s.inputPacks} type="text" name={"stringSearch"} value={formik.values.stringSearch}
                       onChange={formik.handleChange} placeholder={"Packs name"}/>
                {formik.errors.stringSearch ? <div style={{color: "red"}}>{formik.errors.stringSearch}</div> : null}
                <div className={s.range}>
                    <span className={s.line}>Number of cards in packs: {min} - {max}</span>
                    <Range min={0} max={20} step={1} dots={false} defaultValue={[min,max]} onAfterChange={onRangeValue} />
                    <h4>Sort by:</h4>
                    <ul className={s.sortList}>
                        <li className={s.sortItem}>
                            Name<i className={s.arrowUp} onClick={() => {
                            setUpdateNamePacks("0name")
                        }}></i>
                            <i className={s.arrowDown} onClick={() => {
                                setUpdateNamePacks("1name")
                            }}></i>
                        </li>
                        <li className={s.sortItem}>Date<i className={s.arrowUp} onClick={() => {
                            setUpdateNamePacks("0update")
                        }}></i>
                            <i className={s.arrowDown} onClick={() => {
                                setUpdateNamePacks("1update")
                            }}></i></li>
                    </ul>
                </div>
                <div className={s.btns}>
                    <button className={s.btn} value={"search"} type={"submit"}>
                        Apply
                    </button>
                    <button className={s.btn} value={"search"} onClick={resetPacks}>
                        Reset
                    </button>
                </div>
            </form>
        </div>


    );
}


export type FormikErrorType = {
    stringSearch?: string
}
