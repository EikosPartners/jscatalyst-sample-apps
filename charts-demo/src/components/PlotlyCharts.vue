<template lang="html">
  <main>
    <h1 class="display-2 mb-5 text-xs-center">Plotly Charts</h1>
    <div class="plotly-wrapper">
      <div class="a-chart">
        <area-chart
          :dataModel='areaData'
          title='Plotly Area Chart'
        ></area-chart>
      </div>
      <div class="b-chart">
        <bar
          :dataModel='barData'
          title='Plotly Bar Chart'
        ></bar>
      </div>
      <div class="bu-chart">
        <bubble
          :dataModel='bubbleData'
          title='Plotly Bubble Chart'
        ></bubble>
      </div>
      <div class="d-chart">
        <donut
          :dataModel='donutData'
          title='Plotly Donut Chart'
        ></donut>
      </div>
      <div class="h-chart">
        <heat
          :dataModel='heatData'
          title='Plotly Heat Map'
        ></heat>
      </div>
      <div class="sc-chart">
        <scatter
          :dataModel='scatterData'
          title='Plotly Scatter Plot'
        ></scatter>
      </div>
      <div class="su-chart">
        <surface
          :dataModel='surfaceData'
          title='Plotly Surface Chart'
        ></surface>
      </div>
    </div>
  </main>
</template>

<script>
  // import the charts from the jscatalyst package
  import {
    PlotlyAreaChart,
    PlotlyBarGraph,
    PlotlyBubbleChart,
    PlotlyDonutChart,
    PlotlyHeatMap,
    PlotlyScatterPlot,
    PlotlySurfacePlot
  } from 'jscatalyst'
  // import the data for the charts
  import barData from '@/mockData/plotly/barMock.json'
  import bubbleData from '@/mockData/plotly/bubbleMock.json'
  import scatterData from '@/mockData/plotly/scatterMock.json'
  import donutData from '@/mockData/plotly/donutMock.json'
  import heatData from '@/mockData/plotly/heatMock.json'
  import areaData from '@/mockData/plotly/areaMock.json'
  import surfaceData from '@/mockData/plotly/surfaceMock.json'

  export default {
    //register the charts on the Vue instance
    components: {
      'area-chart': PlotlyAreaChart,
      'bar': PlotlyBarGraph,
      'bubble': PlotlyBubbleChart,
      'donut': PlotlyDonutChart,
      'heat': PlotlyHeatMap,
      'scatter': PlotlyScatterPlot,
      'surface': PlotlySurfacePlot
    },
    // add data to the Vue instance to be used by the charts
    data() {
      return {
        areaData: areaData,
        barData: barData,
        bubbleData: bubbleData,
        donutData: donutData,
        heatData: heatData,
        scatterData: scatterData,
        surfaceData: surfaceData,
      }
    }
  }
</script>

<style lang="stylus">
.plotly-wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 30px;

  & .a-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .b-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .bu-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .d-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .h-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .sc-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .su-chart {
    height: 500px;
    grid-column: 1/7;
  }
}
</style>
