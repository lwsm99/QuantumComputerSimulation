import { Piece } from "./Pieces/Piece"
import { Pawn } from "./Pieces/Pawn"
import { Queen } from "./Pieces/Queen"
import { Knight } from "./Pieces/Knight"
import { Bishop } from "./Pieces/Bishop"
import { King } from "./Pieces/King"
import { Rook } from "./Pieces/Rook"

export class Board {
    tiles: (Piece | null)[] // Bits that stores which piece occupies a tile

    public resetBoard(): void {
        const pieceOrder = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]
        
        // Initialize Chess Board  
        this.tiles = []
        for (let i = 0; i < 64; i++) {
            if (i < 8) {
                this.tiles[i] = new pieceOrder[i](false, i)
            } else if (i < 16) {
                this.tiles[i] = new Pawn(false, i)
            } else if (i >= 56) {
                this.tiles[i] = new pieceOrder[i - 56](true, i)
            } else if (i >= 48) {
                this.tiles[i] = new Pawn(true, i)
            } else {
                this.tiles[i] = null
            }
        }
    }

    toString(): string {
        let boardString = ""
        for (let i = 0; i < 64; i++) {
            if (this.tiles[i]) {
                const piece = this.tiles[i]?.constructor.name === "Knight" ? this.tiles[i]?.constructor.name.charAt(1) : this.tiles[i]?.constructor.name.charAt(0)
                boardString += this.tiles[i]?.white ? piece?.toUpperCase() : piece?.toLowerCase()
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