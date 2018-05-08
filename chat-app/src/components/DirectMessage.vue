<template>
<v-container fluid>
	<v-layout row wrap class="pb-5 mb-5">
    <v-flex xs12 v-for="user in usersWhoAreNotMe" :key="user.username" :id="user.username" >
      <OneOnOne :recipient="user"  />
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
    }
}
	
</script>

<style>
.input-group textarea:disabled, .input-group__details {
	color: black!important;
}
</style>