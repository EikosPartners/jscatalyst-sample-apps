import Vue from 'vue'
import Router from 'vue-router'
import DirectMessageList from '@/components/DirectMessageList'
import DirectMessageSolo from '@/components/DirectMessageSolo'
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
      path: '/allMessages',
      name: 'DirectMessageList',
      component: DirectMessageList
    },
    {
      path: '/DM/:id',
      name: 'DirectMessageSolo',
      component: DirectMessageSolo
    },   
  ]
})
