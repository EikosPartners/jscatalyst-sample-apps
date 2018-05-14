import Vue from 'vue'
import Router from 'vue-router'
import ChatsContainer from '@/components/ChatsContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatsContainer',
      component: ChatsContainer
    },


  ]
})
