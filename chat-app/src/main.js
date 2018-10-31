// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import router from './router/router.js'
import {store} from './store/store.js'
Vue.config.productionTip = false
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:4000', store) // ,store
import '@@/vuetify/dist/vuetify.min.css'
import '@@/jscatalyst/dist/jscatalyst.min.css'

Vue.use(Vuetify)

import { ThemePlugin, AuthPlugin } from 'jscatalyst'
Vue.use(ThemePlugin, {store})

new Vue({
  el: '#app',
  store,
  router,
  render: h=> h(App)
})
