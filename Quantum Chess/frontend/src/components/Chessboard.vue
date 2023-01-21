<template>
  <div class="main-container" id="main-changer">
    <div class="chess-container" id="chess-changer">
      <div class="chessboard">
        <div class="row" v-for="i in 8" :key="i">
          <div :tabindex="(8 * i + j - 9)" :class="(i + j) % 2 === 0 ? 'white tile' : 'black tile'" v-for="j in 8" :key="j" @click="selectTile(8 * i + j - 9)">
            <div>
              <!-- <span v-if="game.board.tiles[8 * i + j - 9]">{{ game.board.tiles[8 * i + j - 9].probability }}</span> -->
              <!-- <v-progress-linear color="black" height="5" value="50"></v-progress-linear> -->
              <img v-if="game.board.tiles[8 * i + j - 9]" :src="getPieceImage(game.board.tiles[8 * i + j - 9])">
              <div :tabindex="(8 * i + j - 9) + 64"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button class="button-29" role="button" @click="recolorBackground()">Split Move</button>
      <button class="button-29" role="button" @click="recolorBackground()">Merge Move</button>
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
      selectedSource: null,
      selectedTarget: null,
      availableMoves: null,
      quantumRealm: false,
    }
  },
  methods: {
    // Select a tile & move a piece
    selectTile(pos) {
      // Reset colors
      document.querySelectorAll('.circle-black').forEach(element => element.classList.remove('circle-black'))
      document.querySelectorAll('.circle-white').forEach(element => element.classList.remove('circle-white'))
      document.querySelectorAll('.selected').forEach(element => element.classList.remove('selected'))
      document.querySelectorAll('.takeable').forEach(element => element.classList.remove('takeable'))

      // A piece is already selected
      if (this.selectedSource !== null) {
        // Deselect a piece
        if (!this.availableMoves.includes(pos)) {
          this.selectedSource = null
          this.availableMoves = null
          this.selectedTarget = null
          
          // Select another piece
          if (this.game.board.tiles[pos] && this.selectedSource !== pos) {
            this.selectPiece(pos)
          }
        } else {
          // Split move
          if (this.quantumRealm) {
            if (this.selectedTarget === null && this.availableMoves.includes(pos)) {
              this.selectedTarget = pos
              this.colorAvailableMoves(this.availableMoves)
              return
            } else {
              this.game.move(this.selectedSource, this.selectedTarget, pos)
              this.selectedTarget = null
              this.recolorBackground()
            }
          } else {
            // Basic move
            this.game.move(this.selectedSource, pos)
          }
          this.selectedSource = null
          this.availableMoves = null

          // Check if game is over
          if (this.game.gameOver) {
            const winner = this.game.whiteTurn ? 'Black' : 'White'
            alert("Game Over! " + winner + " won!")
            this.game.resetGame()
          }
        }
      } else if (this.game.board.tiles[pos]) {
        // No piece is selected and i want to select a piece
        this.selectPiece(pos)
      }
    },

    // Select a piece
    selectPiece(pos) {
      this.selectedSource = pos
      document.querySelector([`[tabindex="${this.selectedSource}"]`]).classList.add("selected")
      
      if (this.game.whiteTurn !== this.game.board.tiles[pos].white) {
        this.selectedSource = null
        return
      }
      this.availableMoves = this.game.getMoves(this.selectedSource)
      if (this.quantumRealm) {
        // If it's a split move and target tile has a piece, filter them out
        this.availableMoves = this.availableMoves.filter(move => !this.game.board.tiles[move])
      }
      this.colorAvailableMoves(this.availableMoves)
    },

    // Recolor the background
    recolorBackground() {
      let main = document.getElementById("main-changer")
      let chess = document.getElementById("chess-changer")

      if (this.quantumRealm) {
        // Recolor to standard chess
        main.style.background = 'linear-gradient(16deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)'
        chess.style.background = 'linear-gradient(16deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 100%)'

        document.querySelectorAll(".whiteQuantum").forEach(element => element.classList.replace("whiteQuantum", "white"))
        document.querySelectorAll(".blackQuantum").forEach(element => element.classList.replace("blackQuantum", "black"))
        document.querySelectorAll(".button-29").forEach(element => element.style['background-image'] = 'radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)')
        document.querySelectorAll('.takeable').forEach(element => element.classList.remove('takeable'))
      } else {
        // Recolor to quantum chess
        main.style.background = 'linear-gradient(16deg, rgba(255,190,99,1) 30%, rgba(253,29,29,1) 100%)'
        chess.style.background = 'linear-gradient(16deg, rgba(253,29,29,1) 30%, rgba(255,190,99,1) 100%)'

        document.querySelectorAll(".white").forEach(element => element.classList.replace("white", "whiteQuantum"))
        document.querySelectorAll(".black").forEach(element => element.classList.replace("black", "blackQuantum"))
        document.querySelectorAll(".button-29").forEach(element => element.style['background-image'] = 'radial-gradient(100% 100% at 100% 0, #ffba61 0, #fd4d32 100%)')
        document.querySelectorAll('.takeable').forEach(element => element.classList.remove('takeable'))
      }
      this.quantumRealm = !this.quantumRealm
    },

    // Get image of a piece
    getPieceImage(piece) {
      return require('../assets/' + piece?.constructor.name + '_' + (piece?.white ? 'white' : 'black') + '.png')
    },

    // Color available moves
    colorAvailableMoves(moves) {
      moves.forEach(move => {
        if (this.game.board.tiles[move]) {
          let element = document.querySelector([`[tabindex="${move}"]`])
          element.classList.add("takeable")
          return
        }
        let element = document.querySelector([`[tabindex="${move + 64}"]`])
        if (this.game.whiteTurn) element.classList.add("circle-white")
        else element.classList.add("circle-black")
      })
    }
  }
}
</script>

<style>
.main-container {
  background: rgb(2,0,36);
  background: linear-gradient(16deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%);
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chess-container{
  width: 600px;
  height: 600px;
  background: rgb(9,9,121);
  background: linear-gradient(16deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 100%);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 20px 20px 10px 2px rgba(0,0,0,0.75);
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 450px;
}

.row {
  display: flex;
}

.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
}

.tile:hover {
  cursor: pointer;
}

.circle-white {
    width: 20px;
    height: 20px;
    background: whitesmoke;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
}

.circle-black {
    width: 20px;
    height: 20px;
    background: black;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
}

.white {
  background-color: #3dadff;
}

.whiteQuantum {
  background-color: #FFBC57;
}

.black {
  background-color: #386fe8;
}

.blackQuantum {
  background-color: #B36D07;
}

.takeable {
  background-color: #feba61 !important;
}

.selected, .selected:hover {
  background-color: #fd1d1d;
}

/* CSS */
.button-29 {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-flex;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  margin-top: 30px;
  width: 200px;
  box-shadow: 10px 10px 10px 2px rgba(0,0,0,0.75);
}

.button-29:focus {
  box-shadow: 10px 10px 10px 2px rgba(0,0,0,0.75);
}

.button-29:hover {
  box-shadow: 10px 10px 10px 2px rgba(0,0,0,0.75);
  transform: translateY(-2px);
}

.button-29:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
</style>