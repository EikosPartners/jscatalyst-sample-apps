<template>
  <v-app id="app">

    <toolbar></toolbar>

    <div style="padding-top: 61px;" fluid>
      <!-- <v-flex xs12> -->
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
      <!-- </v-flex> -->

      <router-view></router-view>

    </div>

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

import html2canvas from 'html2canvas-webpack' // This needs to be part of a mixin / plugin

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
  mounted() {
      window.addEventListener("message", event=>{
        debugger

        if ( event.data.action !== undefined ) {
          if ( event.data.action === 'bringToFront') {
            let finWin = fin.desktop.Window.getCurrent()
            finWin.restore()
            finWin.bringToFront()
            return
          }
        }

    if( event.data.action !== undefined && event.data.action === 'screencapture') 
    {
        let body = window.document.body
        html2canvas(body)
        .then(canvas => {
            try {
                debugger

              let data = canvas.toDataURL("img/png")

              let obj = JSON.stringify(data)

              event.source.postMessage({
                action: 'screencapture',
                width: canvas.width,
                height: canvas.height,
                data: obj
              }, '*')
            } catch (exception ) {
              console.log(exception)
            }
        })
        .catch(error => {
          console.log(error)
        });
      }}
      , false);

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
