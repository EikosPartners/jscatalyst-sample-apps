<template>
<v-container fluid>
	<v-layout row wrap>
    <v-flex xs12 md10>
      <v-select
        :items="usersWhoAreNotMe"
        item-text="username"
        item.value="username"
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
        if (msg.DM === true) {
          this.theirMessages.push(msg)
        } else if (msg.connected === true) {
          if (!this.myIPaddress) {
        	 this.$store.commit('MY_IP_ADDRESS', msg.address)
          }
          if (!this.myUsername) {
            this.$store.commit('MY_USERNAME', msg.username)
          }
          if (!this.mySocketID) {
            this.$store.commit('MY_SOCKET_ID', msg.id)
          }
        	this.$store.commit('ALL_USERS', msg.allUsers)
        }
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
      window.addEventListener('close', this.closeHandler)
      window.addEventListener('beforeunload', this.closeHandler)

    },
    methods: {
      submitMessage: function(){
      	if (this.$socket.connected) {
          this.$socket.emit('directMessage', {value: this.value, recipient: this.recipient, sender: this.username})
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
    			bigOldString += item.username + ': ' + item.value + '\n'
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