import React, { FC } from 'react'
import { Cell } from '../models/Cell';

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div
            className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
            onClick={() => click(cell)}
        >
            {cell.available && cell.figure && <div className="enemyFigures"/> }
            {selected && <div className={'choosenFigure'}/>}
            {cell.available && !cell.figure && <div className="availed"/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt='figure'/>}
        </div>
    )
}

export default CellComponent