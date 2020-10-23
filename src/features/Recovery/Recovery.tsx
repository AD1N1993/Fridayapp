import React from "react";
import {InputText} from "../../components/InputText/InputText";
import {Button} from "../../components/Button/Button";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {recoveryRequestTC} from "./recovery-reducer";
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from "../../app/store";
import {Preloader} from "../../components/Preloader/Preloader";
import {useRedirect} from "../../utils/customHooks";
import s from "../../app/App.module.scss";


export const Recovery = () => {
    const networkErrorMessage = useSelector<AppRootStateType, string>(state => state.recovery.error);
    const status = useSelector<AppRootStateType, boolean>(state => state.recovery.isShowPreloader);
    const shipment = useSelector<AppRootStateType, boolean>(state => state.recovery.isShipment);
    const redirect = useRedirect(shipment);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            dispatch(recoveryRequestTC(values.email))
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
    })

    if (redirect) {
        return <Redirect to={"/login"}/>
    }
    if (shipment) {
        return <div>Instructions for password recovery have been sent to your email address.</div>

    }

    return (
        <div className={s.formWrapper}>
            {status ? <Preloader/> : ""}
            <h2>Forgot password?</h2>
            <p>Please enter your email address.</p>
            <form onSubmit={formik.handleSubmit}>
                <InputText name={"email"} value={formik.values.email} onChange={formik.handleChange}
                           actionEnter={() => {
                           }} type={"text"}/>
                {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                <p style={{color: "red"}}>{networkErrorMessage}</p>
                <Button value={"send"} action={formik.handleSubmit} type={"submit"} disabled={status}
                        mode={status ? "red" : null}/>
            </form>
        </div>
    );
}

export type FormikErrorType = {
    email?: string
}
