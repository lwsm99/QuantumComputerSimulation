import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class Bishop extends Piece {
    constructor(white: boolean) {
        super(white)
    }

    public possibleMoves(board: Board, start: Spot): number[] {
        return [-9, -7, 7, 9].map(i => {
            let moves: number[] = []
            for (let j = start.pos + i; j >= 0 && j < 64 && Math.abs((j % 8) - (start.pos % 8)) === Math.abs(Math.floor(j / 8) - Math.floor(start.pos / 8)); j += i) {
                if (board.tiles[j].piece && board.tiles[j].piece?.white === this.white) break
                moves.push(j)
                if (board.tiles[j].piece && board.tiles[j].piece?.white !== this.white) break
            }
            return moves
        }).flat()
    }
}