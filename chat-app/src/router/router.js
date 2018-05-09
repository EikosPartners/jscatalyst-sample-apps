import Vue from 'vue'
import Router from 'vue-router'
import DirectMessage from '@/components/DirectMessage'
import HomePage from '@/components/HomePage'

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
      path: '/DM/:id',
      component: DirectMessage
    },
    
  ]
})
