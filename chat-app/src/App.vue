<template>
  <v-app id="app">
    <toolbar></toolbar>
    <v-container style="padding-top: 70px;">
       <span v-if="usersWhoAreNotMe.length < 1">
       <v-alert type="info" :value="true">
          You are the only user connected this app! 
        </v-alert>
      </span>
      <span v-else>
        <v-alert type="success" :value="true">
          {{usersMessage | plurals}} connected! 
        </v-alert>
      </span>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    Toolbar
  },
  data() {
    return {
    }
  },
  created(){
  },
  computed: {
      ...mapGetters([
        'usersWhoAreNotMe'
      ]),
      usersMessage: function(){
        return this.usersWhoAreNotMe.length
      }
  },
  filters: {
    plurals: function(value) {
      if (value === 1) {
        return value + " other user "
      } else {
        return value + " other users "
      }
    }
  }
}
</script>

<style>
</style>
