<template>
<!-- <v-container fluid grid-list-md>  -->
	<v-layout row wrap fill-height fluid>
		<v-flex xs4 md4 fill-height>
      <FriendsList />
    </v-flex>
    <v-flex xs8 md8 >
			<v-card
				style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;">
				<v-toolbar color="cyan" flat dark>
					<v-toolbar-title class="text-align-center">Open Group Chat</v-toolbar-title>
				</v-toolbar>
	      <v-text-field
				  class="pa-1"
	        disabled
	        v-model="messageDisplay"
	        name="theirMessages"
	        textarea
	        :dark="darkness"
	        :rows="chatRows"
	       >
	      </v-text-field>
				<v-layout class="px-3" style="width:100%; display: inline-flex;">
					<v-flex xs8 md8 class="px-2">
						<v-text-field
						  color= "cyan"
			        v-model="value"
			            name="yourMessage"
			            label="write message here"
			            single-line
			          >
			      </v-text-field>
					</v-flex>
			    <v-flex xs4 md4 d-flex align-center>
			      <v-btn 
						  @click="submitMessage">
			        Submit Message
			      </v-btn>
			    </v-flex>
				</v-layout>
			</v-card>
    </v-flex>
	</v-layout>
<!-- </v-container> -->

</template>

<script>
import {mapGetters, mapState} from 'vuex'
import lifeCycleMixin from '../mixins'
import FriendsList from './FriendsList.vue'
export default {
    components: {
      FriendsList
    },
    data: function(){
    	return {
          	value: '',
    	}
    },
    mixins: [lifeCycleMixin],
    sockets: {

    },
    methods: {
      submitMessage: function(){
      	if (this.connected) {
          this.$socket.emit('chatMessage', {value: this.value})
         }
      },

    },
    props: {

    },
    computed: {
      ...mapState([
        'myChats',
      ]),
      ...mapGetters([
        'chatRows'
      ]),
    	messageDisplay(){
    		let bigOldString = ''
    		this.myChats.forEach(item=>{
    			bigOldString += item.from.username + ': ' + item.value + '\n'
    		})
    		return bigOldString
      },
      cardRows(){
        let textHeightPixels = (this.chatRows  * 26.5)
        let otherOption = (this.usersWhoAreNotMeByUserName.length * 64) + 74
        return Math.max(textHeightPixels, otherOption).toString()
      }
    }


}

</script>

<style>
.theme--dark.input-group textarea:disabled, .theme--dark.input-group__details {
	color: white!important;
}

.input-group textarea:disabled, .input-group__details{
  color: black!important;
}

.input-group__input {
	border-color: #00bcd4!important;
}
</style>
