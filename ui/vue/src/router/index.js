import Vue from 'vue'
import VueRouter from 'vue-router'
import All from '../views/All.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'all',
    component: All
  },
  {
    path: '/active',
    name: 'active',
    component: () => import('../views/Active.vue')
  },
  {
    path: '/completed',
    name: 'completed',
    component: () => import('../views/Completed.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
