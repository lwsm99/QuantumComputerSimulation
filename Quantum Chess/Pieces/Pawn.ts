import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class Pawn extends Piece {
    constructor(white: boolean) {
        super(white);
    }

    public possibleMoves(board: Board, start: Spot): number[] {
        const possibleMoves = []

        return possibleMoves
    }
}