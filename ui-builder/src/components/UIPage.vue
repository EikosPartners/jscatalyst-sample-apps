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
        '/data/barchart',
        '/data/boxplot',
        '/data/bubblechart',
        '/data/bulletchart',
        '/data/dendrogram',
        '/data/differencechart',
        '/data/forcegraph',
        '/data/ganttchart',
        '/data/heatmap',
        '/data/histogram',
        '/data/stackedbar',
        '/data/linechart',
        '/data/zoomablelinechart',
        '/data/lineplot',
        '/data/piechart',
        '/data/punchcard',
        '/data/scatterplot',
        '/data/sunburst',
        '/data/twolineplot',
        '/data/usmapcounty',
        '/data/usmapstate',
        '/data/wolrdmap',
        '/data/cjspiechart',
        '/data/cjsbubblechart',
        '/data/radarchart',
        '/data/cjsscatterplot',
        '/data/multiline'
      ]
    }
  }
}
</script>

<style lang="css">
</style>
