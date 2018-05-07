<template>
<v-container fluid>
	<v-layout row wrap>
    <v-flex v-if="usersWhoAreNotMe.length < 1">
       <v-alert type="info" :value="true">
          You are the only user connected this app! No DM recipients available. 
        </v-alert>
      </span>
    </v-flex>
    <v-flex v-else xs12 v-for="user in usersWhoAreNotMe" :key="user.username">
      <OneOnOne :recipient="user"  />
		</v-flex>
	</v-layout>
</v-container>

</template>

<script>
import {mapGetters, mapState} from 'vuex'
import OneOnOne from './OneOnOne.vue'

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
      broadcast: function(msg){
      },
      allUsers: function(msg) {
        msg.forEach(item=>{
          if (!this.allUsersByUserName.includes(item.username)) {
            this.$store.commit('ADD_USER', item)
          }
        })
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
        if (!this.allUsersByUserName.includes(msg.username)) {
         this.$store.commit('ADD_USER', msg)
        }
      },
      userDisconnected: function(msg) {
         this.$store.commit('REMOVE_USER', msg) 
      }
    },
    beforeMount: function(){
       this.connected = this.$socket.connected
    },
    mounted: function(){
	   	if (this.connected) {
	       	this.$socket.emit('pageOpened')
	    }
    },
    beforeDestroy(){
      this.closeHandler()
    },
    created: function(){
      window.addEventListener('beforeunload', this.closeHandler)
    },
    beforeDestroy: function(){
      this.closeHandler()
    },
    methods: {
      closeHandler: function(event){
        this.$socket.emit('pageClosed', {username: this.myUsername})
      }
    },
    computed: {
      ...mapState([
        'allUsers',
        'myIPaddress',
        'myUsername',
        'mySocketID'
      ]),
    	...mapGetters([
    		'usersWhoAreMe',
    		'usersWhoAreNotMe',
        'allUsersByUserName'
    	]),
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