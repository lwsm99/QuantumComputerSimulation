import { Board } from "./Board"


const board = new Board()
board.resetBoard()
console.log(board.toString())
console.log('White left Rook Movement: ' + board.tiles[56].piece?.possibleMoves(board, board.tiles[56]))
console.log('White left Knight Movement: ' + board.tiles[57].piece?.possibleMoves(board, board.tiles[57]))
console.log('White left Bishop Movement: ' + board.tiles[58].piece?.possibleMoves(board, board.tiles[58]))
console.log('White Queen Movement: ' + board.tiles[59].piece?.possibleMoves(board, board.tiles[59]))
console.log('White King Movement: ' + board.tiles[60].piece?.possibleMoves(board, board.tiles[60]))
console.log('White right Bishop Movement: ' + board.tiles[61].piece?.possibleMoves(board, board.tiles[61]))
console.log('White right Knight Movement: ' + board.tiles[62].piece?.possibleMoves(board, board.tiles[62]))
console.log('White right Rook Movement: ' + board.tiles[63].piece?.possibleMoves(board, board.tiles[63]))
console.log('Black Pawn Movement: ' + board.tiles[11].piece?.possibleMoves(board, board.tiles[11]))
console.log('Black Pawn Movement: ' + board.tiles[8].piece?.possibleMoves(board, board.tiles[8]))

board.tiles[52].piece?.move(board, 52, 36)
console.log(board.toString())
console.log('White King Movement: ' + board.tiles[60].piece?.possibleMoves(board, board.tiles[60]))