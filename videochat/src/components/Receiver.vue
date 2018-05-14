<template>
  <div class="receiver">
    <video autoplay id="remoteVideo"> </video>
    <audio id="remoteAudio"> </audio>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Receiver',
  data () {
    return {
      msg: 'VIDEO CHAT',
      remoteVideo: null,
      remoteAudio: null,
    }
  },

    computed: {
    ...mapState([
      'remoteVideo',
      'remoteAudio'
    ])
  },
  mounted(){
    this.$store.commit('SET_remote_VIDEO', {el: document.getElementById('remoteVideo')})
    this.$store.commit('SET_remote_AUDIO', {el: document.getElementById('remoteAudio')})

    navigator.mediaDevices.getUserMedia({video:true, audio: true}).then(this.handleSuccess).catch(this.handleError)
  },
  methods: {
    handleSuccess(stream) {
      this.remoteVideo.srcObject = stream;
      
      var audioTracks = stream.getAudioTracks();
      console.log('Using audio device: ' + audioTracks[0].label);
      stream.oninactive = function() {
        console.log('Stream ended');
      };
      window.stream = stream; // make variable available to browser console
      this.remoteAudio.srcObject = stream;
    },
     handleError(error) {
      console.error('Reeeejected!', error);
    }
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
