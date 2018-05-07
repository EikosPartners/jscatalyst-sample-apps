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
  </v-layout>
</template>

<script>


  export default {
    data: function(){
      return {
        connected: null,
      }
    },
    beforeMount() {
      this.connected = this.$socket.connected
    },
    sockets: {
      connect: function(){
        console.log('connected')
        this.connected = true
      },
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
