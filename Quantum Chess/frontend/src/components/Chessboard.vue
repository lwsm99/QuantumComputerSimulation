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
    const board = new Board()
    board.resetBoard()
    return {
      chessboard: board,
      selected: null,
      availableMoves: null,
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

      // selected
      if (this.selected) {
        // selected and i want to deselect
        if (!this.availableMoves.includes(8 * i + j - 9)) {
          // select another piece ?
          if (this.chessboard.tiles[8 * i + j - 9].piece) {
            if (this.selected === 8 * i + j - 9) {
              this.selected = null
              this.availableMoves = null
              return
            }
            this.selected = 8 * i + j - 9
            document.querySelector([`[tabindex="${this.selected}"]`]).classList.add("selected")
            this.getSelectedPiece(this.selected)
            return
          }
          this.selected = null
          this.availableMoves = null
          return
        }

        // selected and i want to move
        this.chessboard.tiles[this.selected].piece.move(this.chessboard.tiles[this.selected], this.chessboard.tiles[8 * i + j - 9])
        this.selected = null
        this.availableMoves = null
        return
      }
      
      // not selected
      // i want to select
      if (this.chessboard.tiles[8 * i + j - 9].piece) {
        this.selected = 8 * i + j - 9
        document.querySelector([`[tabindex="${this.selected}"]`]).classList.add("selected")
        this.getSelectedPiece(this.selected)
      }
    },

    // Get selected piece
    getSelectedPiece(tileWithPiece) {
      this.availableMoves = this.chessboard.tiles[tileWithPiece].piece?.possibleMoves(this.chessboard, this.chessboard.tiles[tileWithPiece])
      this.colorAvailableMoves(this.availableMoves)
      // uncomment next line to see the piece object, e.g. console.log(getSelectedPiece(0)) in setSelected()-method
      //return this.chessboard.tiles[tileWithPiece].piece
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