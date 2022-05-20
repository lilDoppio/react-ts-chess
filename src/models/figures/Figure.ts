import { Colors } from "../Colors";
import logo from '../../assets/black-king.png'
import { Cell } from "../Cell";
import { resolveModuleName } from "typescript";

export enum FigureNames {
    FIGURE = "Фигруа",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон",
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random()
    }

    isKingUnderAttack() {
        this.cell.board.cells.map(row => {
            row.find((curCell: Cell): boolean => curCell.figure?.name === FigureNames.KING)
        })
    }

    kingUnderAttack(kingPos: Cell, target: Cell): boolean {
        if(kingPos.isEmptyDiagonal(target)) {
            if(target.figure?.name === FigureNames.QUEEN) {
                console.log('ATTACK')
            }
            return true
        }
        return true
    }

    canMove(target: Cell) : boolean {
        // const kingPos = this.cell.board.cells.map(row => {
        //     row.find((curCell: Cell): boolean => curCell.figure?.name === FigureNames.KING)
        // })
        this.kingUnderAttack(this.cell.board.blackKing, target)
        if (target.figure?.color === this.color) 
            return false
        if (target.figure?.name === FigureNames.KING) 
            return false
        return true
    }

    moveFigure(target: Cell) {
        
    }
}