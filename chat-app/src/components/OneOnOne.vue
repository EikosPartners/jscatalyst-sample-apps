<template>
  <v-container fluid>
	<v-layout row wrap>
		<v-flex xs12>
			<div class="display-1 text-xs-center"> Direct Messages from {{recipient.username}}</div>
		</v-flex>
		<v-flex xs12>
			<v-text-field
			  disabled
			  v-model="messageDisplay"
	          name="theirMessages"
	          textarea
	          :rows="textAreaRows"
	        ></v-text-field>
		</v-flex>
		<v-flex xs12>
			<v-divider />
		</v-flex>
		<v-flex xs12 md11>
			<v-text-field
			  v-model="value"
	          name="yourMessage"
	          label="write message here"
	          single-line
	        ></v-text-field>
		</v-flex>
		<v-flex xs12 md1>
			<v-btn @click="submitMessage">
				Submit Message
			</v-btn>
		</v-flex>
	</v-layout>
</v-container>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
	sockets: {
		directMessage: function(msg) {
	        if ((msg.recipient.username === this.myUsername && msg.from.username == this.recipient.username)|| (msg.from.username === this.myUsername && msg.recipient.username === this.recipient.username)) {
	          this.theirMessages.push(msg)
	        }
	      },
  	},
	props: {
		recipient:{
			type: Object,
			required: true

		}
	},
	data: function(){
		return {
        	theirMessages: [],
        	value: '',
		}
	},
	methods: {
		submitMessage: function(){
			if (this.$socket.connected) {
			  this.$socket.emit('directMessage', {value: this.value, recipient: this.recipient})
			}
		},
  	},
	computed: {
		...mapState([
			'allUsers',
			'myUsername',
			'mySocketID'
		]),
    	...mapGetters([
    		'usersWhoAreMe',
    		'usersWhoAreNotMe'
    	]),
    	textAreaRows(){
    		if (this.theirMessages.length < 5) {
    			return 5
    		} else {
    			 return this.theirMessages.length + 1
    		}
    	},
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

</style>