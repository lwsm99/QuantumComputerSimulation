import { Piece } from "./Piece"
import { Board } from "../Board"

export class Knight extends Piece {
    constructor(white: boolean, pos: number) {
        super(white, pos)
    }

    public possibleMoves(board: Board): number[] {
        const possibleMoves = [-17, -15, -10, -6, 6, 10, 15, 17]

        // Filter out invalid positions
        return possibleMoves.filter(i => {
            const targetPos = this.pos + i
            // Check if the knight is on the board & if the target position doesn't go over the edge of the board
            return (targetPos >= 0 && targetPos < 64) && (this.pos % 8 < 6 && this.pos % 8 > 1 || this.pos % 8 > 5 && targetPos % 8 > 1 || this.pos % 8 < 2 && targetPos % 8 < 5)
            && (!board.tiles[targetPos] || (board.tiles[targetPos] && board.tiles[targetPos]!.white !== this.white))
        }).map(i => this.pos + i)
    }
}