<template>
  <div class='receive-wrapper'>
    <receiver-component style='border: 3px dotted;'></receiver-component>
  </div>
</template>

<script>
// import the Receiver component from jscatalyst 
import { ReceiverComponent } from 'jscatalyst'
export default {
  components: {
    'receiver-component': ReceiverComponent
  }
}
</script>

<style lang="css">
</style>
