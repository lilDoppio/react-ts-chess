import React, { FC, Fragment, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null);
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
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
            <h1>Сейчас ход {currentPlayer?.color === Colors.WHITE ? 'белых' : 'черных'}</h1>
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