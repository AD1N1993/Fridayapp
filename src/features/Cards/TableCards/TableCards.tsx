import React, {useState} from "react";
import {CardType} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {Card} from "./Card/Card";
import {InputText} from "../../../components/InputText/InputText";
import {Button} from "../../../components/Button/Button";
import {useFormik} from "formik";
import styles from "./TableCards.module.scss"
import {Modal} from "../../../components/Modal/Modal";
import {createCard, deleteCard} from "../Cards-reducer";

type TableCardsPropsType = {
    values: Array<CardType>
}
type FormikErrorType = {
    question?: string
    answer?: string
}

export const TableCards = (props: TableCardsPropsType) => {
    const [isModalAddCardOpened, setIsModalAddCardOpened] = useState(false)
    const [isModalRemoveCardOpened, setIsModalRemoveCardOpened] = useState(false)
    const [cardID, setCardID] = useState("")
    const myUserID = useSelector<AppRootStateType, string>(state => state.app.myUserID)
    const currentPackUserID = useSelector<AppRootStateType, string>(state => state.cards.currentPackUserID)
    const currentPackID = useSelector<AppRootStateType, string>(state => state.cards.currentPackID)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            cardsPack_id: currentPackID,
            question: '',
            answer: ""
        },

        onSubmit: values => {
            dispatch(createCard(values, currentPackID));
            setIsModalAddCardOpened(false)
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.question) {
                errors.question = 'Required';
            }
            if (!values.answer) {
                errors.answer = 'Required';
            }
            return errors;
        },
    })

    const openModalRemoveCard = (cardID: string) => {
        setCardID(cardID)
        setIsModalRemoveCardOpened(true)
    }
    const removeCard = () => {
        dispatch(deleteCard(cardID, currentPackID))
        setIsModalRemoveCardOpened(false)
    }

    return (

        <div className={styles.tableCardBlock}>
            {isModalAddCardOpened &&
            <Modal title={'Add card'} onClose={() => {
                setIsModalAddCardOpened(false)
            }} duration={600} showCloseBtn>
                <div className={styles.addPackBlock}>
                    <form>
                        <InputText placeholder={'Question'}
                                   type={'text-area'}
                                   {...formik.getFieldProps('question')}
                        />
                        {formik.errors.question && <div className={styles.error}>{formik.errors.question}</div>}
                        <InputText placeholder={'Answer'}
                                   type={'text'}
                                   {...formik.getFieldProps('answer')}
                        />
                        {formik.errors.answer && <div className={styles.error}>{formik.errors.answer}</div>}
                        <div className={styles.buttonBlock}>
                            <Button disabled={false} type='submit' value='submit' action={formik.handleSubmit}/>
                        </div>
                    </form>
                </div>
            </Modal>
            }
            {isModalRemoveCardOpened &&
            <Modal title={'Delete card'} onClose={() => {
                setIsModalRemoveCardOpened(false)
            }} duration={600} showCloseBtn>
                <div className={styles.deletePackBlock}>
                    <div className={styles.warnText}>This action cannon be undone.</div>
                    <button className={styles.cancelButton} onClick={() => setIsModalRemoveCardOpened(false)}>CANCEL
                    </button>
                    <button className={styles.deleteButton} onClick={removeCard}>DELETE</button>
                </div>
            </Modal>
            }
            <div className={styles.cards}>
                {props.values.map(c => <Card card={c} openModalRemoveCard={openModalRemoveCard}/>)}
            </div>
            <div>
                {myUserID === currentPackUserID &&
                <Button value={'Add new card'} action={() => setIsModalAddCardOpened(true)}/>}
            </div>

        </div>
    )
}