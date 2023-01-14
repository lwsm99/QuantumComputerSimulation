<template>
  <div class="chessboard">
    <table>
        <tr v-for="i in 8" :key="i">
          <td v-for="j in 8" :class="(i + j) % 2 === 0 ? 'white' : 'black'" :key="j" @click="possibleMoves(i, j)">
            <span v-if="chessboard.tiles[8 * i + j - 9] && chessboard.tiles[8 * i + j - 9].piece">
              <img :src="getPieceImage(chessboard.tiles[8 * i + j - 9].piece)">
            </span>
          </td>
        </tr>
    </table>
  </div>
</template>

<script>
import { Board } from '../../../Board'

export default {
  data() {
    const board = new Board()
    board.resetBoard()
    return {
      chessboard: board
    }
  },
  methods: {
    possibleMoves(i, j) {
        // Highlight current tile
        const tile = document.querySelector(`td:nth-child(${j})`)
        if(j % 2 === 0){
           tile.classList.add('blackSelected')
        } else {
           tile.classList.add('whiteSelected')
        }

        const moves = this.chessboard.tiles[8 * i + j - 9].piece?.possibleMoves(this.chessboard, this.chessboard.tiles[8 * i + j - 9])
        this.highlightMoves(moves)
        const selectedTile = document.querySelector('.selected')
        if (selectedTile) {
          selectedTile.classList.remove('selected')
        }
        return moves || []
    },
    highlightMoves(moves) {
      moves.forEach(move => {
        const tile = document.querySelector(`td:nth-child(${move % 8 + 1})`)
        tile.classList.add('highlight')
      })
    },
    getPieceImage(piece) {
      return require('../assets/' + piece?.constructor.name + '_' + (piece?.white ? 'white' : 'black') + '.png')
    }
  }
}
</script>

<style scoped>
td {
  width: 50px;
  height: 50px;
  text-align: center;
  border: none;
  vertical-align: middle;
}
td.white {
  background-color: #eeeed2;
}
td.black {
  background-color: #769656;
}
td.whiteSelected {
  background-color: #f7f76a;
}
td.blackSelected {
  background-color: #bacb2b;
}
.highlightMoveBlack {
  background-color: #6a874d;
}
.highlightMoveWhite {
  background-color: #d6d6bd
;
}
</style>