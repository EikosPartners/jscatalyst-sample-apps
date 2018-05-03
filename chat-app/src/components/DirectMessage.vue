<template>
<v-container fluid>
	<v-layout row wrap>
    <v-flex xs12 md10>
      <v-select
        :items="usersWhoAreNotMe"
        item-text="username"
        v-model="recipient"
        label="Select Recipient"
        single-line
      >
      </v-select>

    </v-flex>
    <v-flex xs12 md2 d-flex align-center>
      <v-btn @click="submitMessage">
        Select Recipient
      </v-btn>
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
			<v-btn @click="submitMessage" :disabled="!recipient">
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
          if (!this.allUsers.includes(item)) {
            this.$store.commit('ADD_USER', item)
          }
        })
      },
      directMessage: function(msg) {
        if (msg.recipient.username === this.myUsername || msg.from.username == this.myUsername) {
          this.theirMessages.push(msg)
        }
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
        if (!this.allUsers.includes(msg)) {
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
    created(){
      window.addEventListener('beforeunload', this.closeHandler)
    },
    methods: {
      submitMessage: function(){
      	if (this.$socket.connected) {
          this.$socket.emit('directMessage', {value: this.value, recipient: this.recipient})
         }
      },
      closeHandler: function(event){
        this.$socket.emit('pageClosed', {username: this.myUsername})
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
    		'usersWhoAreNotMe'
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