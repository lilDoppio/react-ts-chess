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

    // isKingUnderAttack(target: Cell): boolean {
    //     if(this.cell.isEmptyDiagonal(target)) {
    //         if(target.figure?.name === FigureNames.QUEEN) {
    //             console.log('ATTACK')
    //         }
    //         return true
    //     }
    //     return true
    // }

    setKingPosition(target: Cell) {
        this.cell.board.blackKingPosotion(target)
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        this.setKingPosition(target)

        return (dx < 2 && dy < 2)
    }
}