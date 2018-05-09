<template>
  <main>
    <h1 class="display-2 mb-5 text-xs-center">Chartist Charts</h1>
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
  </main>

</template>

<script>
  require('chartist/dist/chartist.min.css')
  // import the components from the jscatalyst package
  import { ChartistBarChart, ChartistLineChart, ChartistPieChart } from 'jscatalyst'
  // import all the data for the charts
  import barData from '@/mockData/barMock.json'
  import lineData from '@/mockData/lineMock.json'
  import pieData from '@/mockData/chartjs/polarMock.json'

  export default {
    // register the charts on the Vue instance
    components: {
      'bar-chart': ChartistBarChart,
      'line-chart': ChartistLineChart,
      'pie-chart': ChartistPieChart
    },
    // add data to instance to be used for each chart
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
