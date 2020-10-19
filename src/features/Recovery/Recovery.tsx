import React, {useState} from "react";
import {InputText} from "../../components/InputText/InputText";
import {Button} from "../../components/Button/Button";
import {useFormik} from "formik";


export const Recovery = () => {debugger
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            // dispatch(loginTC(values));
            alert(values.email)
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
    return (
        <>
            <h1>Recovery Page</h1>
            <h2>Forget password?</h2>
            <p>Please enter your email address and password reset information will be sent to it.</p>
            <form onSubmit={formik.handleSubmit}>
                <InputText name={"email"} value={formik.values.email} onChange={formik.handleChange} actionEnter={()=>{}}/>
                {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                <InputText name={"email"} value={formik.values.email} onChange={formik.handleChange} actionEnter={()=>{}}/>
                {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                <Button value={"send"} action={formik.handleSubmit} type={"submit"} />

            </form>
        </>
    );
}

export type FormikErrorType = {
    email?: string
}
