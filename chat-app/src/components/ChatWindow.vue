<template>
<v-container fluid grid-list-md> 
	<v-layout row wrap fill-height>
		<v-flex xs12>
			<v-divider />
		</v-flex>
		 <v-flex xs3 md2 style="padding-top: 20px" fill-height>
      <FriendsList />
    </v-flex>
    <v-flex xs9 md10 >
      <v-text-field 
        disabled
        v-model="messageDisplay"
        name="theirMessages"
        textarea
        :dark="darkness"
        :rows="chatRows"
       > 
      </v-text-field>
    </v-flex>
		<v-flex xs12>
			<v-divider />
		</v-flex>
    <v-flex xs9 md8 offset-md2>
      <v-text-field
        v-model="value"
            name="yourMessage"
            label="write message here"
            single-line
          >
      </v-text-field>
    </v-flex>
    <v-flex xs3 md2 d-flex align-center>
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
</style>