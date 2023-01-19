import { Piece } from "./Piece"
import { Board } from "../Board"

export class Pawn extends Piece {
    constructor(white: boolean, pos: number) {
        super(white, pos)
    }

    public possibleMoves(board: Board): number[] {
        const direction = this.white ? -1 : 1
        const firstMove = this.white ? this.pos >= 48 && this.pos < 56 : this.pos >= 8 && this.pos < 16

        // Forward moves
        let moves = [this.pos + (8 * direction)]
        if (firstMove) moves.push(this.pos + (8 * direction) + (8 * direction))

        moves = moves.filter(i => i >= 0 && i < 64 && !board.tiles[i])

        // Attack moves
        const attackMoves = [this.pos + (7 * direction), this.pos + (9 * direction)].filter(i => i >= 0 && i < 64 && board.tiles[i] && board.tiles[i]!.white !== this.white)

        return [...moves, ...attackMoves]
    }
}