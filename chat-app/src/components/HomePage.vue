<template>
  <v-layout row wrap>
    <v-flex xs12>
        <span v-if="!connected">
          <v-alert type="info" :value="true">
              You are not connected to the websocket server! To send and receive messages, please run `node server.js`.
            </v-alert>
          </span>
          <span v-else>
            <v-alert type="success" :value="true">
              Success! Server connected.
            </v-alert>
          </span>
    </v-flex>
    <v-flex xs12 id="headerText"> 
      <h1 class="display-2">Chat Demo</h1>
      <p class="subtitle my-3">
        This is a demo for implementing Chat features using <a href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst</a>. This demo offers anonymous, registration-free chat, either in a <router-link to="chat">shared room</router-link> or via <router-link to="DM">direct messaging</router-link>. 
      </p>
    </v-flex>
    <v-flex xs12 md10> 
        <v-text-field
          id="username"
          name="username"
          label="Choose A User Name (Optional)"
          :placeholder="myUsername"
          v-model="customUsername"
        ></v-text-field>
    </v-flex>
    <v-flex xs12 md2> 
      <v-btn @click="setNewUsername">
        Use This Username
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
  export default {

    computed: {
      ...mapState([
        'myUsername',
        'mySocketID'
      ]),
      newUsername: function(){
        if (this.customUsername == '') {
          return this.myUsername
        } else {
          return this.customUsername
        }
      }
    },
    data: function(){
      return {
        connected: null,
        customUsername: ''
      }
    },
    beforeMount() {
      this.connected = this.$socket.connected
    },
    mounted: function(){
      if (this.connected) {
          this.$socket.emit('pageOpened')
      }
    },
    sockets: {
      connect: function(){
        console.log('connected')
        this.connected = true
        this.$socket.emit('pageOpened')
      },
      userConnected: function(msg){
          if (!this.myIPaddress) {
           this.$store.commit('MY_IP_ADDRESS', msg.address)
          }
          if (!this.myUsername) {
            this.$store.commit('MY_USERNAME', msg.username)
          }
          if (!this.mySocketID) {
            this.$store.commit('MY_SOCKET_ID', msg.id)
          }
         // this.$store.commit('ADD_USER', msg)
      },
    },
    methods: {
      setNewUsername: function(){
        this.$store.commit('MY_USERNAME', this.newUsername)
        this.$socket.emit('newUsername', {username: this.newUsername})
      }
    }
  }
</script>

<style lang="css" scoped>
  section {
    width:600px;
    margin:auto;
  }
  .header-title {

  }
  #headerText {
    padding-left: 10px;
    font-size: 28px;
    font-family: 'Roboto';
    font-weight: normal;
  }


</style>
