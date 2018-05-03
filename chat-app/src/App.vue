<template>
  <v-app id="app">
<!--     <img src="./assets/logo.png">
    <HelloWorld/> -->
    <div class="display-2"> Direct Messages </div>
    <DirectMessage/> 
    <div class="display-2"> Group Chat </div>
    <v-jumbotron :gradient="gradient">      
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">Work In Progress</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
<!--     <ChatWindow/>  -->

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import DirectMessage from './components/DirectMessage'
import ChatWindow from './components/ChatWindow'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ChatWindow,
    DirectMessage
  },
  data() {
    return {
      gradient: 'to top, #1A2980, #26D0CE'
    }
  },
  created(){
    // console.log(this.$store)
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
