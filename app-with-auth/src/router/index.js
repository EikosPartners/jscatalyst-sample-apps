import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import LoginComp from '@/components/LoginComp'
import SignupComp from '@/components/SignupComp'
import Dashboard from '@/components/Dashboard'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: LoginComp
    },
    {
      path: '/auth/signup',
      name: 'Signup',
      component: SignupComp
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
