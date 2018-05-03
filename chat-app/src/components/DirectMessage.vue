<template>
<v-container fluid>
	<v-layout row wrap>
    <v-flex xs12 md10>
      <v-select
        :items="usersWhoAreMe"
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
import {mapGetters} from 'vuex'

export default {
	data: function(){
		return {
        	connected: null,
        	value: '',
        	theirMessages: [],
        	myIPaddress: '',
        	socketID: '',
          recipient: ''
		}
	},
    sockets: {
      connect: function(){
        console.log('connected')
        this.connected = true
        this.$socket.emit('pageOpened')
      },
      broadcast: function(msg){
        if (msg.chat === true) {
          this.theirMessages.push(msg)
        } else if (msg.connected === true) {
        	this.myIPaddress = msg.address
        	this.socketID = msg.id
        	this.$store.commit('MY_IP_ADDRESS', msg.address)
        	this.$store.commit('ALL_USERS', msg)
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
    methods: {
      submitMessage: function(){
      	if (this.$socket.connected) {
          this.$socket.emit('externalMessage', {value: this.value})
         }
      }
    },
    props: {

    },
    computed: {
    	...mapGetters([
    		'usersWhoAreMe',
    		'usersWhoAreNotMe'
    	]),
    	messageDisplay(){
    		let bigOldString = ''
    		this.theirMessages.forEach(item=>{
    			bigOldString += item.id + '@' + item.address + ': ' + item.value + '\n'
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