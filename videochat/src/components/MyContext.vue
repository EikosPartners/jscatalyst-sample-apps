<template>
  <div class="myContext">
    <video autoplay id="localVideo"> </video>
    <audio id="localAudio"> </audio>


<div id="myButtons">   
  <button id="startButton">Start</button>
  <button id="callButton">Call</button>
  <button id="hangupButton">Hang Up</button>
</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'MyContext',
  data () {
    return {
      msg: 'VIDEO CHAT',
      hdConstraints: {
        video: {
          width: {
            min: 1280
          },
          height: {
            min: 720
          }
        }
      }


    }
  },
  computed: {
    ...mapState([
      'localVideo',
      'localAudio'
    ])
  },

  mounted(){
    this.$store.commit('SET_LOCAL_VIDEO', {el: document.getElementById('localVideo')})
    this.$store.commit('SET_LOCAL_AUDIO', {el: document.getElementById('localAudio')})
    navigator.mediaDevices.getUserMedia({video:true, audio: true}).then(this.handleSuccess).catch(this.handleError)
  },
  methods: {
    handleSuccess(stream) {
      this.localVideo.srcObject = stream;
      
      var audioTracks = stream.getAudioTracks();
      console.log('Using audio device: ' + audioTracks[0].label);
      stream.oninactive = function() {
        console.log('Stream ended');
      };
      window.stream = stream; // make variable available to browser console
      this.audio.srcObject = stream;
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
