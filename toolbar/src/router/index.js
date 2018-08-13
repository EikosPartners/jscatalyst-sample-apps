import Vue from 'vue'
import Router from 'vue-router'
import WindowDisplay from '@/components/WindowDisplay'
import HomePage from '@/components/HomePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/windowdisplay',
      name: 'WindowDisplay',
      component: WindowDisplay
    },
  ]
})
