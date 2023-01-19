<template>
  <ChessBoard />
</template>

<script>
import ChessBoard from './components/ChessBoard.vue'

export default {
  name: 'App',
  components: {
    ChessBoard
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
* {
  font-family: 'Montserrat', sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
