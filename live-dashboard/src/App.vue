<template>
  <v-app id="app">
    <toolbar></toolbar>
    <dashboard></dashboard>

  </v-app>
</template>

<script>
import html2canvas from 'html2canvas-webpack' // This needs to be part of a mixin / plugin

import Dashboard from './components/Dashboard.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    'dashboard': Dashboard,
    'toolbar': Toolbar
  },
  mounted() {
      window.addEventListener("message", event=>{
        debugger

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
