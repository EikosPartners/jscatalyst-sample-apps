<template>
  <div class="window-drag">
      <v-toolbar class="nav-toolbar window-drag"
        app
        clipped-left
        fixed
        style="z-index:5;"
      >
        <!-- DROP A LOGO HERE -->
        <h1 id="headerText"> <router-link to="/">JSCatalyst Chat</router-link></h1>
        <h3 style="margin-left: 15px" v-if="myUsername">@{{myUsername}}</h3>
        <v-spacer></v-spacer>

        <!-- Full nav menu for larger screens -->
        <v-toolbar-items class="hidden-md-and-down">
          <v-tooltip bottom>
            <v-btn icon @click="toggleDark" slot="activator">
              <v-icon class="">lightbulb_outline</v-icon>
            </v-btn>
            <span>Toggle light/dark</span>
          </v-tooltip>
          <!-- <v-tooltip bottom>
            <v-btn icon @click.stop="" slot="activator">
              share function when available: @click="shareURL"
              <v-icon class="">share</v-icon>
            </v-btn>
            <span>Share</span>
          </v-tooltip> -->
          <v-tooltip bottom>
            <v-btn icon @click.stop="refreshScreen" slot="activator">
              <v-icon>refresh</v-icon>
            </v-btn>
            <span>Refresh</span>
          </v-tooltip>
          <v-menu>  
            <v-btn flat :to='{name: "DirectMessageList"}' slot="activator" class="navBtn">DM List</v-btn> 
          </v-menu>
        </v-toolbar-items>

        <!-- Collapsed nav menu for mobile -->
        <v-toolbar-items class="hidden-lg-and-up">
          <v-menu max-height="400px">
            <v-btn icon slot="activator"><v-icon>menu</v-icon></v-btn>
            <v-list>
              <v-list-tile v-for="item in collapsedUserMenu" :key="item.title" @click="item.action">
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile>
                <router-link :to='{name: "DirectMessageList"}' style='text-decoration: none; color: inherit'><v-list-tile class='list__tile--link'>
                  <v-list-tile-title>Direct Messages</v-list-tile-title>
                </v-list-tile></router-link>
            </v-list>
          </v-menu>
        </v-toolbar-items>

      </v-toolbar>

  </div>
</template>

<script>

import { StyleTogglerMixin } from 'jscatalyst'
import {mapState} from 'vuex'

  export default {
    mixins: [StyleTogglerMixin],
    data: function () {
      return {
        dashboards:[],
        collapsedUserMenu: [
          { title: 'Refresh', action: () => {this.refreshScreen()}},
          { title: 'Toggle Light/Dark', action: () => {this.toggleDark()}}
        ],
        showTabs: false,
        shareLink: '',
        falseParam: false,
        activeTab: '',
        windowLocaton: window.location.href,
        themes: [],
      }
    },
    mounted() {
    },
    computed: {
      displayTheme: function() {
        if (this.$store.state.themeMod) return this.$store.state.themeMod.displayTheme;
        return 'light'
      },
      ...mapState([
        'myUsername',
      ]),

    },
    methods: {
      refreshScreen: function(){
        location.reload();
      }
    },
  }
</script>


<style lang="stylus">
  .navBtn
    width: 50px!important

  .responsive-img
      max-height: 46px!important
      padding-top: 5px

  .nav-toolbar
    -webkit-box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1)
    -moz-box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1)
    box-shadow: 0 2px 3px rgba(17,17,17,0.1),0 0 0 1px rgba(17,17,17,0.1)

  .list__tile__title
    font-size: 12px

  i.material-icons
    color: black

  .onHoverBtn:hover
    background-color: #D3D3D3
		cursor: pointer

  #homeButton
    text-decoration: none

  #headerText
    padding-left: 10px
    font-size: 28px
    font-family: 'Roboto'
    font-weight: normal
    text-decoration: none

    a
      text-decoration: none
      color: inherit
</style>
