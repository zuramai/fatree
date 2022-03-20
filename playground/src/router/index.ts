import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (create.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateView.vue')
    }
  ]
})

export default router
