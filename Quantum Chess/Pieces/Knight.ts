import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class Knight extends Piece {
    constructor(white: boolean) {
        super(white);
    }

    public possibleMoves(board: Board, start: Spot): number[] {
        const possibleMoves = []

        return possibleMoves
    }
}