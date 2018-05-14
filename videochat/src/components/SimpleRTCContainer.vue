<template>
  <div>
        <video id="localVideo" autoplay></video>
        <video id="remoteVideo" autoplay></video>

    HELLO
  </div>
</template>

<script>
import SimpleWebRTC from 'simplewebrtc';

export default {
  name: 'Alternate',
  data () {
    return {
      msg: 'VIDEO CHAT',
    }
  },

  components: {

  },  
  methods: {

  },
  mounted(){
    var webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remoteVideos',
        // immediately ask for camera access
        autoRequestMedia: true
    });

      webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom('your awesome room name');
    });
// https://github.com/andyet/SimpleWebRTC

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
