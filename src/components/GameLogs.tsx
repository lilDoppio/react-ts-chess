import React, { FC } from 'react'
import { Board } from '../models/Board'
import { BoardLetters } from '../models/BoardLetters';

interface GameLogsProps {
    board: Board;
}

const GameLogs: FC<GameLogsProps> = ({board}) => {
    return (
        <div className={['info', 'gameLogs'].join(' ')}>
            <h3>info</h3>
            {board.gameLogs.map(move => {
                return <h2 key={`${move.from?.x}${move.from?.y}${move.to.y}${move.to?.x}`}>
                    {(move.from?.x || move.from?.x === 0) && BoardLetters[move.from?.x]}
                    {move.from?.y && 8 - move.from?.y}
                     - 
                    {(move.to?.x || move.to?.x === 0) && BoardLetters[move.to?.x]}
                    {8 - move.to.y}
                </h2>
            })}
        </div>
    )
}

export default GameLogs