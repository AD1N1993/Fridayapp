import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from "react-redux";
import {setPageSizeAC} from "../../features/Packs/Packs-reducer";


export const Select = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            choosePageSize: "",
        },
        onSubmit: values => {
            dispatch(setPageSizeAC(values.choosePageSize));
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <form onSubmit={formik.handleSubmit} onChange={formik.submitForm}>
                <select
                    name="choosePageSize"
                    value={formik.values.choosePageSize}
                    onChange={formik.handleChange}
                    style={{display: 'block'}}
                >
                    <option value={"6"} label="6"/>
                    <option value={"12"} label="12"/>
                    <option value={"24"} label="24"/>
                </select>
            </form>
        </form>
    );
}