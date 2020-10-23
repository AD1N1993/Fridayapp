import React from "react";
import styles from "./SignUp.module.scss"
import {InputText} from "../../components/InputText/InputText";
import {useFormik} from "formik";
import {Button} from "../../components/Button/Button";
import {registrationTC} from "./signup-reducer";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import { Preloader } from "../../components/Preloader/Preloader";
import s from "../../app/App.module.scss";


type FormikErrorType = {
    email?: string
    password?: string
}

export const SignUp = () => {
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.signup.isRegistered)
    const registrationLoad = useSelector<AppRootStateType, boolean>(state => state.signup.registrationLoad)
    const registrationError = useSelector<AppRootStateType, null | string>(state => state.signup.registrationError)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch(registrationTC(values))
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Password must be at least 7 characters';
            }
            return errors;
        },
    })

    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }
    if (registrationLoad) {
        return <Preloader/>
    }

    return (
        <div className={s.formWrapper}>
            <h2>Registration</h2>
            <form>
                <InputText placeholder={'email'}
                           type={'text'}
                           {...formik.getFieldProps('email')}
                />
                {formik.errors.email && <div className={styles.error}>{formik.errors.email}</div>}
                <InputText placeholder={'password'}
                           type='password'
                           {...formik.getFieldProps('password')}
                />
                {formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}
                <Button disabled={false} type='submit' value='register' action={formik.handleSubmit}/>
            </form>
            <div className={styles.linkToLogin}>
                <NavLink to='login'>
                    <span>Login</span>
                </NavLink>
            </div>
            {registrationError && <div className={styles.registrationError}>{registrationError}</div>}
        </div>
    );
}