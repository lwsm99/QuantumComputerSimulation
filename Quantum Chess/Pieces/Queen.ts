import { Piece } from "./Piece"
import { Board } from "../Board"

export class Queen extends Piece {
    constructor(white: boolean, pos: number) {
        super(white, pos)
    }

    public possibleMoves(board: Board): number[] {
        return [-9, -8, -7, -1, 1, 7, 8, 9].map(i => {
            let moves: number[] = []
            let pos = this.pos
            for (let j = pos + i; (j >= 0 && j < 64) && (j % 8 === pos % 8 || Math.floor(j / 8) === Math.floor(pos / 8) || Math.abs((j % 8) - (pos % 8)) === Math.abs(Math.floor(j / 8) - Math.floor(pos / 8))); j += i) {
                if (j % 8 === pos % 8 || Math.floor(j / 8) === Math.floor(pos / 8) || Math.abs((j % 8) - (pos % 8)) === Math.abs(Math.floor(j / 8) - Math.floor(pos / 8))) {
                    if (board.tiles[j] && board.tiles[j]!.white === this.white) break
                    moves.push(j)
                    if (board.tiles[j] && board.tiles[j]!.white !== this.white) break
                }
            }
            return moves
        }).flat()
    }
}