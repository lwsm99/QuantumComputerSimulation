import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"

export class Rook extends Piece {
    constructor(white: boolean) {
        super(white)
    }

    possibleMoves(board: Board, start: Spot): number[] {
        const horizontalMoves = [-1, 1].map(i => {
            let possibleMoves: number[] = []
            for (let j = start.pos + i; j % 8 !== start.pos % 8; j += i) {
                possibleMoves.push(j)
            }
            return possibleMoves
        })
    
        const verticalMoves = [-8, 8].map(i => {
            let possibleMoves: number[] = []
            for (let j = start.pos + i; j >= 0 && j < 64; j += i) {
                possibleMoves.push(j)
            }
            return possibleMoves
        })
    
        const flatten = (arr) => arr.reduce((acc, val) => acc.concat(val), [])
        return flatten(horizontalMoves.concat(verticalMoves)).filter(pos => pos >= 0 && pos < 64 && 
            (!board.tiles[pos].piece || (board.tiles[pos].piece && board.tiles[pos].piece?.white !== this.white)))
    }
}