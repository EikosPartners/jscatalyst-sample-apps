<template>
<v-container fluid>
	<v-layout row wrap>
		<v-flex xs12>
			<v-alert type="info" :value="true" v-if="!connected">
		      You are not connected to the websocket server! To send and receive messages, please run `node server.js`.
    		</v-alert>
    		<v-alert type="success" :value="true" v-else>
    			Success! Server connected.
    		</v-alert>
		</v-flex>
		<v-flex xs10>
			<v-text-field
			  v-model="value"
	          name="yourMessage"
	          label="write message here"
	          multi-line
	        ></v-text-field>
		</v-flex>
		<v-flex xs2 d-flex align-center>
			<v-btn @click="submitMessage">
				Submit Message
			</v-btn>
		</v-flex>
	</v-layout>
</v-container>

</template>

<script>

export default {
	data: function(){
		return {
        	connected: null,
        	value: ''

		}
	},
    sockets: {
      connect: function(){
        console.log('connected')
        this.connected = true
      },
      broadcast: function(msg){
        if (msg.chat === true) {
          alert(msg.value)
        }      
      }
    },
    beforeMount: function(){
        this.connected = this.$socket.connected
    },

    methods: {
      emitMessage: function(msg){
// if socket.io server, broadcast message to all instances
        if (this.$socket.connected) {
          this.$socket.emit('externalMessage', msg)
        } else {
// else, just send the message
          windowmanager.messagebus.send('external-message', msg)
        }
      },
      submitMessage: function(){
      	if (this.$socket.connected) {
          this.$socket.emit('externalMessage', {value: this.value})
         }
      	// debugger
      }
    },
    props: {

    }


}
	
</script>

<style>

</style>