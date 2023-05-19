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
      path: '/terms',
      name: 'terms',
      component: () => import('../views/terms.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/team.vue')
    },
    {
      path: '/pages',
      name: 'pages',
      component: () => import('../views/pages.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/privacy.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../components/settings.vue')
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
