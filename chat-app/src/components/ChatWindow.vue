<template>
<v-container fluid grid-list-md> 
	<v-layout row wrap fill-height>
		<v-flex xs12>
			<v-divider />
		</v-flex>
		 <v-flex xs3 md2 style="padding-top: 20px" fill-height>
      <v-card :height="cardRows">
         <v-card-title primary class="title">Current Users</v-card-title>
        <v-card-text>
          <v-list v-for="username in usersWhoAreNotMeByUserName" :key="username">
            <router-link class="userListLink" :to="`/DM?user=${username}`">
            <v-list-tile>
              <v-list-tile-title>
                {{username}}
              </v-list-tile-title>
            </v-list-tile>
          </router-link>
        </v-list></v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs9 md10>
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
    <v-flex xs9 md8 offset-md2>
      <v-text-field
        v-model="value"
            name="yourMessage"
            label="write message here"
            single-line
          ></v-text-field>
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

export default {
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
        'myChats'
      ]),
    	messageDisplay(){
    		let bigOldString = ''
    		this.myChats.forEach(item=>{
    			bigOldString += item.from.username + ': ' + item.value + '\n'
    		})
    		return bigOldString 
    	},
      textAreaRows(){
        if (this.usersWhoAreNotMeByUserName.length > 5) {
          return this.usersWhoAreNotMeByUserName.length * 3
        } else if (this.myChats.length < 15) {
          return 15
        } else {
           return this.myChats.length + 1
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
.userListLink {
  color: inherit;
  text-decoration: none
}

.userListLink:hover {
  text-decoration:underline
}
</style>