<template>
<v-container fluid grid-list-md> 
	<v-layout row wrap fill-height>
		<v-flex xs12>
			<v-divider />
		</v-flex>
		 <v-flex d-flex xs12 md2 style="padding-top: 20px" fill-height>
      <v-card :height="textAreaRows * 26.5">
         <v-card-title primary class="title">Current Users</v-card-title>
        <v-card-text><v-list v-for="user in usersWhoAreNotMe" :key="user.id">
          <a :href="`/DM#${user.username}`">
          <v-list-tile>
            <v-list-tile-title>
              {{user.username}}
            </v-list-tile-title>
          </v-list-tile>
        </a>
        </v-list></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 md10>
      <v-text-field
        disabled
        v-model="messageDisplay"
        name="theirMessages"
        textarea
        :rows="textAreaRows"
       > 
        </v-text-field>
    </v-flex>
		<v-flex xs12>
			<v-divider />
		</v-flex>
    <v-flex xs12 md8 offset-md2>
      <v-text-field
        v-model="value"
            name="yourMessage"
            label="write message here"
            single-line
          ></v-text-field>
    </v-flex>
    <v-flex xs12 md2 d-flex align-center>
      <v-btn @click="submitMessage">
        Submit Message
      </v-btn>
    </v-flex>


	</v-layout>
</v-container>

</template>

<script>
import {mapGetters, mapState} from 'vuex'
import lifeCycleMixin from '../mixins'

export default {
    data: function(){
    	return {
          	connected: null,
          	value: '',
          	theirMessages: [],
    	}
    },
    mixins: [lifeCycleMixin],
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
    methods: {
      submitMessage: function(){
      	if (this.$socket.connected) {
          this.$socket.emit('chatMessage', {value: this.value})
         }
      },

    },
    props: {

    },
    computed: {
     
    	messageDisplay(){
    		let bigOldString = ''
    		this.theirMessages.forEach(item=>{
    			bigOldString += item.from.username + ': ' + item.value + '\n'
    		})
    		return bigOldString 
    	},
      textAreaRows(){
        if (this.theirMessages.length < 15) {
        return 15
        } else {
           return this.theirMessages.length + 1
        }
      },
      // cardRows(){
      //  return (this.textAreaRows * 10).toString() + ' px'
      // }
    }


}
	
</script>

<style>
.input-group textarea:disabled, .input-group__details {
	color: black!important;
}
</style>