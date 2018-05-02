<template>
  <v-app id="app">
    <toolbar></toolbar>
    <ui-page></ui-page>
  </v-app>
</template>

<script>
  import UIPage from './components/UIPage.vue'
  import Toolbar from './components/Toolbar.vue'
  export default {
    name: 'App',
    components: {
      'ui-page': UIPage,
      'toolbar': Toolbar
    }
  }
</script>

<style>

</style>
