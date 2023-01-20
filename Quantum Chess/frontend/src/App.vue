<template>
  <ChessBoard />
</template>

<script>
import vuetify from '@/plugins/vuetify'
import ChessBoard from './components/ChessBoard.vue'

export default {
  name: 'App',
  vuetify,
  components: {
    ChessBoard
  }
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css';
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
