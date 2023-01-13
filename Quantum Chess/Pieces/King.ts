import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class King extends Piece {
    // public castlingDone: boolean = false

    constructor(white: boolean) {
        super(white)
    }

    public possibleMoves(board: Board, start: Spot): number[] {
        const possibleMoves = [-9, -8, -7, -1, 1, 7, 8, 9]

        // [TODO]: Add castling
        // Filter out invalid positions
        return possibleMoves.filter(i => {
            const targetPos = start.pos + i
            return (targetPos >= 0 && targetPos < 64) && (targetPos % 8 !== 7 && targetPos % 8 !== 0) 
            && (!board.tiles[targetPos].piece || (board.tiles[targetPos].piece && board.tiles[targetPos].piece?.white !== this.white))
        }).map(i => start.pos + i)
    }
}