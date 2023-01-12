import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class Bishop extends Piece {
    constructor(white: boolean) {
        super(white);
    }

    public canMove(board: Board, start: Spot, end: Spot): boolean {
        return true
    }
}