<template>
  <v-app id="app">
    <toolbar></toolbar>
    <sub-nav></sub-nav>
    <v-content class="mx-5" style="padding-top: 50px;" id='contextFrame'>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import SubNavBar from './components/SubNavBar.vue'
export default {
  name: 'App',
  components: {
    'toolbar': Toolbar,
    'sub-nav': SubNavBar
  }
}
</script>

<style>
</style>
