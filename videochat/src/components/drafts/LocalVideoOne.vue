<template>
  <div class="receiver">
    <video id="localVideo" autoplay></video>

    <div>
      <button id="startButton">Start</button>
      <button id="callButton">Call</button>
      <button id="hangupButton">Hang Up</button>
    </div>

  </div>
</template>

<script>
  import {buttons, buttonEventListeners, localVideo, localVideoEventListeners, } from '../../RTCHelper.js'

export default {
  name: 'Alternate',
  data () {
    return {
      msg: 'VIDEO CHAT',
    }
  },
  mounted(){
    buttons()
    buttonEventListeners()
    localVideo()
    localVideoEventListeners()
  },  
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  max-width: 100%;
  width: 600px;

/*  filter: blur(4px) invert(1) opacity(0.5);*/
/*     filter: hue-rotate(180deg) saturate(200%);*/

}

</style>
