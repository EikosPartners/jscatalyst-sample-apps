a<template>
<v-container fluid>
	<v-layout row wrap>
		<v-flex xs12>
			<v-divider />
		</v-flex>
		<v-flex xs12 md10>
			<v-text-field
			  v-model="value"
	          name="yourMessage"
	          label="write message here"
	          textarea
	        ></v-text-field>
		</v-flex>
		<v-flex xs12 md2 d-flex align-center>
			<v-btn @click="submitMessage">
				Submit Message
			</v-btn>
		</v-flex>
		<v-flex xs12>
			<v-divider />
		</v-flex>
		<v-flex xs12>
			<v-text-field
			  disabled
			  v-model="messageDisplay"
	          name="theirMessages"
	          textarea
	        ></v-text-field>
		</v-flex>
	</v-layout>
</v-container>

</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
	data: function(){
		return {
        	connected: null,
        	value: '',
        	theirMessages: [],
		}
	},
    sockets: {
      connect: function(){
        console.log('connected')
        this.connected = true
        this.$socket.emit('pageOpened')
      },
      chatMessage: function(msg) {
        this.theirMessages.push(msg)
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
      allNewUsers: function(msg) {
        this.$store.commit('ALL_USERS', msg)
      },
    },
    created(){
      window.addEventListener('beforeunload', this.closeHandler)
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
    methods: {
      submitMessage: function(){
      	if (this.$socket.connected) {
          this.$socket.emit('chatMessage', {value: this.value})
         }
      },
      closeHandler: function(event){
        this.$socket.emit('pageClosed', {username: this.myUsername, id: this.mySocketID})
      }

    },
    props: {

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