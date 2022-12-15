import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import ExportDataView from '@/views/ExportDataView.vue'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: MainView
  },
  {
    path: '/main',
    name: 'Main',
    component: MainView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/exportData',
    name: 'ExportData',
    component: ExportDataView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
