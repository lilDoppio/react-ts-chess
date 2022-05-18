import { Cell } from "./Cell";

export interface Move {
    from: Cell | null;
    to: Cell;
}