import { createRouter, createWebHistory } from 'vue-router'
import V_Home from '../views/V_Home.vue'
import V_AdminPanel from '@/views/V_AdminPanel.vue'
import V_Employees from '@/views/V_Employees.vue'
import V_NewEmployee from '@/views/V_NewEmployee.vue'
import V_NewRole from '@/views/V_NewRole.vue'
import V_NewProject from '@/views/V_NewProject.vue'
import V_Projects from '@/views/V_Projects.vue'
import V_ManageProject from '@/views/V_ManageProject.vue'
import V_ManageEmployee from '@/views/V_ManageEmployee.vue'

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
      path: '/employees',
      name: 'employees',
      component: V_Employees,
    },
    {
      path: '/employees/new',
      name: 'newemployee',
      component: V_NewEmployee,
    },
    {
      path: '/employees/manage/:id',
      name: 'manageemployee',
      component: V_ManageEmployee,
    },
    {
      path: '/roles/new',
      name: 'newrole',
      component: V_NewRole,
    },
    {
      path: '/projects/new',
      name: 'newproject',
      component: V_NewProject,
    },
    {
      path: '/projects/',
      name: 'projects',
      component: V_Projects,
    },
    {
      path: '/projects/manage/:id',
      name: 'manageproject',
      component: V_ManageProject,
    },
  ],
})

export default router
