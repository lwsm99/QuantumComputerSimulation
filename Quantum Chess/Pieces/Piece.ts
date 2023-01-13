import { Board } from "../Board"
import { Spot } from "../Spot"

export abstract class Piece {
  public white: boolean

  constructor(white: boolean) {
    this.white = white
  }

  public abstract possibleMoves(board: Board, start: Spot): number[]

  public move(board: Board, source: number, target: number) {
    const piece = board.tiles[source].piece
    board.tiles[source].piece = null
    board.tiles[target].piece = piece
  }

  public splitMove(board: Board, source: number, target: number, target2: number) {
    const piece = board.tiles[source].piece
    board.tiles[source].piece = null
    board.tiles[target].piece = piece
    board.tiles[target2].piece = piece
  }

  public mergeMove(board: Board, source: number, source2: number, target: number) {
    const piece = board.tiles[source].piece
    board.tiles[source].piece = null
    board.tiles[source2].piece = null
    board.tiles[target].piece = piece
  }
}