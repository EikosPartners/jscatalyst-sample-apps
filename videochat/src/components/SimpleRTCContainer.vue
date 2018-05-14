<template>
  <div>
        <video id="localVideo" autoplay></video>
        <video id="remoteVideo" autoplay></video>

  </div>
</template>

<script>
import SimpleWebRTC from 'simplewebrtc';

export default {
  name: 'Alternate',
  data () {
    return {
      msg: 'VIDEO CHAT',
      sessionId: null
    }
  },

  components: {

  },  
  methods: {

  },
  mounted(){
    var localThis = this
    var webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVideos',
        // immediately ask for camera access
        autoRequestMedia: true
    });

      webrtc.on('readyToCall', function () {
        webrtc.joinRoom('Eikos');
    });
      webrtc.on('connectionReady', function (sessionId) {
        localThis.sessionId = sessionId
      })

// https://github.com/andyet/SimpleWebRTC
// https://github.com/andyet/signalmaster
// https://simplewebrtc.com/
// https://simplewebrtc.com/notsosimple.html

// https://www.webrtc-experiment.com/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
video {
  max-width: 100%;
  width: 600px;
}
</style>
