<template>
  <v-app id="app">
    <toolbar></toolbar>
    <nav-menu></nav-menu>
    <v-content style="padding-top: 50px;">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import NavMenu from './components/NavMenu.vue'
export default {
  name: 'App',
  components: {
    'toolbar': Toolbar,
    'nav-menu': NavMenu
  }
}
</script>

<style>
</style>
