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

    // Returns an array of possible moves for a piece
    public getMoves(source: number): number[] {
        return this.board.tiles[source]!.possibleMoves(this.board) || []
    }

    // Moves a piece to a position, if target2 is defined, it will perform a split move
    public move(source: number, target: number, target2?: number) {
        // Check if it is the right player's turn
        if (this.whiteTurn !== this.board.tiles[source]?.white) {
            return
        }

        // Check if move is possible
        if (!this.getMoves(source).includes(target) || (target2 && !this.getMoves(source).includes(target2))) {
            return
        }

        if (target2) {
            // SPLIT MOVE
            // A split move is a move where a piece splits into two pieces, split moves can't capture

            // Check if there's a piece on target or target2
            if (this.board.tiles[target] || this.board.tiles[target2]) {
                return
            }

            // Check if the piece is already split
            if (this.board.tiles[source]?.probability === 0.5) {
                return
            }

            this.board.tiles[source]?.splitMove(this.board, target, target2)
        } else {
            // BASIC MOVE
            // Basic chess move

            // Check if the game is over
            if (this.board.tiles[target]?.constructor.name === "King") {
                this.gameOver = true
            }

            // Measure current piece if it's a split piece
            if (this.board.tiles[source]?.probability === 0.5) {
                this.board.tiles[source]?.measure(this.board)
            }

            // Measure target piece if it's a split piece
            if (this.board.tiles[target]?.probability === 0.5) {
                console.log('Measure')
                this.board.tiles[target]?.measure(this.board)
            }

            this.board.tiles[source]?.move(this.board, target)
        }
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

        this.move(51, 43, 35)
        console.log(this.board.toString())
        this.move(12, 28)
        console.log(this.board.toString())
        this.move(50, 42)
        console.log(this.board.toString())
        this.move(28, 35)
        console.log(this.board.toString())
    }
}

// Test Game
// const chess = new Chess()
// chess.testGame() 