<template>
  <v-app id="app">

    <toolbar></toolbar>

    <v-container style="padding-top: 70px;">

       <span v-if="usersWhoAreNotMeByUserName.length < 1">
       <v-alert type="info" :value="true">
          You are the only user connected to this app! 
        </v-alert>
      </span>
      <span v-else>
        <v-alert type="success" :value="true">
          {{usersMessage | plurals}} connected! 
        </v-alert>
      </span>

      <router-view></router-view>

    </v-container>

     <v-snackbar
        :timeout="timeout"
        v-model="snackbar"
      >
        {{snackValue}}  
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    
  </v-app>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    Toolbar
  },
  data() {
    return {
      snackValue: '',
      snackbar: false,
      timeout: 3000
    }
  },
  sockets: {
      directMessage:function(msg) {
        if (msg.recipient.username === this.myUsername) {
            this.snackValue = "Direct Message from " + msg.from.username
            this.snackbar = true
        }
      },
  },
  computed: {
      ...mapState([
        'myUsername'
      ]),
      ...mapGetters([
        'usersWhoAreNotMeByUserName'
      ]),
      usersMessage: function(){
        return this.usersWhoAreNotMeByUserName.length
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
