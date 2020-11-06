import React, {useCallback, useState} from "react";
import styles from "./Table.module.scss"
import {PackType} from "../../api/api";
import {Pack} from "../../features/Packs/Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {InputText} from "../InputText/InputText";
import {Button} from "../Button/Button";
import {useFormik} from "formik";
import {AppRootStateType} from "../../app/store";
import {createPackTC, removePackTC} from "../../features/Packs/Packs-reducer";
import {Modal} from "../Modal/Modal";

type TablePropsType = {
    values: Array<PackType>

}
type FormikErrorType = {
    packName?: string
}

export const TablePacks = (props: TablePropsType) => {
    const [isModalAddPackOpened, setIsModalAddPackOpened] = useState(false)
    const [isModalRemovePackOpened, setIsModalRemovePackOpened] = useState(false)
    const [packID, setPackID] = useState("")
    const dispatch = useDispatch()
    const myUserID = useSelector<AppRootStateType, string>(state => state.app.myUserID)

    const formik = useFormik({
        initialValues: {
            packName: ''
        },
        onSubmit: values => {
            dispatch(createPackTC(values.packName));
            formik.resetForm();
            setIsModalAddPackOpened(false)
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.packName) {
                errors.packName = 'Required';
            }

            return errors;
        },
    })

    const openModalRemovePack = useCallback((packID: string) => {
        setIsModalRemovePackOpened(true)
        setPackID(packID)
    }, [])

    const removePack = useCallback(() => {
        dispatch(removePackTC(packID))
        setIsModalRemovePackOpened(false)
    }, [packID])

    return (
        <div className={styles.tablePacksBlock}>
            <div className={styles.tablePackContainer}>
                <div className={styles.packs}>
                    {props.values.map(p => <Pack myUserID={myUserID} pack={p} key={p._id} openModalRemovePack={openModalRemovePack}/>)}
                </div>
            </div>
            <div>
                <Button value={'Add new pack'} action={() => setIsModalAddPackOpened(true)}/>
            </div>

            {isModalAddPackOpened &&
            <Modal title={'Add pack'} onClose={() => {
                setIsModalAddPackOpened(false)
            }} duration={600} showCloseBtn>
                <div className={styles.addPackBlock}>
                    <form>
                        <InputText placeholder={'pack name'}
                                   type={'text'}
                                   {...formik.getFieldProps('packName')}
                        />
                        {formik.errors.packName && <div className={styles.error}>{formik.errors.packName}</div>}
                        <div className={styles.buttonBlock}>
                            <Button disabled={false} type='submit' value='submit' action={formik.handleSubmit}/>
                        </div>
                    </form>
                </div>
            </Modal>
            }
            {isModalRemovePackOpened &&
            <Modal title={'Delete pack'} onClose={() => {
                setIsModalRemovePackOpened(false)
            }} duration={600} showCloseBtn>
                <div className={styles.deletePackBlock}>
                    <div className={styles.warnText}>This action cannon be undone.</div>
                    <button className={styles.cancelButton} onClick={() => setIsModalRemovePackOpened(false)}>CANCEL</button>
                    <button className={styles.deleteButton} onClick={removePack}>DELETE</button>
                </div>
            </Modal>
            }
            {/*<a href={''} className={styles.scrollUp}>
                <i className={styles.fa_fa_chevron_up}> </i>
            </a>*/}
        </div>
    )
}