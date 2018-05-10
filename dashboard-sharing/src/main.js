// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../node_modules/jscatalyst/dist/jscatalyst.min.css'
import '../node_modules/vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { ThemePlugin, ScreensharePlugin } from 'jscatalyst'
import VueSocketio from 'vue-socket.io'
import VueRouter from 'vue-router'

Vue.use(VueSocketio, 'http://localhost:8000')
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(require('vue-chartist'))
Vue.use(VueRouter)

const store = new Vuex.Store({})
import Dashboard from './components/Dashboard.vue'
import ReceiveDashboard from './components/ReceiveDashboard.vue'
import Homepage from './components/Homepage.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/receiver',
      name: 'Receiver',
      component: ReceiveDashboard
    }
  ]
})

Vue.use(ThemePlugin, {store, themes: ['Blue', 'Pink', 'Green', 'Brown', 'Red', 'Grey']})
Vue.use(ScreensharePlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
window.Vue = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
