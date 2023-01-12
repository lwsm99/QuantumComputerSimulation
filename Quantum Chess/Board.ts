import { Spot } from "./Spot"
import { King } from "./Pieces/King"
import { Rook } from "./Pieces/Rook"

export class Board {
    occupation: boolean[] // Qubits that store the occupation of a tile (1 if non-zero probability)
    tiles: Spot[] // Bits that stores which piece occupies a tile

    public resetBoard() {
        const pieceOrder = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]
    
        this.tiles = this.tiles.map((_, index) => {
            if (index < 8) {
                return new Spot(new pieceOrder[index](true), index)
            } else if (index < 16) {
                return new Spot(new Pawn(true), index)
            } else if (index >= 48) {
                return new Spot(new pieceOrder[index - 48](false), index)
            } else if (index >= 40) {
                return new Spot(new Pawn(false), index)
            } else {
                return new Spot(null, index)
            }
        });
    }
}