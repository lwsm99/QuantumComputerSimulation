import { Spot } from "./Spot"

export class Board {
    occupation: boolean[][] // Qubits that store the occupation of a tile (1 if non-zero probability)
    tiles: Spot[][] // Bits that stores which piece occupies a tile
}