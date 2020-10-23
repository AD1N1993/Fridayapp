import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useFormik} from "formik";
import {loginTC, RequestStatusType} from "./auth-reducer";
import {InputText} from "../../components/InputText/InputText";
import {Button} from "../../components/Button/Button";
import styles from "./Login.module.scss"
import {Preloader} from "../../components/Preloader/Preloader";
import {InputCheckBox} from "../../components/InputCheckbox/InputCheckbox";
import s from "../../app/App.module.scss"

export const Login = () => {

    const dispatch = useDispatch()

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const errorLogin = useSelector<AppRootStateType, string>(state => state.login.error)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.login.status)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({

        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Must be 6 characters or less';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })

    if (isLogged) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={s.formWrapper}>
            <h1>Login Page</h1>
            <form onSubmit={formik.handleSubmit} >
                <InputText name={"email"} value={formik.values.email}
                           onChange={formik.handleChange}
                           placeholder={"Email"}
                           actionEnter={() => {
                           }} type={"text"}/>
                {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                <InputText name={"password"} value={formik.values.password}
                           onChange={formik.handleChange}
                           placeholder={"Password"}
                           actionEnter={() => {
                           }} type={"password"}/>
                {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                {errorLogin && <div className={styles.errorLogin}>{errorLogin}</div>}
                {status === 'loading' && <Preloader/>}
                <InputCheckBox checked={formik.values.rememberMe} changeStatus={formik.handleChange}
                               value={"remember me"} name={"rememberMe"}/><br/>
                <Button value={"send"} action={formik.handleSubmit} type={"submit"}/>

            </form>
            <NavLink className={""} to="recovery" activeClassName={""}>
                <span className={""}> Forgot password?</span>
            </NavLink>
        </div>
    );
}