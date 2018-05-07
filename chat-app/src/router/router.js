import Vue from 'vue'
import Router from 'vue-router'
import ChatWindow from '@/components/ChatWindow'
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
      path: '/chat',
      name: 'Chat',
      component: ChatWindow
    },
    {
      path: '/DM',
      name: 'DirectMessage',
      component: DirectMessage
    },
    
  ]
})
