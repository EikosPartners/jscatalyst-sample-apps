<template>
  <div class="receiver">
    <video autoplay playsinline id="remoteVideo"> </video>
    <audio id="remoteAudio"> </audio>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['logVideoLoaded', 'logResizedVideo'],
  name: 'Receiver',
  data () {
    return {
      msg: 'VIDEO CHAT',
    }
  },

    computed: {
    ...mapState([
      'remoteVideo',
      'remoteAudio'
    ])
  },
  mounted(){
    this.$store.commit('SET_REMOTE_VIDEO', {el: document.getElementById('remoteVideo')})
    this.$store.commit('SET_REMOTE_AUDIO', {el: document.getElementById('remoteAudio')})
    this.remoteVideo.addEventListener('loadedmetadata', this.logVideoLoaded);
    this.remoteVideo.addEventListener('onresize', this.logResizedVideo);
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
