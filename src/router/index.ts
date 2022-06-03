import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import JobPostIndex from "../views/post_jobs/index.vue"
import EmpIndex from "../views/employers/index.vue"
import JobseekersIndex from "../views/jobseekers/index.vue"
import JobSeekersManagement from "../views/jobseekers/jobseekers.vue"
import JobPositionsIndex from "../views/jobpositions/index.vue"
import PaymentsHistoryIndex from "../views/payments/index.vue"
import Dashboard from "../views/dashboard/index.vue"
import JobPostManagement from "../views/post_jobs/postjob_management.vue"
import EmployerManagement from "../views/employers/employer_management.vue"
import Application from "../views/post_jobs/application.vue"
import Resume from "../views/post_jobs/resume.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/jobposts',
    name: 'JobPostIndex',
    component: JobPostIndex
  },
  {
    path: '/jobpostmanagement',
    name: 'JobPostManagement',
    component: JobPostManagement
  },
  {
    path: '/employers',
    name: 'EmpIndex',
    component: EmpIndex
  },
  {
    path: '/employermanagement',
    name: 'EmployerManagement',
    component: EmployerManagement
  },

  {
    path: '/jobseekers',
    name: 'JobseekersIndex',
    component: JobseekersIndex
  },
  {
    path: '/jobseekersmanagement',
    name: 'JobSeekersManagement',
    component: JobSeekersManagement
  },
  {
    path: '/jobpositions',
    name: 'JobPositionsIndex',
    component: JobPositionsIndex
  },
  {
    path: '/application',
    name: 'Application',
    component: Application
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/paymentshistories',
    name: 'PaymentsHistoryIndex',
    component: PaymentsHistoryIndex
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
