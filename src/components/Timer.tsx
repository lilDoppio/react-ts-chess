import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player'
import Button from './UI/Button/Button';
import styles from '../styles/Timer.module.css'
import Modal from './UI/Modal/Modal';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTimer, setBlackTimer] = useState(3)
    const [whiteTimer, setWhiteTimer] = useState(3)
    const [modalActive, setModalActive] = useState<boolean>(false) 
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current) 
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function setModal() {
        setModalActive(false)
        handleRestart()
    }

    function decrementBlackTimer() {
        setBlackTimer((prev): number => {
            if (prev === 0) {
                setModalActive(true)
                return prev
            }
            return prev - 1
        })
    }

    function decrementWhiteTimer() {
        setWhiteTimer((prev): number => {
            if (prev === 0) {
                setModalActive(true)
                return prev
            }
            return prev - 1
        })
    }

    const handleRestart = () => {
        setWhiteTimer(300)
        setBlackTimer(300)
        restart()
    }

    return (
        <div>
            {whiteTimer === 0 && 
                <Modal active={modalActive} setActive={setModal}>
                    <h1>Победа черных!</h1>
                </Modal>}
            {blackTimer === 0 && 
                <Modal active={modalActive} setActive={setModal}>
                    <h1>Победа белых!</h1>
                </Modal>}
            <h1 className={styles.h1}>СЕЙЧАС ХОДЯТ {currentPlayer?.color === Colors.WHITE ? 'БЕЛЫЕ' : 'ЧЕРНЫЕ'}</h1>
            <div className={styles.timerHolder}>
                <h2>Белые - {whiteTimer}</h2>
                <Button onClick={handleRestart}>RESTART</Button>
                <h2>Черные - {blackTimer}</h2>
            </div>
        </div>
    )
}

export default Timer