<template>
<v-container fluid>
	<v-layout row wrap class="pb-5 mb-5">
    <v-flex xs12>
      <v-tabs v-model="DMtab"> 
        <v-tab v-for="user in usersWhoAreNotMe" :key="user.username">
          {{user.username}}
        </v-tab>
        <v-tab-item v-for="user in usersWhoAreNotMe" :key="user.username">
            <OneOnOne :recipient="user"> </OneOnOne>
        </v-tab-item>
      </v-tabs>
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
          	value: '',
            DMtab: null,
            snackbar: null,
            snackValue: null,
            timeout: 3000
  		}
  	},
    sockets: {

    },
    mixins: [lifeCycleMixin],
    methods: {
    },
    computed: {
    },
    mounted(){

    },
    updated(){
        let params = new URLSearchParams(window.location.search)
        if (params.get('user') && !this.DMtab) {
          this.DMtab = this.usersWhoAreNotMeByUserName.indexOf(params.get('user')).toString() !== "-1" ? this.usersWhoAreNotMeByUserName.indexOf(params.get('user')).toString() : "0"
        }
    },
    watch: {
      usersWhoAreNotMeByUserName(data){
          let params = new URLSearchParams(window.location.search)
          if (params.get('user') && !this.DMtab) {
            this.DMtab = data.indexOf(params.get('user')).toString() !== "-1" ? data.indexOf(params.get('user')).toString() : "0" 
          } else if (!params.get('user') && !this.DMtab) {
            this.DMtab = 0
          }
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