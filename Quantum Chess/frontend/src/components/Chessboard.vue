<template>
    <h2>Test</h2>
    <table>
        <tr v-for="i in 8">
        <td v-for="j in 8" :class="(i + j) % 2 === 0 ? 'white' : 'black'" :key="i+'-'+j" @click="possibleMoves(i*j)">
            <span v-if="chessboard.tiles[i * j].piece">{{chessboard.tiles[i*j].piece?.constructor.name}}</span>
        </td>
        </tr>
    </table>
</template>

<script lang="ts">
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
    possibleMoves(start: number): number[] {
        const moves = this.chessboard.tiles[start].piece?.possibleMoves(this.chessboard, this.chessboard.tiles[start])
        return moves || []
    }
  }
}
</script>

<style scoped>
td {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle;
}
td.white {
  background-color: white;
}
td.black {
  background-color: black;
}
td.white span {
  color: black;
}
td.black span {
  color: white;
}
</style>