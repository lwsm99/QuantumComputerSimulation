import { Board } from "../Board"

export abstract class Piece {
  public white: boolean
  public pos: number
  public probability: number = 1
  public entangledPiece: Piece | null = null

  constructor(white: boolean, pos: number) {
    this.white = white
    this.pos = pos
  }

  public abstract possibleMoves(board: Board): number[]

  public move(board: Board, target: number) {
    board.tiles[this.pos] = null
    board.tiles[target] = this
    this.pos = target
  }

  public splitMove(board: Board, target: number, target2: number) {
    board.tiles[this.pos] = null

    board.tiles[target] = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
    board.tiles[target]!.pos = target
    board.tiles[target]!.probability = 0.5

    board.tiles[target2] = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
    board.tiles[target2]!.pos = target2
    board.tiles[target2]!.probability = 0.5

    board.tiles[target]!.entangledPiece = board.tiles[target2]
    board.tiles[target2]!.entangledPiece = board.tiles[target]
  }

  public mergeMove(board: Board, source2: number, target: number) {
    board.tiles[this.pos] = null
    board.tiles[source2] = null

    this.pos = target
    this.probability = 1
    this.entangledPiece = null
    
    board.tiles[target] = this
  }

  // Perform measurement on a split piece
  public measure(board: Board) {
    if (Math.random() < 0.5) { // REMOVE ENTANGLED PIECE
      // Only remove entangled piece if it's still on the board
      if (board.tiles[this.entangledPiece!.pos] === this.entangledPiece) board.tiles[this.entangledPiece!.pos] = null

      this.probability = 1
      this.entangledPiece = null
    } else { // MERGE CURRENT PIECE INTO ENTANGLED PIECE
      board.tiles[this.pos] = null
      this.entangledPiece!.probability = 1
      this.entangledPiece!.entangledPiece = null
    }
  }
}