// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import '../node_modules/jscatalyst/dist/jscatalyst.min.css'
import '../node_modules/vuetify/dist/vuetify.min.css'
import { ThemePlugin } from 'jscatalyst'
import VueSocketio from 'vue-socket.io'
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/theme-material.css";
import "../node_modules/ag-grid/dist/styles/theme-dark.css";
Vue.config.productionTip = false



Vue.use(Vuex)
Vue.use(Vuetify)

const store = new Vuex.Store({})

Vue.use(ThemePlugin, {store})
Vue.use(VueSocketio, 'https://ws-api.iextrading.com/1.0/tops')

/* eslint-disable */
window.Vue = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
