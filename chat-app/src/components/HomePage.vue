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
        This is a demo for implementing Chat features using <a class="subtitleLink" href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst</a>. This demo offers anonymous, registration-free chat, either in the shared room below or via <router-link to="DM" class="subtitleLink">direct messaging</router-link>.
      </p>
    </v-flex>

    <UserName v-if="connected" />

    <ChatWindow v-if="connected" />

  </v-layout>
</template>

<script>
import ChatWindow from '@/components/ChatWindow'
import UserName from '@/components/UserName'
import lifeCycleMixin from '../mixins'
  export default {
    components: {
      ChatWindow,
      UserName
    },
    mixins: [lifeCycleMixin],
  }
</script>

<style lang="css" scoped>
  section {
    width:600px;
    margin:auto;
  }
  #headerText {
    padding-left: 10px;
    font-size: 28px;
    font-family: 'Roboto';
    font-weight: normal;
  }
  .subtitleLink:hover {
    text-decoration: underline!important;
  }

</style>
