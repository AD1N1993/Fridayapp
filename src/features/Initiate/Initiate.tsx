import React from "react";
import {InputText} from "../../components/InputText/InputText";
import {Button} from "../../components/Button/Button";
import {useFormik} from "formik";
import {Redirect, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {resetPasswordTC} from "../Recovery/recovery-reducer";
import {Preloader} from "../../components/Preloader/Preloader";
import {useRedirect} from "../../utils/customHooks";
import s from "../../app/App.module.scss";
import {RequestStatusType} from "../../app/app-reducer";


export const Initiate = () => {

    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const shipment = useSelector<AppRootStateType, boolean>(state => state.recovery.isShipment);
    const redirect = useRedirect(shipment);
    const networkErrorMessage = useSelector<AppRootStateType, string>(state => state.recovery.error);
    const dispatch = useDispatch();
    const {token} = useParams();

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordRepeat: ''
        },
        onSubmit: values => {
            dispatch(resetPasswordTC(values.passwordRepeat, token))
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 2) {
                errors.password = 'Too Short!';
            } else if (values.password.length > 10) {
                errors.password = 'Max 10 chars';
            } else if (values.password !== values.passwordRepeat) {
                errors.password = "The entered values do not match."
            }
            return errors;
        },
    })

    if (redirect) {
        return <Redirect to={"/login"}/>
    }
    if (shipment) {
        return <div>You have successfully restored your password.</div>
    }
    return (
        <div className={s.formWrapper}>
            {appStatus === "loading" ? <Preloader/> : ""}
            <h1>Password recovery page</h1>
            <p>Please enter your new password.</p>
            <form onSubmit={formik.handleSubmit}>
                <InputText name={"password"} value={formik.values.password} onChange={formik.handleChange}
                           actionEnter={() => {
                           }} type={"text"}/>
                <InputText name={"passwordRepeat"} value={formik.values.passwordRepeat} onChange={formik.handleChange}
                           actionEnter={() => {
                           }} type={"password"}/>
                {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                <Button value={"send"} action={formik.handleSubmit} type={"submit"} disabled={appStatus === "loading"}
                        mode={appStatus === "loading" ? "red" : null}/>
            </form>
            <span>{networkErrorMessage}</span>
        </div>
    );
}

export type FormikErrorType = {
    password?: string
}
