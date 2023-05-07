import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'profile',
      component: () => import('../views/profile.vue')
    },
    {
      path: '/profile',
      name: 'home',
      component: () => import('../views/profile.vue')
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('../views/links.vue')
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import('../views/blogs.vue')
    },
    {
      path: '/termination',
      name: 'termination',
      component: () => import('../views/termination.vue')
    },
  ]
})

export default router
