import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    isKingUnderAttack(target: Cell): number {
        if(this.cell.isEmptyVertical(target))
            if (target.figure?.name === FigureNames.QUEEN 
            || target.figure?.name === FigureNames.ROOK)
                return 1
        if(this.cell.isEmptyHorizontal(target))
            if (target.figure?.name === FigureNames.QUEEN 
            || target.figure?.name === FigureNames.ROOK)
                return 2
        if(this.cell.isEmptyDiagonal(target))
            if (target.figure?.name === FigureNames.QUEEN 
            || target.figure?.name === FigureNames.BISHOP
            || target.figure?.name === FigureNames.PAWN)
                return 3
        return 0
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return (dx < 2 && dy < 2)
    }
}