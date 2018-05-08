<template>
<v-container fluid grid-list-md> 
	<v-layout row wrap fill-height>
		<v-flex xs12>
			<v-divider />
		</v-flex>
		 <v-flex xs12 md2 style="padding-top: 20px" fill-height>
      <v-card :height="cardRows">
         <v-card-title primary class="title">Current Users</v-card-title>
        <v-card-text>
          <v-list v-for="username in usersWhoAreNotMeByUserName" :key="username">
            <router-link :to="`/DM?user=${username}`">
            <v-list-tile>
              <v-list-tile-title>
                {{username}}
              </v-list-tile-title>
            </v-list-tile>
          </router-link>
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
        if (this.usersWhoAreNotMeByUserName.length > 5) {
          return this.usersWhoAreNotMeByUserName.length * 3
        } else if (this.theirMessages.length < 15) {
          return 15
        } else {
           return this.theirMessages.length + 1
        }
      },
      cardRows(){
        let textHeightPixels = (this.textAreaRows * 26.5)
        let otherOption = (this.usersWhoAreNotMeByUserName.length * 64) + 74
        return Math.max(textHeightPixels, otherOption).toString()
      }
    }


}
	
</script>

<style>
.input-group textarea:disabled, .input-group__details {
	color: black!important;
}
</style>