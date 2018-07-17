<template>
    <v-container style="text-align: center; -webkit-app-region:drag" fluid grid-list-xs grid-list-sm grid-list-md grid-list-lg grid-list-xl>
       <v-layout id="content" row wrap >
          <!-- Window Previews -->          
        </v-layout>
      </v-container>

</template>


<script>

import ScreenGrabMixin from '../mixins/screengrabMixin'
import WindowManagementMixin from '../mixins/windowManagementMixin'
import {
  undock,
  deregister
} from 'openfin-layouts';


  export default {
    props: [

    ],
    mixins: [ScreenGrabMixin, WindowManagementMixin],
    data: function () {
      return {
        themes: [],
      }
    },
    mounted() {

      // OpenFin 
      deregister().then(() => console.log('successfully deregistered myself'));
    },
    computed: {
    },
    methods: {
      refreshScreen: function(){
        location.reload();
      }
    }
  }
</script>


<style lang="stylus">
  canvas
    width: 100%

  img 
    width: 100%

  .floating
    width: 300px
    height: auto
    border-style: solid
    border-width: thick
    border-color: lightgray
    position: relative

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
