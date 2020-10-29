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
                    <option value={"5"} label="5"/>
                    <option value={"10"} label="10"/>
                    <option value={"15"} label="15"/>
                    <option value={"20"} label="20"/>
                </select>
            </form>
        </form>
    );
}