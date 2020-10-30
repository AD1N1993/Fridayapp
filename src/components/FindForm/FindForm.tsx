import React from "react";
import {useFormik} from "formik";
import s from "./FindForms.module.scss"
import {InputText} from "../InputText/InputText";
import {Button} from "../Button/Button";
import {useDispatch} from "react-redux";
import {setPacksNameAC} from "../../features/Packs/Packs-reducer";

export const FindForm = () => {
    const dispatch = useDispatch();

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

                    <InputText name={"stringSearch"} value={formik.values.stringSearch} onChange={formik.handleChange}
                               actionEnter={() => {
                               }} type={"text"}/>
                {formik.errors.stringSearch ? <div style={{color: "red"}}>{formik.errors.stringSearch}</div> : null}
                <Button value={"search"} action={formik.handleSubmit} type={"submit"}/>
            </form>
        </div>
    );
}

export type FormikErrorType = {
    stringSearch?: string
}
