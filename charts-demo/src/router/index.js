import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import D3Charts from '@/components/D3Charts'

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
      path: '/d3',
      name: 'D3Charts',
      component: D3Charts
    },

  ]
})
