<template lang="html">
  <div class="chartjs-wrapper">
    <div class="b-chart">
      <bar
        title='Chartjs Bar Chart'
        :dataModel='barData'
      ></bar>
    </div>
    <div class="bl-chart">
      <bar-line
        title='Chartjs Bar Line Chart'
        :dataModel='lineData'
      ></bar-line>
    </div>
    <div class="bu-chart">
      <bubble
        title='Chartjs Bubble Chart'
        :dataModel='bubbleData'
      ></bubble>
    </div>
    <div class="l-chart">
      <line-chart
        title='Chartjs Line Chart'
        :dataModel='lineData'
      ></line-chart>
    </div>
    <div class="pi-chart">
      <pie
        title='Chartjs Pie Chart'
        :dataModel='pieData'
      ></pie>
    </div>
    <div class="po-chart">
      <polar
        title='Chartjs Polar Chart'
        :dataModel='polarData'
      ></polar>
    </div>
    <div class="r-chart">
      <radar
        title='Chartjs Radar Chart'
        :dataModel='radarData'
      ></radar>
    </div>
    <div class="s-chart">
      <scatter
        title='Chartjs Scatter Plot'
        :dataModel='scatterData'
      ></scatter>
    </div>
    <div class="ml-chart">
      <line-chart
        title='Chartjs Multi Line Chart'
        propID='multi-line-chart'
        :dataModel='multiLineData'
      ></line-chart>
    </div>
  </div>
</template>

<script>
  import {
    ChartjsBarChart,
    ChartjsBarLineChart,
    ChartjsBubbleChart,
    ChartjsLineChart,
    ChartjsPieChart,
    ChartjsPolarChart,
    ChartjsRadarChart,
    ChartjsScatterChart
  } from 'jscatalyst'
  import barData from '@/mockData/barMock.json'
  import lineData from '@/mockData/lineMock.json'
  import pieData from '@/mockData/chartjs/polarMock.json'
  import bubbleData from '@/mockData/chartjs/bubbleMock.json'
  import radarData from '@/mockData/chartjs/radarMock.json'
  import scatterData from '@/mockData/chartjs/scatterMock.json'
  import multiLineData from '@/mockData/chartjs/multiLineMock.json'

  export default {
    components: {
      'bar': ChartjsBarChart,
      'bar-line': ChartjsBarLineChart,
      'bubble': ChartjsBubbleChart,
      'line-chart': ChartjsLineChart,
      'pie': ChartjsPieChart,
      'polar': ChartjsPolarChart,
      'radar': ChartjsRadarChart,
      'scatter': ChartjsScatterChart
    },
    data() {
      return {
        barData: barData,
        bubbleData: bubbleData,
        lineData: lineData,
        pieData: pieData,
        polarData: pieData,
        radarData: radarData,
        scatterData: scatterData,
        multiLineData: multiLineData
      }
    }
  }
</script>

<style lang="stylus">
.chartjs-wrapper {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(12, 1fr);

  & .b-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .bl-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .bu-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .l-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .pi-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .po-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .r-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .s-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .ml-chart {
    height:500px;
    grid-column: 1/7;
  }
}
</style>
