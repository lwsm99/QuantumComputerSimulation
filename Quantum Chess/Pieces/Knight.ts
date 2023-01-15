import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class Knight extends Piece {
    constructor(white: boolean) {
        super(white)
    }

    public possibleMoves(board: Board, start: Spot): number[] {
        const possibleMoves = [-17, -15, -10, -6, 6, 10, 15, 17]

        // Filter out invalid positions
        return possibleMoves.filter(i => {
            const targetPos = start.pos + i
            // Check if the knight is on the board & if the target position doesn't go over the edge of the board
            return (targetPos >= 0 && targetPos < 64) && (start.pos % 8 < 6 && start.pos % 8 > 1 || start.pos % 8 > 5 && targetPos % 8 > 1 || start.pos % 8 < 2 && targetPos % 8 < 5)
            && (!board.tiles[targetPos].piece || (board.tiles[targetPos].piece && board.tiles[targetPos].piece?.white !== this.white))
        }).map(i => start.pos + i)
    }
}