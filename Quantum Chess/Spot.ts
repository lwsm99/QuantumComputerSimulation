import { Piece } from "./Pieces/Piece"

export class Spot {
    public piece: Piece | null
    public pos: number
  
    constructor(piece: Piece | null, pos: number) {
        this.piece = piece
        this.pos = pos
    }
}