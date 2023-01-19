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

    board.tiles[target] = this.constructor(this.white, target)
    board.tiles[target]!.probability = 0.5

    board.tiles[target2] = this.constructor(this.white, target2)
    board.tiles[target2]!.probability = 0.5

    board.tiles[target]!.entangledPiece = board.tiles[target2]
    board.tiles[target2]!.entangledPiece = board.tiles[target]
  }

  public mergeMove(source: number, source2: number, target: number) {
    
  }

  public measure(board: Board, target: number) {
    Math.random() < 0.5 ? this.move(board, target) : this.move(board, target)
  }
}