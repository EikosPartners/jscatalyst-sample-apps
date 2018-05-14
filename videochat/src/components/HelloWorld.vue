<template>
  <div class="hello">
    <video autoplay id="videoHelloWorld"> </video>
    <audio id="audioHelloWorld"> </audio>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'VIDEO CHAT',
      video: null,
      audio: null
    }
  },
  mounted(){

    this.video = document.getElementById('videoHelloWorld')
    this.audio = document.getElementById('audioHelloWorld')
    navigator.mediaDevices.getUserMedia({video:true, audio: true}).then(this.handleSuccess).catch(this.handleError)
  },
  methods: {
    handleSuccess(stream) {
      this.video.srcObject = stream;
      
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

</style>
