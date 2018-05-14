import Vue from 'vue'
import Router from 'vue-router'
import ChatsContainer from '@/components/ChatsContainer'
import SimpleRTCContainer from '@/components/SimpleRTCContainer'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'SimpleRTCContainer',
      component: SimpleRTCContainer
    },
    {
  	// note: localhost:8080/#/chats
      path: '/chats',
      name: 'ChatsContainer',
      component: ChatsContainer
    },



  ]
})
