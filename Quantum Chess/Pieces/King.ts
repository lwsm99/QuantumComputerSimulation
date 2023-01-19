import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class King extends Piece {
    // public castlingDone: boolean = false

    constructor(white: boolean, pos: number) {
        super(white, pos)
    }

    public possibleMoves(board: Board): number[] {
        const possibleMoves = [-9, -8, -7, -1, 1, 7, 8, 9]

        // [TODO]: Add castling
        // Filter out invalid positions
        return possibleMoves.filter(i => {
            const targetPos = this.pos + i
            return (targetPos >= 0 && targetPos < 64) && (this.pos % 8 < 7 && this.pos % 8 > 0 || this.pos % 8 === 7 && targetPos % 8 !== 0 || this.pos % 8 === 0 && targetPos % 8 !== 7) 
            && (!board.tiles[targetPos] || (board.tiles[targetPos] && board.tiles[targetPos]!.white !== this.white))
        }).map(i => this.pos + i)
    }
}