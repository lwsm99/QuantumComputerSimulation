import { createRouter, createWebHistory } from 'vue-router'

import chessboard from '@/components/chessboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: chessboard
    }
  ]
})

export default router
