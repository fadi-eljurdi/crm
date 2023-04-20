import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'contact',
      component: () => import('../views/contact.vue')
    },
    {
      path: '/contact',
      name: 'home',
      component: () => import('../views/contact.vue')
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
      path: '/services',
      name: 'services',
      component: () => import('../views/services.vue')
    },
  ]
})

export default router
