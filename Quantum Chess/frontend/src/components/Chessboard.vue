<template>
  <div class="main-container" id="main-changer">
    <div class="chess-container" id="chess-changer">
      <div class="chessboard">
        <div class="row" v-for="i in 8" :key="i">
          <div :tabindex="(8 * i + j - 9)" :class="(i + j) % 2 === 0 ? 'white tile' : 'black tile'" v-for="j in 8" :key="j" @click="selectTile(8 * i + j - 9)">
            <img v-if="game.board.tiles[8 * i + j - 9]" :src="getPieceImage(game.board.tiles[8 * i + j - 9])">
            <div :tabindex="(8 * i + j - 9) + 64"></div>
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
      selected: null,
      availableMoves: null,
      quantumRealm: false,
    }
  },
  methods: {
    // Recolor the background
    recolorBackground() {
      let main = document.getElementById("main-changer")
      let chess = document.getElementById("chess-changer")
      let whiteTiles = document.getElementsByClassName("white")
      let blackTiles = document.getElementsByClassName("black")
      if (this.quantumRealm) {
        main.style.background = 'linear-gradient(16deg, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)'
        chess.style.background = 'linear-gradient(16deg, rgba(0,212,255,1) 0%, rgba(9,9,121,1) 100%)'
        for (let i = 0; i < whiteTiles.length; i++) {
          whiteTiles[i].style.background = '#3dadff'
        }
        for (let i = 0; i < blackTiles.length; i++) {
          blackTiles[i].style.background = '#386fe8'
        }
      } else {
        main.style.background = 'linear-gradient(16deg, rgba(255,190,99,1) 30%, rgba(253,29,29,1) 100%)'
        chess.style.background = 'linear-gradient(16deg, rgba(253,29,29,1) 30%, rgba(255,190,99,1) 100%)'
        for (let i = 0; i < whiteTiles.length; i++) {
          whiteTiles[i].style.background = '#FFBC57'
        }
        for (let i = 0; i < blackTiles.length; i++) {
          blackTiles[i].style.background = '#B36D07'
        }
      }
      this.quantumRealm = !this.quantumRealm
    },
    getPieceImage(piece) {
      return require('../assets/' + piece?.constructor.name + '_' + (piece?.white ? 'white' : 'black') + '.png')
    },

    // Select a tile & move a piece
    selectTile(pos) {
      // Reset available colors
      document.querySelectorAll('.circle-black').forEach(element => {
        element.classList.remove('circle-black')
      })
      document.querySelectorAll('.circle-white').forEach(element => {
        element.classList.remove('circle-white')
      })
      // Reset selected colors
      document.querySelectorAll('.selected').forEach(element => {
        element.classList.remove('selected')
      })
      // Reset takeable colors
      document.querySelectorAll('.takeable').forEach(element => {
        element.classList.remove('takeable')
      })

      // A piece is already selected
      if (this.selected !== null) {
        // Deselect a piece
        if (!this.availableMoves.includes(pos)) {
          // Select another piece
          if (this.game.board.tiles[pos] && this.selected !== pos) {
            this.selected = pos
            document.querySelector([`[tabindex="${this.selected}"]`]).classList.add("selected")

            if (this.game.whiteTurn !== this.game.board.tiles[pos].white) {
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
      if (this.game.board.tiles[pos]) {
        this.selected = pos
        document.querySelector([`[tabindex="${this.selected}"]`]).classList.add("selected")
        if (this.game.whiteTurn !== this.game.board.tiles[pos].white) {
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
  width: 550px;
  height: 550px;
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
  width: 65px;
  height: 65px;
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

.takeable {
  background-color: #FFB13D !important;
}

.white {
  background-color: #3dadff;
}

.black {
  background-color: #386fe8;
}

.selected, .selected:hover {
  background-color: rgb(255, 0, 0);
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
  color: #fff;
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