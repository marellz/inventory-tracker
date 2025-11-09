import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.WEB_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/register.vue'),
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('@/views/inventory/list.vue'),
    },
  ],
})

export default router
