import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../store';
import Login from '../views/Login.vue'
import JobPostIndex from "../views/post_jobs/index.vue"
import EmpIndex from "../views/employers/index.vue"
import JobseekersIndex from "../views/jobseekers/index.vue"
import JobPositionsIndex from "../views/jobpositions/index.vue"
import PaymentsHistoryIndex from "../views/payments/index.vue"
import Dashboard from "../views/dashboard/index.vue"
import JobPostManagement from "../views/post_jobs/postjob_management.vue"
import Resume from "../views/post_jobs/resume.vue"
import Page_404 from '../views/page_not_found.vue'
import Profile from "../views/employers/profile.vue"
import SignIn from "../views/employers/register.vue"
import ChangePassword from "../views/employers/change_password.vue"
import Verify from "../views/employers/verify_otp.vue"
import ConstactUs from "../views/contact_us.vue"
import reqToken from "../views/employers/reqToken.vue"
import forgetPassword from "../views/employers/forget_password.vue"

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: 'Page_NotFound',
    component:Page_404,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/register',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/verify/:path?/:token?',
    name: 'Verify',
    component: Verify,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/resetpassword/:token?',
    name: 'ForgetPassword',
    component: forgetPassword,
    meta: {
      requiresVisitor: true,
    },
  },
  
  {
    path: '/dashboard',
    name: 'Dashboard',

    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/jobposts',
    name: 'JobPostIndex',

    component: JobPostIndex,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/jobpostmanagement/:id?',
    name: 'JobPostManagement',

    component: JobPostManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/employers',
    name: 'EmpIndex',

    component: EmpIndex,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/changepassword',
    name: 'ChangePassword',

    component: ChangePassword,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reqtoken/:path?',
    name: 'ReqToken',

    component: reqToken,
    meta: {
      requiresVisitor: true,
    },
  },

  {
    path: '/jobseekers/:id?',
    name: 'JobseekersIndex',

    component: JobseekersIndex,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/jobpositions',
    name: 'JobPositionsIndex',

    component: JobPositionsIndex,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/resume/:id?',
    name: 'Resume',

    component: Resume,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/paymentshistories',
    name: 'PaymentsHistoryIndex',

    component: PaymentsHistoryIndex,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile/:id?',
    name: 'Profile',

    component: Profile,
    meta: {
      requiresAuth: true,
    },

  },
  {
    path: '/contactus/:status?',
    name: 'ConstactUs',

    component: ConstactUs,
    meta: {
      requiresAuth: true,
    },

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// if login or is auth 
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if ( useAuthStore().isAuth) {
      next();
      return;
    }
    next("/");
  }
  next();
});
// if not login or not auth
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (!useAuthStore().isAuth) {
      next();
      return;
    }
    next("/dashboard");
  }
  next();
});


export default router
