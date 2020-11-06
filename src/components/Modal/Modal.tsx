import React, { useEffect, useRef, FC, ReactNode } from 'react';
import styles from "./Modal.module.css"

interface ModalProps {
    title: string;
    children: ReactNode;
    onClose: () => void;
    duration?: number;
    showCloseBtn?: boolean;
}

export const Modal: FC<ModalProps> = ({ title, children, onClose, duration = 300, showCloseBtn }) => {
    const modal = useRef<HTMLDivElement>(null);
    const modalBg = useRef<HTMLDivElement>(null);
    const modalContent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if(modal.current) {
            modal.current.classList.add('disable-click');
        }
        if(modalBg.current) {
            modalBg.current.style.transitionDuration = duration + 'ms';
        }
        if(modalContent.current) {
            modalContent.current.style.transitionDuration = duration + 'ms';
        }

        setTimeout(() => {
            if(modalBg.current) {
                modalBg.current.style.opacity = 0.2 + '';
            }
            if(modalContent.current) {
                modalContent.current.style.opacity = 1 + '';
                modalContent.current.style.top = 0 + '';
            }
        }, 20);

        setTimeout(() => {
            if(modal.current) {
                modal.current.classList.remove('disable-click');
            }
        }, duration + 20);

        return () => {
            document.body.style.overflow = 'visible';
        }
    }, [duration]);

    const modalCloseHandler = () => {
        if(modal.current) {
            modal.current.classList.add('disable-click');
        }
        if(modalBg.current) {
            modalBg.current.style.opacity = 0 + '';
        }
        if(modalContent.current) {
            modalContent.current.style.opacity = 0 + '';
            modalContent.current.style.top = '-100px';
        }

        setTimeout(() => {
            if(modal.current) {
                modal.current.classList.remove('disable-click');
            }
            onClose();
        }, duration);
    }

    return(
        <div className={styles.modal} ref={modal}>
            <div className={styles.modal_bg} onClick={modalCloseHandler} ref={modalBg}></div>
            <div className={styles.modal_inner} ref={modalContent}>
                <div className={styles.modal_head}>
                    <h2>{title}</h2>
                    {showCloseBtn && <button className={styles.btn} onClick={modalCloseHandler}>&times;</button>}
                </div>
                <div className={styles.modal_body}>
                    {children}
                </div>
                <div className={styles.modal_foot}>
                    {/*<button  onClick={modalCloseHandler}>Close</button>*/}
                </div>
            </div>
        </div>
    );
}
