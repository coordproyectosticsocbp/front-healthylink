/** Main Importing */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index.js'
import middlewarePipeline from '@/middlewares/middlewarePipeline.js'
import auth from '@/middlewares/auth.js'
import guest from '@/middlewares/guest.js'


import DashboardView from '@/views/Dashboard/DashboardView.vue'
import AuthenticationView from '@/views/Authentication/AuthenticationView.vue'
import Login from '@/components/authentication/Login/Login.vue'
import ResetPassword from '@/components/authentication/ResetPassword/ResetPassword.vue'
import PatientsMainComponent from '@/components/patients/PatientsMainComponent.vue'
import CreatePatientComponent from "@/components/patients/subComponents/CreatePatient/CreatePatientComponent.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { middleware: [guest] },
    redirect: () => {
      return { name: 'auth' }
    },
  },
  {
    path: '/auth',
    name: 'auth',
    meta: { middleware: [guest] },
    component: AuthenticationView,
    redirect: () => {
      return { name: 'login' }
    },
    children: [
      {
        path: '/auth/login',
        name: 'login',
        meta: { middleware: [guest] },
        component: Login
      },
      {
        path: '/auth/reset-password',
        name: 'reset-password',
        meta: { middleware: [guest] },
        component: ResetPassword
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { middleware: [auth] },
    component: DashboardView,
  },
  {
    path: '/patient',
    name: 'patient',
    meta: { middleware: [auth] },
    component: DashboardView,
    children: [
      {
        path: '/patient/create-patient',
        name: 'create-patient',
        meta: { middleware: [auth] },
        component: PatientsMainComponent
      },
      {
        path: '/patient/patient-list',
        name: 'patient-list',
        meta: { middleware: [auth] },
        component: PatientsMainComponent
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware
  const context = { to, from, next, store }

  if (!middleware) {
    return next()
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})


export default router
