import { createRouter, createWebHistory } from 'vue-router'
import V_Home from '../views/V_Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: V_Home,
    },
  ],
})

export default router
