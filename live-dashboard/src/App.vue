<template>
  <v-app id="app">
    <toolbar></toolbar>
    <dashboard></dashboard>
  </v-app>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    'dashboard': Dashboard,
    'toolbar': Toolbar
  }
}
</script>

<style>
</style>
