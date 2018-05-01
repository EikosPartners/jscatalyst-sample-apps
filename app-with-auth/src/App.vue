<template>
  <v-app id="app">
    <toolbar></toolbar>
    <router-view/>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
export default {
  name: 'App',
  components: {
  'toolbar': Toolbar
  }
}
</script>

<style>

</style>
