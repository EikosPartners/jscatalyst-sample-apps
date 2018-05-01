// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/jscatalyst/dist/jscatalyst.min.css'
import '../node_modules/vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { ThemePlugin} from 'jscatalyst'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(require('vue-chartist'))

const store = new Vuex.Store({
  state: {menu:null},
  mutations: {
    toggleMenu: function(state, payload) {
      state.menu = !state.menu
    }
  }
})
Vue.use(ThemePlugin, {store, themes: ['Blue', 'Pink', 'Green', 'Brown', 'Red', 'Grey']})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.Vue = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
