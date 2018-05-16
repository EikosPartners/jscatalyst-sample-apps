<template>
  <div>
    <!-- <v-flex xs12> -->
    <!-- </v-flex> -->
    <span v-if="!connected">
      <v-alert type="info" :value="true">
        You are not connected to the websocket server! To send and receive messages, please run `node server.js`.
      </v-alert>
    </span>
    <v-container row wrap class="my-5 body-content">
      <v-layout>
        <h1 class="display-2 text-xs-left">Chat Demo</h1>
      </v-layout>
      <v-layout>
        <p class="title my-4">
          This is a demo for implementing Chat features using <a class="subtitleLink" href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst</a>. This demo offers anonymous, registration-free chat, either in the shared room below or via <router-link to="DM" class="subtitleLink">direct messaging</router-link>.
        </p>
      </v-layout>

      <UserName v-if="connected" />

      <ChatWindow v-if="connected" />

    </v-container>


  </div>
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
  /* #headerText {
    padding-left: 10px;
    font-size: 28px;
    font-family: 'Roboto';
    font-weight: normal;
  } */
  .subtitleLink:hover {
    text-decoration: underline!important;
  }
  .body-content {
    width: 60%;
    margin: 0 auto;
  }
  .title {
    line-height: 1.5 !important;
  }

</style>
