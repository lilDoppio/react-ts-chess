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
    const [blackTimer, setBlackTimer] = useState(300)
    const [whiteTimer, setWhiteTimer] = useState(300)
    const [modalActive, setModalActive] = useState(false) 
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    const [isRunGame, setIsRunGame] = useState(false)

    useEffect(() => {
        startTimer()
    }, [currentPlayer, isRunGame])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current) 
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        if (isRunGame) {
            timer.current = setInterval(callback, 1000)
        }
    }

    function setModal() {
        setModalActive(false)
        handleRunGame()
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
        setModalActive(false)
        restart()
    }

    const handleRunGame = () => {
        setIsRunGame(!isRunGame)
        setModalActive(true)
        startTimer()
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
            {!isRunGame && 
                <Modal active={modalActive} setActive={setModal}>
                    <h1>Игра на паузе!</h1>
                </Modal>}
            <h1 className={styles.h1}>СЕЙЧАС ХОДЯТ {currentPlayer?.color === Colors.WHITE ? 'БЕЛЫЕ' : 'ЧЕРНЫЕ'}</h1>
            <div className={styles.btnHolder}>
                <Button onClick={handleRunGame}>{isRunGame ? 'STOP' : 'START'}</Button>
                <Button onClick={handleRestart}>RESTART</Button>
            </div>
            <div className={styles.timerHolder}>
                <h2>Белые - {whiteTimer}</h2>
                <h2>Черные - {blackTimer}</h2>
                {/* <span className={styles.span}>Белые - 
                    <input 
                        className={styles.input}
                        type="text" 
                        value={whiteTimer}
                        // onChange={}
                    />
                </span>
                <span className={styles.span}>Черные - 
                    <input 
                        className={styles.input}
                        type="text" 
                        value={whiteTimer}
                        // onChange={}
                    />
                </span> */}
            </div>
        </div>
    )
}

export default Timer