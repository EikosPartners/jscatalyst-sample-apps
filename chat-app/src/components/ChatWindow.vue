<template>
<v-container fluid>
	<v-layout row wrap>
		<v-flex xs12>
			<span v-if="!connected">
				<v-alert type="info" :value="true">
			      You are not connected to the websocket server! To send and receive messages, please run `node server.js`.
	    		</v-alert>
	    	</span>
	    	<span v-else>
	    		<v-alert type="success" :value="true">
	    			Success! Server connected.
	    		</v-alert>
    		</span>
		</v-flex>
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

export default {
	data: function(){
		return {
        	connected: null,
        	value: '',
        	theirMessages: [],
        	myIPaddress: '',
        	socketID: ''
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
        } else if (msg.location === true) {
        	this.myIPaddress = msg.address
        	this.socketID = msg.id
        }
      }
    },
    beforeMount: function(){
       this.connected = this.$socket.connected
    },
    mounted: function(){
	   	if (this.connected) {
	       	this.$socket.emit('pageOpened', 'hello')
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