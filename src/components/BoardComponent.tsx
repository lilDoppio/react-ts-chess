import React, { FC, Fragment, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import { BoardLetters } from '../models/BoardLetters';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { Move } from '../models/Move';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';
import Timer from './Timer';
import Modal from './UI/Modal/Modal';
import Button from './UI/Button/Button'

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
    restart: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer, restart}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [firstSelectedCell, setFirstSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            const move: Move = {
                from: firstSelectedCell,
                to: cell
            }
            selectedCell.moveFigure(move);
            swapPlayer()
            setSelectedCell(null);
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
                setFirstSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <Timer
                restart={restart}
                currentPlayer={currentPlayer}
            />
            <div className='board'>
                {board.cells.map((row, index) => {
                    return <Fragment key={index}>
                        {row.map(cell => {
                            return <CellComponent 
                                key={cell.id} 
                                click={click}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        })}
                    </Fragment>
                })}
            </div>
        </div>
    )
}

export default BoardComponent