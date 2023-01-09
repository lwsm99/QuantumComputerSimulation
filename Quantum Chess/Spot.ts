import { Piece } from "./Pieces/Piece"

export class Spot {
    public piece: Piece
    public x: number
    public y: number
  
    constructor(x: number, y: number, piece: Piece) {
        this.piece = piece
        this.x = x
        this.y = y
    }
}