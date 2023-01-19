import { Piece } from "./Piece"
import { Board } from "../Board"

export class Rook extends Piece {
    constructor(white: boolean, pos: number) {
        super(white, pos)
    }

    public possibleMoves(board: Board): number[] {
        return [-1, 1, -8, 8].map(i => {
            let moves: number[] = []
            for (let j = this.pos + i; j >= 0 && j < 64 && (j % 8 === this.pos % 8 || Math.floor(j / 8) === Math.floor(this.pos / 8)); j += i) {
                if (j % 8 === this.pos % 8 || Math.floor(j / 8) === Math.floor(this.pos / 8)) {
                    if (board.tiles[j] && board.tiles[j]!.white === this.white) break
                    moves.push(j)
                    if (board.tiles[j] && board.tiles[j]!.white !== this.white) break
                }
            }
            return moves
        }).flat()
    }
}