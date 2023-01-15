<template>
  <div class="container">
    <div class="chessboard">
      <div class="row" v-for="i in 8" :key="i">
        <div :tabindex="(8 * i + j - 9)" :class="(i + j) % 2 === 0 ? 'white tile' : 'black tile'" v-for="j in 8" :key="j" @click="selectTile(8 * i + j - 9)">
          <img v-if="game.board.tiles[8 * i + j - 9] && game.board.tiles[8 * i + j - 9].piece" 
                :src="getPieceImage(game.board.tiles[8 * i + j - 9].piece)">
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { Chess } from '../../../Chess'

export default {
  data() {
    const game = new Chess()
    return {
      game,
      selected: null,
      availableMoves: null,
    }
  },
  methods: {
    getPieceImage(piece) {
      return require('../assets/' + piece?.constructor.name + '_' + (piece?.white ? 'white' : 'black') + '.png')
    },

    // Select a tile & move a piece
    selectTile(pos) {
      // Reset available colors
      document.querySelectorAll('.available').forEach(element => {
        element.classList.remove('available')
      })
      // Reset selected colors
      document.querySelectorAll('.selected').forEach(element => {
        element.classList.remove('selected')
      })

      // A piece is already selected
      if (this.selected !== null) {
        // Deselect a piece
        if (!this.availableMoves.includes(pos)) {
          // Select another piece
          if (this.game.board.tiles[pos].piece && this.selected !== pos) {
            this.selected = pos
            document.querySelector([`[tabindex="${this.selected}"]`]).classList.add("selected")

            if (this.game.whiteTurn !== this.game.board.tiles[pos].piece.white) {
              this.selected = null
              return
            }

            this.getSelectedPiece(this.selected)
            return
          }
          this.selected = null
          this.availableMoves = null
          return
        }

        // Move selected piece
        this.game.move(this.selected, pos)
        this.selected = null
        this.availableMoves = null

        // Check if game is over
        if (this.game.gameOver) {
          const winner = this.game.whiteTurn ? 'Black' : 'White'
          alert("Game Over! " + winner + " won!")
          this.game.resetGame()
        }
        return
      }
      
      // No piece is selected and i want to select a piece
      if (this.game.board.tiles[pos].piece) {
        this.selected = pos
        document.querySelector([`[tabindex="${this.selected}"]`]).classList.add("selected")
        if (this.game.whiteTurn !== this.game.board.tiles[pos].piece.white) {
          this.selected = null
          return
        }
        this.getSelectedPiece(this.selected)
      }
    },

    // Get selected piece
    getSelectedPiece(tileWithPiece) {
      this.availableMoves = this.game.getMoves(tileWithPiece)
      this.colorAvailableMoves(this.availableMoves)
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