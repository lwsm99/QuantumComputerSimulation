import { Spot } from "./Spot"
import { Pawn } from "./Pieces/Pawn"
import { Queen } from "./Pieces/Queen"
import { Knight } from "./Pieces/Knight"
import { Bishop } from "./Pieces/Bishop"
import { King } from "./Pieces/King"
import { Rook } from "./Pieces/Rook"

export class Board {
    occupation: boolean[] // Qubits that store the occupation of a tile (1 if non-zero probability)
    tiles: Spot[] // Bits that stores which piece occupies a tile

    public resetBoard(): void {
        const pieceOrder = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]
        
        // Initialize Chess Board  
        this.tiles = []
        this.occupation = []
        for (let i = 0; i < 64; i++) {
            if (i < 8) {
                this.tiles[i] = new Spot(new pieceOrder[i](false), i)
            } else if (i < 16) {
                this.tiles[i] = new Spot(new Pawn(false), i)
            } else if (i >= 56) {
                this.tiles[i] = new Spot(new pieceOrder[i - 56](true), i)
            } else if (i >= 48) {
                this.tiles[i] = new Spot(new Pawn(true), i)
            } else {
                this.tiles[i] = new Spot(null, i)
            }
            this.occupation.push(false)
        }
    }

    toString(): string {
        let boardString = ""
        for (let i = 0; i < 64; i++) {
            if (this.tiles[i].piece) {
                const piece = this.tiles[i].piece?.constructor.name === "Knight" ? this.tiles[i].piece?.constructor.name.charAt(1) : this.tiles[i].piece?.constructor.name.charAt(0)
                boardString += this.tiles[i].piece?.white ? piece?.toUpperCase() : piece?.toLowerCase()
            } else {
                boardString += "_"
            }
            if ((i + 1) % 8 === 0) {
                boardString += "\n"
            }
        }
        return boardString
    }
}

const board = new Board()
board.resetBoard()
console.log(board.toString())
console.log('White King Movement: ' + board.tiles[60].piece?.possibleMoves(board, board.tiles[60]))
console.log('White left Rook Movement: ' + board.tiles[56].piece?.possibleMoves(board, board.tiles[56]))
console.log('White right Rook Movement: ' + board.tiles[63].piece?.possibleMoves(board, board.tiles[63]))