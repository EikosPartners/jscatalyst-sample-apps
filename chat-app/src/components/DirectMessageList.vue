<template>
<v-container fluid>
	<v-layout row wrap class="pb-5 mb-5">
    <v-flex xs12 v-for="user in usersWhoAreNotMe" :key="user.username">
        <OneOnOne :recipient="user"> </OneOnOne>
    </v-flex>
	</v-layout>
</v-container>

</template>

<script>
import {mapGetters, mapState} from 'vuex'
import OneOnOne from './OneOnOne.vue'
import lifeCycleMixin from '../mixins'

export default {
    components: {
      OneOnOne
    },
  	data: function(){
  		return {
            snackbar: null,
            snackValue: null,
            timeout: 3000
  		}
  	},
    mixins: [lifeCycleMixin],
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