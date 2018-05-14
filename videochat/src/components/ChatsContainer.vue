<template>
  <div>
	<LocalVideo />
	<hr />
	<RemoteVideo />
  </div>
</template>

<script>
import LocalVideo from './drafts/LocalVideoOne'
import RemoteVideo from './drafts/RemoteVideoOne'

export default {
  name: 'Alternate',
  data () {
    return {
      msg: 'VIDEO CHAT',
    }
  },

  components: {
  	LocalVideo,
  	RemoteVideo
  },  
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
