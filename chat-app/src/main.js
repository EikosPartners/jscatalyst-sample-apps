// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import Vuetify from 'vuetify'
Vue.config.productionTip = false
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://localhost:4000') // ,store
import '@@/vuetify/dist/vuetify.min.css'


Vue.use(Vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
