import { Piece } from "./Piece"
import { Spot } from "../Spot"
import { Board } from "../Board"
import { Rook } from "./Rook"

class King extends Piece {
    public castlingDone: boolean = false

    constructor(white: boolean) {
        super(white);
    }

    public canMove(board: Board, start: Spot, end: Spot): boolean {
        const x = Math.abs(start.x - end.x)
        const y = Math.abs(start.y - end.y)

        return end.piece.white !== this.white && (x * y === 1 || this.isValidCastling(board, start, end))
    }
    
    // Check if castling is valid
    public isValidCastling(board: Board, start: Spot, end: Spot): boolean {
        return !this.castlingDone && this.isCastlingMove(start, end) && this.isCastlingPathClear(board, start, end) && this.isCastlingRookAvailable(board, start, end)
    }

    // Check if the starting and ending position are correct
    public isCastlingMove(start: Spot, end: Spot): boolean {
        return (start.x === 4 && start.y === 0 && end.x === 6 && end.y === 0) || (start.x === 4 && start.y === 7 && end.x === 6 && end.y === 7) || (start.x === 4 && start.y === 0 && end.x === 2 && end.y === 0) || (start.x === 4 && start.y === 7 && end.x === 2 && end.y === 7)
    }

    // Check if the path between the king and the rook is clear
    public isCastlingPathClear(board: Board, start: Spot, end: Spot): boolean {
        if (start.x < end.x) {
            // King side castling
            for (let i = start.x + 1; i < end.x; i++) {
                if (board.tiles[i][start.y].piece !== null) {
                    return false
                }
            }
        } else {
            // Queen side castling
            for (let i = start.x - 1; i > end.x; i--) {
                if (board.tiles[i][start.y].piece !== null) {
                    return false
                }
            }
        }
        return true
    }

    // Check if the rook is available for castling
    public isCastlingRookAvailable(board: Board, start: Spot, end: Spot): boolean {
        return (start.x < end.x && board.tiles[7][start.y].piece instanceof Rook) || (start.x > end.x && board.tiles[0][start.y].piece instanceof Rook)
    }
}