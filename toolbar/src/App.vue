<template>
  <v-app id="app">
    <v-content class="mx-5" style="padding-top: 50px;" id='contextFrame'>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
</style>
