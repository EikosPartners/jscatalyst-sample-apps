<template>
      <v-card :height="cardRows" style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;">
        <v-toolbar color="cyan" flat dark>
          <v-toolbar-title>Current Users</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-list v-for="username in usersWhoAreNotMeByUserName" :key="username">
            <router-link class="userListLink" :to="`/DM/${username}`">
            <v-list-tile>
              <v-list-tile-title>
                {{username}}
              </v-list-tile-title>
            </v-list-tile>
          </router-link>
        </v-list></v-card-text>
      </v-card>

</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
    computed: {
      ...mapGetters([
        'chatRows',
        'usersWhoAreNotMeByUserName'
      ]),
      cardRows(){
        let textHeightPixels = (this.chatRows  * 37.75)
        let otherOption = (this.usersWhoAreNotMeByUserName.length * 64) + 74
        return Math.max(textHeightPixels, otherOption).toString()
      }
    }
}

</script>

<style>

.userListLink {
  color: inherit;
  text-decoration: none
}

.userListLink:hover {
  text-decoration:underline
}
</style>
