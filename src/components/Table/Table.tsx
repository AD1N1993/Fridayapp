import React from "react";
import styles from "./Table.module.css"
import {PackType} from "../../api/api";
import {Pack} from "../../features/Packs/Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {createPackTC, removePackTC} from "../../features/Packs/Packs-reducer";
import {InputText} from "../InputText/InputText";
import {Button} from "../Button/Button";
import {useFormik} from "formik";
import {AppRootStateType} from "../../app/store";

type TablePropsType = {
    values: Array<PackType>

}
type FormikErrorType = {
    packName?: string
}

export const TablePacks = (props: TablePropsType) => {
    const myUserID = useSelector<AppRootStateType, string>(state => state.app.myUserID)

    const formik = useFormik({
        initialValues: {
            packName: ''
        },
        onSubmit: values => {
            debugger
            dispatch(createPackTC(values.packName))
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.packName) {
                errors.packName = 'Required';
            } else if (values.packName.length > 15) {
                errors.packName = 'Name pack must be no more than 12 characters';
            }
            return errors;
        },
    })

    const dispatch = useDispatch()

    const removePack = (packID: string) => {
        dispatch(removePackTC(packID))
    }

    return (
        <div className={styles.tablePacksBlock}>
            <div className={styles.tablePackContainer}>
                <div className={styles.packs}>
                    {props.values.map(p => <Pack myUserID={myUserID} pack={p} key={p._id}  removePack={removePack}/>)}
                </div>
            </div>
            <div className={styles.addPackBlock}>
                <form>
                    <InputText placeholder={'pack name'}
                               type={'text'}
                               {...formik.getFieldProps('packName')}
                    />
                    {formik.errors.packName && <div className={styles.error}>{formik.errors.packName}</div>}
                    <div className={styles.buttonBlock}>
                        <Button disabled={false} type='submit' value='add new pack' action={formik.handleSubmit}/>
                    </div>
                </form>
            </div>
        </div>
    )
}