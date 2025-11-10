import { createRouter, createWebHistory, type RouteRecordNameGeneric } from 'vue-router'
import HomeView from '../views/home.vue'
import { useAuthStore } from '@/stores/auth'

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

router.beforeEach((to, from, next) => {
  const guardedRoutes = ['inventory'] as RouteRecordNameGeneric[]
  const { isAuthenticated } = useAuthStore()
  if (guardedRoutes.includes(to.name) && !isAuthenticated) next({ name: 'login' })
  else next()
})

export default router
