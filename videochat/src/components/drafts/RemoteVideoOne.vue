<template>
  <div class="receiver">
    <video id="remoteVideo" autoplay></video>

  </div>
</template>

<script>
  import { remoteVideo, remoteVideoEventListeners, } from '../../RTCHelper.js'

export default {
  name: 'Alternate',
  data () {
    return {
      msg: 'VIDEO CHAT',
    }
  },

    computed: {

  },
  mounted(){
    remoteVideo()
    remoteVideoEventListeners()
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

}

</style>
