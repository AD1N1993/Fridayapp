import React from "react";
import {CardType} from "../../../api/api";
import styles from "../../../components/Table/Table.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";

type TableCardsPropsType = {
    values: Array<CardType>
}
type FormikErrorType = {
    cardName?: string
}

export const TableCards = (props: TableCardsPropsType) => {
    const myUserID = useSelector<AppRootStateType, string>(state => state.app.myUserID)
    const dispatch = useDispatch()

    // const formik = useFormik({
    //     initialValues: {
    //         cardName: ''
    //     },
    //     onSubmit: values => {
    //         dispatch(createPackTC(values.cardName));
    //         formik.resetForm();
    //     },
    //     validate: (values) => {
    //         const errors: FormikErrorType = {};
    //         if (!values.cardName) {
    //             errors.cardName = 'Required';
    //         } else if (values.cardName.length > 15) {
    //             errors.cardName = 'Name pack must be no more than 12 characters';
    //         }
    //         return errors;
    //     },
    // })

    return (
        <div className={styles.tableCardBlock}>
            <div className={styles.tableCardContainer}>
                <div className={styles.cards}>
                    {props.values.map(c => <span>{c}</span>)}
                </div>
            </div>
            <div className={styles.addCardBlock}>
                {/*<form>*/}
                {/*    <InputText placeholder={'pack name'}*/}
                {/*               type={'text'}*/}
                {/*               {...formik.getFieldProps('packName')}*/}
                {/*    />*/}
                {/*    {formik.errors.cardName && <div className={styles.error}>{formik.errors.cardName}</div>}*/}
                {/*    <div className={styles.buttonBlock}>*/}
                {/*        <Button disabled={false} type='submit' value='add new pack' action={formik.handleSubmit}/>*/}
                {/*    </div>*/}
                {/*</form>*/}
            </div>
        </div>
    )
}