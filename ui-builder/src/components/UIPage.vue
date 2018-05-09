<template >
  <div class="ui-building">
    <ui-builder :endpoints='endpoints'></ui-builder>
  </div>
</template>

<script>
// import the ui buuilder component from jscatalyst
import { UIBuilderComponent } from 'jscatalyst'
export default {
  components: {
    'ui-builder': UIBuilderComponent
  },
  data() {
    return {
      // list of endpoints available in a select so the user does not have to
      // manually enter them
      // these are passed as props to the ui-builder
      endpoints: [
        "http://localhost:9000/data/barchart",
        "http://localhost:9000/data/piechart",
        "http://localhost:9000/data/linechart"
      ]
    }
  }
}
</script>

<style lang="css">
</style>
