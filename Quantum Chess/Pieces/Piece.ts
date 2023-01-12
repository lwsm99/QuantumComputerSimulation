import { Board } from "../Board"
import { Spot } from "../Spot"

export abstract class Piece {
  public white: boolean
  public alive: boolean = true

  constructor(white: boolean) {
    this.white = white
  }

  public abstract possibleMoves(board: Board, start: Spot): number[]

  public jump(board: Board, source: number, target: number) {
    
  }

  public slide(board: Board, source: number, target: number) {
    const path: number = 0
  }

  public splitJump(board: Board, source: number, target: number, target2: number) {

  }

  public splitSlide(board: Board, source: number, target: number, target2: number) {
    const path: number = 0
    const path2: number = 0

  }

  public mergeJump(board: Board, source: number, source2: number, target: number) {

  }

  public mergeSlide(board: Board, source: number, source2: number, target: number) {
    const path: number = 0
    const path2: number = 0
  }
}