import { createRouter, createWebHistory } from 'vue-router'
import V_Home from '../views/V_Home.vue'
import V_AdminPanel from '@/views/V_AdminPanel.vue'
import V_ManageEmployees from '@/views/V_ManageEmployees.vue'
import V_NewEmployee from '@/views/V_NewEmployee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: V_Home,
    },
    {
      path: '/admin',
      name: 'adminpanel',
      component: V_AdminPanel,
    },
    {
      path: '/manage-employees',
      name: 'manageemployees',
      component: V_ManageEmployees,
    },
    {
      path: '/manage-employees/new',
      name: 'newemployee',
      component: V_NewEmployee,
    },
    
  ],
})

export default router
