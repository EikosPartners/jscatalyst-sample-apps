<template>
  <div class="chartist-wrapper">
    <div class="b-chart">
      <bar-chart
        title='Chartist Bar Chart'
        :dataModel='barData'
      ></bar-chart>
    </div>

    <div class="l-chart">
      <line-chart
        title='Chartist Line Chart'
        :dataModel='lineData'
      ></line-chart>
    </div>

    <div class="p-chart">
      <pie-chart
        title='Chartist Pie Chart'
        :dataModel='pieData'
      ></pie-chart>
    </div>
  </div>

</template>

<script>
  require('chartist/dist/chartist.min.css')
  import { ChartistBarChart, ChartistLineChart, ChartistPieChart } from 'jscatalyst'
  import barData from '@/mockData/barMock.json'
  import lineData from '@/mockData/lineMock.json'
  import pieData from '@/mockData/chartjs/polarMock.json'

  export default {
    components: {
      'bar-chart': ChartistBarChart,
      'line-chart': ChartistLineChart,
      'pie-chart': ChartistPieChart
    },
    data() {
      return {
        barData: barData,
        lineData: lineData,
        pieData: pieData
      }
    }
  }
</script>

<style lang='stylus'>
.chartist-wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 30px;

  & .b-chart {
    height: 500px;
    grid-column: 1/7;
  }
  & .l-chart {
    height: 500px;
    grid-column: 7/13;
  }
  & .p-chart {
    height: 500px;
    grid-column: 1/7;
  }
}



</style>
