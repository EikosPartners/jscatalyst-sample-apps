<template>
  <div>
	<LocalVideo />
	<hr />
	<RemoteVideo />
  </div>
</template>

<script>
import LocalVideo from './LocalVideo'
import RemoteVideo from './RemoteVideo'

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
