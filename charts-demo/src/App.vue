<template>
  <v-app id="app">
    <toolbar></toolbar>
    <sub-nav></sub-nav>
    <v-content class="mx-5" style="padding-top: 50px;" id='contextFrame'>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import html2canvas from 'html2canvas-webpack' // This needs to be part of a mixin / plugin

import { Toolbar } from 'jscatalyst'
import SubNavBar from './components/SubNavBar.vue'
export default {
  name: 'App',
  components: {
    'toolbar': Toolbar,
    'sub-nav': SubNavBar
  },
  mounted() {
      window.addEventListener("message", event=>{

        if ( event.data.action !== undefined ) {
          if ( event.data.action === 'bringToFront') {
            let finWin = fin.desktop.Window.getCurrent()
            finWin.restore()
            finWin.bringToFront()
            return
          }
        }

    if( event.data.action !== undefined && event.data.action === 'screencapture') 
    {
        let body = window.document.body
        html2canvas(body)
        .then(canvas => {
            try {
                debugger

              let data = canvas.toDataURL("img/png")

              let obj = JSON.stringify(data)

              event.source.postMessage({
                action: 'screencapture',
                width: canvas.width,
                height: canvas.height,
                data: obj
              }, '*')
            } catch (exception ) {
              console.log(exception)
            }
        })
        .catch(error => {
          console.log(error)
        });
      }}
      , false);

  },
}
</script>

<style>
</style>
