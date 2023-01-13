import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class Pawn extends Piece {
    firstMove: boolean = true

    constructor(white: boolean) {
        super(white)
    }

    public possibleMoves(board: Board, start: Spot): number[] {
        const direction = this.white ? -1 : 1

        // Forward moves
        let moves = [start.pos + (8 * direction)]
        if (this.firstMove) moves.push(start.pos + (8 * direction) + (8 * direction))

        moves = moves.filter(i => i >= 0 && i < 64 && !board.tiles[i].piece)
        if(!moves.length) this.firstMove = false

        // Attack moves
        const attackMoves = [start.pos + (7 * direction), start.pos + (9 * direction)].filter(i => i >= 0 && i < 64 && board.tiles[i].piece && board.tiles[i].piece?.white !== this.white)

        return [...moves, ...attackMoves]
    }
}