import { Board } from "../Board"
import { Spot } from "../Spot"

export abstract class Piece {
  public white: boolean

  constructor(white: boolean) {
    this.white = white
  }

  public abstract possibleMoves(board: Board, start: Spot): number[]

  public move(source: Spot, target: Spot) {
    const piece = source.piece
    source.piece = null
    target.piece = piece
  }

  public splitMove(source: Spot, target: Spot, target2: Spot) {
    const piece = source.piece
    source.piece = null
    target.piece = piece
    target2.piece = piece
  }

  public mergeMove(source: Spot, source2: Spot, target: Spot) {
    const piece = source.piece
    source.piece = null
    source2.piece = null
    target.piece = piece
  }
}