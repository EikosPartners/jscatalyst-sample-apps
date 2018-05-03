// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import {store} from './store.js'
Vue.config.productionTip = false
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:4000', store) // ,store
import '@@/vuetify/dist/vuetify.min.css'

// import '@@/jscatalyst/dist/jscatalyst.min.css'
// import { ThemePlugin } from 'jscatalyst'
// Vue.use(Vuex)

// const store = new Vuex.Store({})

// Vue.use(ThemePlugin, {store, themes: ['Blue', 'Pink', 'Green', 'Brown', 'Red', 'Grey']})

Vue.use(Vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  template: '<App/>'
})
