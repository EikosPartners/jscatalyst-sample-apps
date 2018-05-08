<template>
  <v-layout row wrap>
    <v-flex xs12>
        <span v-if="!connected">
          <v-alert type="info" :value="true">
              You are not connected to the websocket server! To send and receive messages, please run `node server.js`.
            </v-alert>
          </span>
    </v-flex>
    <v-flex xs12 id="headerText"> 
      <h1 class="display-2 text-xs-center">Chat Demo</h1>
      <p class="subtitle my-3">
        This is a demo for implementing Chat features using <a href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst</a>. This demo offers anonymous, registration-free chat, either in the shared room below or via <router-link to="DM" id="dmLink">direct messaging</router-link>. 
      </p>
    </v-flex>
    <v-flex xs12 md4 offset-xs3> 
        <v-text-field
          id="username"
          name="username"
          :rules="[rules.uniqueName]"
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
    <ChatWindow v-if="connected" />
  </v-layout>
</template>

<script>
import ChatWindow from '@/components/ChatWindow'
import lifeCycleMixin from '../mixins'
import {mapState, mapGetters} from 'vuex'
  export default {
    components: {
      ChatWindow
    },
    computed: {
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
        customUsername: '',
        rules: {
          uniqueName: (value)=> {return !this.allUsersByUserName.includes(value) || 'Username In Use'}
        }
      }
    },
    mixins: [lifeCycleMixin],
    sockets: {
      connect: function(){
        console.log('connected')
        this.connected = true
        let userName = this.myUsername
        this.$socket.emit('pageOpened')
        if (userName) {
          this.customUsername = userName 
          this.setNewUsername()
        }
      },
      userConnected: function(msg){
          if (!this.myUsername) {
            this.$store.commit('MY_USERNAME', msg.username)
          }
          if (!this.mySocketID) {
            this.$store.commit('MY_SOCKET_ID', msg.id)
          }
      if (!this.allUsersByUserName.includes(msg.username)) {
         this.$store.commit('ADD_USER', msg)
        }
      },
      allUsers: function(msg) {
        msg.forEach(item=>{
          if (!this.allUsersByUserName.includes(item.username)) {
            this.$store.commit('ADD_USER', item)
          }
        })
      },
      userDisconnected: function(msg) {
         this.$store.commit('REMOVE_USER', msg) 
      },
    },
    methods: {
      setNewUsername: function(){
        this.$store.commit('MY_USERNAME', this.newUsername)
        this.$store.commit('REMOVE_USER', {username: this.myUsername, id: this.mySocketID})
        this.$socket.emit('newUsername', {username: this.newUsername, id: this.mySocketID})
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
