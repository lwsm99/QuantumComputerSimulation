<template>
  <div class="container">
    <div class="chessboard">
      <div class="row" v-for="i in 8" :key="i">
        <div :tabindex="(8 * i + j - 9)" :class="(i + j) % 2 === 0 ? 'white tile' : 'black tile'" v-for="j in 8" :key="j" @click="setSelected(i, j)">
          <img v-if="chessboard.tiles[8 * i + j - 9] && chessboard.tiles[8 * i + j - 9].piece" 
                :src="getPieceImage(chessboard.tiles[8 * i + j - 9].piece)">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { Board } from '../../../Board'

export default {
  data() {
    //set selected
    const board = new Board()
    board.resetBoard()
    return {
      chessboard: board,
      selected: null
    }
  },
  methods: {
    getPieceImage(piece) {
      return require('../assets/' + piece?.constructor.name + '_' + (piece?.white ? 'white' : 'black') + '.png')
    },

    // Set selected piece
    setSelected(i, j) {
      // reset available colors
      document.querySelectorAll('.available').forEach(element => {
        element.classList.remove('available')
      })
      // reset select colors
      document.querySelectorAll('.selected').forEach(element => {
        element.classList.remove('selected')
      })
      // if already selected, deselect and return
      if (this.selected !== null && (this.selected === 8 * i + j - 9 || this.chessboard.tiles[8 * i + j - 9].piece === null)) {
        this.selected = null
        console.log(this.selected)
        return
      }
      // select the tile
      if (this.chessboard.tiles[8 * i + j - 9].piece) {
        this.selected = 8 * i + j - 9
        document.querySelector([`[tabindex="${this.selected}"]`]).classList.add("selected")
        this.getSelectedPiece(this.selected)
      }
    },

    // Get selected piece
    getSelectedPiece(tileNumber) {
      this.colorAvailableMoves(this.chessboard.tiles[tileNumber].piece?.possibleMoves(this.chessboard, this.chessboard.tiles[tileNumber]))
      // uncomment next line to see the piece object, e.g. console.log(getSelectedPiece(0)) in setSelected()-method
      //return this.chessboard.tiles[tileNumber].piece
    },

    // Color available moves
    colorAvailableMoves(moves) {
      moves.forEach(move => {
        let element = document.querySelector([`[tabindex="${move}"]`])
        element.classList.add("available")
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(56, 56, 56);
  color: white;
  margin: 0;
  padding: 0;
}

.row {
  display: flex;
}

.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
}

.tile:hover {
  cursor: pointer;
}

.white {
  background-color: #eeeed2;
}

.black {
  background-color: #769656;
}

.available {
  background-color: rgb(84, 255, 32);
}

.selected, .selected:hover {
  background-color: rgb(255, 0, 0);
}
</style>