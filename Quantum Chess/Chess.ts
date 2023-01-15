import { Board } from "./Board"

export class Chess {
    public board: Board
    public whiteTurn: boolean = true
    public gameOver: boolean = false

    constructor() {
        this.board = new Board()
        this.board.resetBoard()
    }

    public resetGame() {
        this.board.resetBoard()
        this.whiteTurn = true
        this.gameOver = false
    }

    public getMoves(source: number): number[] {
        return this.board.tiles[source].piece?.possibleMoves(this.board, this.board.tiles[source]) || []
    }

    public move(source: number, target: number) {
        // Check if move is possible
        if (!this.getMoves(source).includes(target)) {
            return
        }

        // Check if it is the right player's turn
        if (this.whiteTurn !== this.board.tiles[source].piece?.white) {
            return
        }

        // Check if the game is over
        if (this.board.tiles[target].piece?.constructor.name === "King") {
            this.gameOver = true
        }

        this.board.tiles[source].piece?.move(this.board.tiles[source], this.board.tiles[target])
        this.whiteTurn = !this.whiteTurn
    }

    public testGame() {
        console.log(this.board.toString())
        console.log('White left Rook Movement: ' + this.getMoves(56))
        console.log('White left Knight Movement: ' + this.getMoves(57))
        console.log('White left Bishop Movement: ' + this.getMoves(58))
        console.log('White Queen Movement: ' + this.getMoves(59))
        console.log('White King Movement: ' + this.getMoves(60))
        console.log('White right Bishop Movement: ' + this.getMoves(61))
        console.log('White right Knight Movement: ' + this.getMoves(62))
        console.log('White right Rook Movement: ' + this.getMoves(63))
        console.log('Black Pawn Movement: ' + this.getMoves(48))

        this.move(48, 40)
        console.log(this.board.toString())
        console.log('White King Movement: ' + this.getMoves(60))
    }
}