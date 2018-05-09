<template>
  <v-container fluid>
  	<v-layout row wrap class="pb-5 mb-5">
      <v-flex xs12 v-if="myUsername">
            <OneOnOne :recipient="recipient"> </OneOnOne>
        </v-tabs>
      </v-flex>
  	</v-layout>
  </v-container>

</template>

<script>
import OneOnOne from './OneOnOne.vue'
import lifeCycleMixin from '../mixins'

export default {
    components: {
      OneOnOne
    },
  	data: function(){
  		return {

  		}
  	},
    mixins: [lifeCycleMixin],

    computed: {
      recipient() {
        let username = this.$route.params.id
        return this.usersWhoAreNotMe.filter(item=>item.username === username)[0]
      }
    },
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