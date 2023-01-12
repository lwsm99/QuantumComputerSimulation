import { Piece } from "./Pieces/Piece"

export class Spot {
    public piece: Piece
    public pos: number
  
    constructor(piece: Piece, pos: number) {
        this.piece = piece
        this.pos = pos
    }
}