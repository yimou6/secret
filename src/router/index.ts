import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: ':value',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/config',
        name: 'config',
        component: () => import('@/views/Config.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
