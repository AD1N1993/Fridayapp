import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {setPageSizeAC} from "../../features/Packs/Packs-reducer";
import {AppRootStateType} from "../../app/store";
import s from "./Select.module.scss"


export const Select = () => {
    const dispatch = useDispatch();
    const pageSize = useSelector<AppRootStateType,string>(state => state.packs.pageSize)
    const formik = useFormik({
        initialValues: {
            choosePageSize: pageSize,
        },
        onSubmit: values => {
            dispatch(setPageSizeAC(values.choosePageSize));
        },
    })
    return (
            <form onSubmit={formik.handleSubmit} onChange={formik.submitForm} className={s.filters}>
                <select
                    name="choosePageSize"
                    value={pageSize}
                    onChange={formik.handleChange}
                    style={{display: 'block'}}
                >
                    <option value={"6"} label="6"/>
                    <option value={"12"} label="12"/>
                    <option value={"24"} label="24"/>
                </select>
            </form>
    );
}