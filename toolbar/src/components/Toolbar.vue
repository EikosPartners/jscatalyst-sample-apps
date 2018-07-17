<template>
  <div class="window-drag">
      <v-toolbar class="nav-toolbar window-drag"
        app
        clipped-left
        fixed
        style="z-index:5;"
      >
        <!-- DROP A LOGO HERE -->
        <h1 id="headerText">Toolbar</h1>
        <!--
        <router-link :to="{name: 'HomePage'}" class="headline nav-text">Chart Demo</router-link>
        -->
        <v-spacer></v-spacer>

        <!-- Full nav menu for larger screens -->
        <v-toolbar-items class="hidden-md-and-down">
          <v-tooltip bottom>
            <v-btn icon @click="toggleDark" slot="activator">
              <v-icon class="">lightbulb_outline</v-icon>
            </v-btn>
            <span>Toggle light/dark</span>
          </v-tooltip>

          <v-tooltip bottom>
            <v-btn icon @click="showAllWindows" slot="activator">
              <v-icon class="">menu</v-icon>
            </v-btn>
            <span>Show All Windows</span>
          </v-tooltip>

        </v-toolbar-items>

        <!-- Collapsed nav menu for mobile -->
        <v-toolbar-items class="hidden-lg-and-up">
          <v-tooltip bottom>
            <v-btn icon @click="toggleDark" slot="activator">
              <v-icon class="">lightbulb_outline</v-icon>
            </v-btn>
            <span>Toggle light/dark</span>
          </v-tooltip>
          
          <v-tooltip bottom>
            <v-btn icon @click="showAllWindows" slot="activator">
              <v-icon class="">menu</v-icon>
            </v-btn>
            <span>Show All Windows</span>
          </v-tooltip>
        </v-toolbar-items>

      </v-toolbar>
  </div>
</template>

<script>

import { StyleTogglerMixin } from 'jscatalyst'
import ScreenGrabMixin from '../mixins/screengrabMixin'
import WindowManagementMixin from '../mixins/windowManagementMixin'

  export default {
    props: [

    ],
    mixins: [StyleTogglerMixin, ScreenGrabMixin, WindowManagementMixin],
    data: function () {
      return {
        themes: [],
      }
    },
    mounted() {
      this.themes = this.allThemes
      if (this.$store.state.themeMod) this.chooseTheme(this.colorTheme);
    },
    computed: {
      colorTheme: function() {
        if(this.$store.state.themeMod) return this.$store.state.themeMod.colorTheme;
        return 'blue'
      },
      displayTheme: function() {
        if (this.$store.state.themeMod) return this.$store.state.themeMod.displayTheme;
        return 'light'
      },
      allThemes: function() {
        if (this.$store.state.themeMod) return this.$store.state.themeMod.allThemes;
        return ['Blue']
      }
    },
    methods: {
      refreshScreen: function(){
        location.reload();
      }
    }
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

  .nav-text
    text-decoration none
    color #000

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
</style>
