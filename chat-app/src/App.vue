<template>
  <v-app id="app">
<!--     <img src="./assets/logo.png">
    <HelloWorld/> -->
    <ChatWindow/> 
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import ChatWindow from './components/ChatWindow'

export default {
  name: 'App',
  components: {
    HelloWorld,
    ChatWindow
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
