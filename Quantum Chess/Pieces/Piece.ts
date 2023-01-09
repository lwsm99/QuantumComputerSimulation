import { Board } from "../Board"
import { Spot } from "../Spot"

export abstract class Piece {
  public white: boolean
  public alive: boolean = true

  constructor(white: boolean) {
    this.white = white
  }
  
  public abstract canMove(board: Board, start: Spot, end: Spot): boolean
}