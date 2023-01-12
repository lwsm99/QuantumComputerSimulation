import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"
import { Rook } from "./Rook"

export class King extends Piece {
    public castlingDone: boolean = false

    constructor(white: boolean) {
        super(white);
    }

    public availableMoves(board: Board) {
        
    }

    public canMove(board: Board, start: Spot, end: Spot): boolean {
        return end.piece.white !== this.white && (Math.abs(start.pos - end.pos) === 1 || this.isValidCastling(board, start, end))
    }
    
    // Check if castling is valid
    public isValidCastling(board: Board, start: Spot, end: Spot): boolean {
        return !this.castlingDone && this.isCastlingMove(start, end) && this.isCastlingPathClear(board, start, end) && this.isCastlingRookAvailable(board, start, end)
    }

    // Check if the starting and ending position are correct
    public isCastlingMove(start: Spot, end: Spot): boolean {
        return (start.pos === 4 && end.pos === 6) || (start.pos === 4 && end.pos === 2) || (start.pos === 60 && end.pos === 62) || (start.pos === 60 && end.pos === 58)
    }

    // Check if the path between the king and the rook is clear
    public isCastlingPathClear(board: Board, start: Spot, end: Spot): boolean {
        if (start.pos < end.pos) {
            // King side castling
            for (let i = start.pos + 1; i < end.pos; i++) {
                if (board.tiles[i].piece !== null) {
                    return false
                }
            }
        } else {
            // Queen side castling
            for (let i = start.pos - 1; i > end.pos; i--) {
                if (board.tiles[i].piece !== null) {
                    return false
                }
            }
        }
        return true
    }

    // Check if the rook is available for castling
    public isCastlingRookAvailable(board: Board, start: Spot, end: Spot): boolean {
        return (start.pos < end.pos && board.tiles[7].piece instanceof Rook) || (start.pos > end.pos && board.tiles[0].piece instanceof Rook)
    }
}