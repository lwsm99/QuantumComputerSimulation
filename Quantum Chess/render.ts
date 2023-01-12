import { Board } from "./Board.js"

const board = new Board()
board.resetBoard()

const chessboard = document.getElementById("chessboard") as HTMLElement

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const tile = document.createElement("div")
        tile.classList.add("tile")
        if((i+j) % 2 === 0) tile.classList.add("white")
        else tile.classList.add("black")

        // Append the chess piece to the tile if the spot is occupied
        const spot = board.tiles[i*8+j]
        console.log(spot.piece)
        if(spot.piece){
            const piece = document.createElement("img")
            const color = spot.piece.white ? "white" : "black"
            // piece.src = `./images/${spot.piece.constructor.name}_${color}.png`
            piece.src = './images/Pawn_white.png'
            tile.appendChild(piece)
        }
        chessboard?.appendChild(tile)
    }
}