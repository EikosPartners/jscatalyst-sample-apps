<template >
  <div class="ui-building">
    <ui-builder :endpoints='endpoints'></ui-builder>
  </div>
</template>

<script>
  import { UIBuilderComponent } from 'jscatalyst'
export default {
  components: {
    'ui-builder': UIBuilderComponent
  },
  data() {
    return {
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
