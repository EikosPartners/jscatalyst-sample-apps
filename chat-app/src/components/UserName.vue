<template>
  <v-layout class="mt-5 mb-3">
    <v-card class="pa-3 pt-4" style="width:100%; display: inline-flex;">
      <!-- <v-flex xs9 md6 offset-md2> -->
      <v-flex xs6>
        <v-text-field
          id="username"
          name="username"
          :rules="[rules.uniqueName]"
          label="Custom Username (Optional; Resets DM History)"
          :placeholder="myUsername"
          v-model="customUsername"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-btn
          class="primary"
          @click="setNewUsername">
          Use This Name
        </v-btn>
      </v-flex>
      <v-flex xs2>
        <v-btn flat
          @click="setNewUsername">
          View DM List
        </v-btn>
      </v-flex>
    </v-card>
  </v-layout>
</template>

<script>
import lifeCycleMixin from '../mixins'
import {mapState, mapGetters} from 'vuex'
  export default {

    computed: {
      ...mapState([
        'connected'
      ]),
      newUsername: function(){
        if (this.customUsername == '') {
          return this.myUsername
        } else {
          return this.customUsername
        }
      }
    },
    data: function(){
      return {
        customUsername: '',
        rules: {
          uniqueName: (value)=> {return !this.allUsersByUserName.includes(value) || 'Username In Use'}
        }
      }
    },
    mixins: [lifeCycleMixin],
    sockets: {
    },
    methods: {
      setNewUsername: function(){
        this.$store.commit('MY_USERNAME', this.newUsername)
        this.$store.commit('REMOVE_USER', {username: this.myUsername, id: this.mySocketID})
        this.$socket.emit('newUsername', {username: this.newUsername, id: this.mySocketID})
      }
    }
  }
</script>

<style lang="css" scoped>
  .subtitleLink:hover {
    text-decoration: underline!important;
  }
</style>
