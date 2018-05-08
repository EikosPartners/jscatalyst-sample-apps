<template>
<v-container fluid>
	<v-layout row wrap class="pb-5 mb-5">
    <v-flex xs12>
      <v-tabs v-model="DMtab"> 
        <v-tab v-for="user in usersWhoAreNotMe" :key="user.username">
          {{user.username}}
        </v-tab>
        <v-tab-item v-for="user in usersWhoAreNotMe" :key="user.username">
            <OneOnOne :recipient="user"> </OneOnOne>
        </v-tab-item>
      </v-tabs>
    </v-flex>
	</v-layout>
</v-container>

</template>

<script>
import {mapGetters, mapState} from 'vuex'
import OneOnOne from './OneOnOne.vue'
import lifeCycleMixin from '../mixins'

export default {
    components: {
      OneOnOne
    },
  	data: function(){
  		return {
          	connected: null,
          	value: '',
            recipient: '',
            DMtab: null,
            snackbar: null,
            snackValue: null,
            timeout: 3000
  		}
  	},
    sockets: {

      connect: function(){
        console.log('connected')
        this.connected = true
        this.$socket.emit('pageOpened')
      },
      allUsers: function(msg) {
        msg.forEach(item=>{
          if (!this.allUsersByUserName.includes(item.username)) {
            this.$store.commit('ADD_USER', item)
          }
        })
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
      userDisconnected: function(msg) {
         this.$store.commit('REMOVE_USER', msg) 
      }
    },
    mixins: [lifeCycleMixin],
    methods: {
    },
    computed: {
    	messageDisplay(){
    		let bigOldString = ''
    		this.theirMessages.forEach(item=>{
    			bigOldString += item.from.username + ': ' + item.value + '\n'
    		})
    		return bigOldString 
    	}
    },
    mounted(){

    },
    updated(){
        let params = new URLSearchParams(window.location.search)
        if (params.get('user')) {
          this.DMtab = this.usersWhoAreNotMeByUserName.indexOf(params.get('user')).toString() !== "-1" ? this.usersWhoAreNotMeByUserName.indexOf(params.get('user')).toString() : "0"
        }
    },
    watch: {
      usersWhoAreNotMeByUserName(data){
          let params = new URLSearchParams(window.location.search)
          if (params.get('user')) {
            this.DMtab = data.indexOf(params.get('user')).toString() !== "-1" ? data.indexOf(params.get('user')).toString() : "0" 
          }
      }
    }
}
	
</script>

<style>
.input-group textarea:disabled, .input-group__details {
	color: black!important;
}
</style>