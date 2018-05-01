<template>
  <div>
    <h1 class='display-2 mb-5' style='text-align:center;'>Protected Dashboard</h1>
    <div class="dashboard">
      <div class="chart">
        <bar-chart
          :dataModel='barData'
        ></bar-chart>
      </div>

      <div class="chart">
        <box-plot
          :dataModel='boxData'
        ></box-plot>
      </div>

      <div class="chart">
        <heat-map
          :dataModel='heatData'
        ></heat-map>
      </div>

      <div class="chart">
        <line-plot
          :dataModel='lineData'
        ></line-plot>
      </div>

      <div class="chart">
        <punch-card
          :dataModel='punchData'
        ></punch-card>
      </div>

    </div>
  </div>

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
    components: {
      'bar-chart': D3BarChart,
      'box-plot': D3BoxPlot,
      'heat-map': D3HeatMap,
      'line-plot': D3LinePlot,
      'punch-card': D3PunchCard
    },
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

<style lang="css">
.dashboard {
  display: grid;
  grid-template-columns: 48vw 48vw;
}
.chart {
  height:500px
}
</style>
