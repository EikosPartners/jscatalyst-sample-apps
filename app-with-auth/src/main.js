// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import '../node_modules/jscatalyst/dist/jscatalyst.min.css'
import '../node_modules/vuetify/dist/vuetify.min.css'
import { ThemePlugin, AuthPlugin } from 'jscatalyst'


Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify)

const store = new Vuex.Store({})

Vue.use(ThemePlugin, {store, themes: ['Blue', 'Pink', 'Green', 'Brown', 'Red', 'Grey']})
Vue.use(AuthPlugin, {store, router, baseURL: 'http://localhost:8080'})

/* eslint-disable no-new */
window.Vue = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
