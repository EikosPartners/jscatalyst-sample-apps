<template>
  <main style="margin: 0 auto;">
    <h1 class='display-2 my-5 text-xs-center'>Protected Dashboard</h1>
    <div class="dashboard">
      <section class="chart pa-2 ma-2">
        <h2 class='title text-xs-center mt-3'>Chart Name</h2>
        <bar-chart class="chart-styles"
          :dataModel='barData'
        ></bar-chart>
      </section>

      <section class="chart pa-2 ma-2">
        <h2 class='title text-xs-center mt-3'>Chart Name</h2>
        <box-plot class="chart-styles"
          :dataModel='boxData'
        ></box-plot>
      </section>

      <section class="chart pa-2 ma-2">
        <h2 class='title text-xs-center mt-3'>Chart Name</h2>
        <heat-map class="chart-styles"
          :dataModel='heatData'
          :dataType="'calendar'"
        ></heat-map>
      </section>

      <section class="chart pa-2 ma-2">
        <h2 class='title text-xs-center mt-3'>Chart Name</h2>
        <line-plot class="chart-styles"
          :dataModel='lineData'
        ></line-plot>
      </section>

      <section class="chart pa-2 ma-2">
        <h2 class='title text-xs-center mt-3'>Chart Name</h2>
        <punch-card class="chart-styles"
          :dataModel='punchData'
        ></punch-card>
      </section>
    </div>
  </main>
</template>

<script>
  //import charts
  import {
    D3BarChart,
    D3BoxPlot,
    D3HeatMap,
    D3LinePlot,
    D3PunchCard
  } from 'jscatalyst'
  // import mock data
  import barData from '@/mockData/barMock.json'
  import boxData from '@/mockData/boxMock.json'
  import heatData from '@/mockData/heatMock.json'
  import lineData from '@/mockData/lineMock.json'
  import punchData from '@/mockData/punchMock.json'

  export default {
    // register components on vue instance
    components: {
      'bar-chart': D3BarChart,
      'box-plot': D3BoxPlot,
      'heat-map': D3HeatMap,
      'line-plot': D3LinePlot,
      'punch-card': D3PunchCard
    },
    // set data for all the charts
    data: function() {
      return {
        barData: [],
        boxData: [],
        bubbleData: [],
        heatData: [],
        horizonData: {},
        lineData: [],
        punchData: []
      }
    },
    mounted() {
      this.barData = barData;
      this.boxData = boxData;
      this.heatData = heatData;
      this.lineData = lineData;
      this.punchData = punchData;
    }
  }
</script>

<style lang="css" scoped>
section {
  padding: 40px;
}
h2 {
  font-weight: normal;
}
.dashboard {
  display: grid;
  grid-template-columns: 48vw 48vw;
}
.chart {
  height:500px;
  border-radius: 2px;
  box-shadow: 1px 1px 4px #999;
}
.chart-styles {
  padding: 40px;
}
</style>
