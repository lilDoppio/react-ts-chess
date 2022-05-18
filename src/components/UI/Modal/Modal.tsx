import React, { FC, ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
    children: ReactNode;
    active: boolean;
    setActive: () => void;
}

const Modal: FC<ModalProps> = ({children, active, setActive}) => {
    return (
        <div 
            className={active ? [styles.modalActive, styles.modal].join(' ') : styles.modal}
            onClick={setActive}
        >
            <div 
                className={styles.content}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal