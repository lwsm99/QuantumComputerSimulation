import { Board } from "../Board"
import { Spot } from "../Spot"

export abstract class Piece {
  public white: boolean
  public alive: boolean = true

  constructor(white: boolean) {
    this.white = white
  }
  
  public abstract canMove(board: Board, start: Spot, end: Spot): boolean

  public jump(source: number, target: number) {
    
  }

  public slide(source: number, target: number) {
    const path: number = 0
  }

  public splitJump(source: number, target: number, target2: number) {

  }

  public splitSlide(source: number, target: number, target2: number) {
    const path: number = 0
    const path2: number = 0

  }

  public mergeJump(source: number, source2: number, target: number) {

  }

  public mergeSlide(source: number, source2: number, target: number) {
    const path: number = 0
    const path2: number = 0
  }
}