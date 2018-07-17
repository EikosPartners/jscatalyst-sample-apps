<template lang="html">
  <main>
    <h1 class="display-2 mb-5 text-xs-center">D3 Charts</h1>
    
    <div class="d3-wrapper">
      <div class="bar-chart">
        <bar
          :dataModel='barData'
          title='D3 Bar Chart'
        ></bar>
      </div>

      <div class="box-chart">
        <box
          :dataModel='boxData'
          title='D3 Box Plot'
        ></box>
      </div>

      <div class="bu-chart">
        <bubble
          :dataModel='bubbleData'
          title='D3 Bubble Chart'
        ></bubble>
      </div>

      <div class="bul-chart">
        <bullet
          :dataModel='bulletData'
          title='D3 Bullet Chart'
        ></bullet>
      </div>

      <div class="den-chart">
        <dendrogram
          :dataModel='dendroData'
          title='D3 Dendrogram'
        ></dendrogram>
      </div>

      <div class="dif-chart">
        <difference
          :dataModel='differenceData'
          title='D3 Difference Chart'
        ></difference>
      </div>

      <div class="f-chart">
        <force
          :dataModel='forceData'
          title='D3 Force Graph'
        ></force>
      </div>

      <div class="g-chart">
        <gantt
          style="height:100%"
          :dataModel='ganttData'
          title='D3 Gantt Chart'
        ></gantt>
      </div>

      <div class="heat-chart">
        <heat
          :dataModel='heatData'
          title='D3 Heat Map'
        ></heat>
      </div>

      <div class="hist-chart">
        <histogram
          :dataModel='histogramData'
          title='D3 Histogram Chart'
        ></histogram>
      </div>

      <div class="hori-chart">
        <horizon
          :dataModel='horizonData'
          title='D3 Horizon Chart'
        ></horizon>
      </div>

      <div class="line-chart">
        <line-chart
          :dataModel='lineData'
          title='D3 Line Chart'
        ></line-chart>
      </div>

      <div class="z-chart">
        <zoomable
          :dataModel='zoomData'
          title='D3 Zoomable Line Chart'
        ></zoomable>
      </div>

      <div class="line-plot">
        <line-plot
          :dataModel='linePlotData'
          title='D3 Line Plot'
        ></line-plot>
      </div>

      <div class="pi-chart">
        <pie
          :dataModel='pieData'
          title='D3 Pie Chart'
        ></pie>
      </div>

      <div class="punch-chart">
        <punch
          :dataModel='punchData'
          title='D3 Punch Card'
        ></punch>
      </div>

      <div class="sc-chart">
        <scatter
          :dataModel='scatterData'
          title='D3 Scatter Plot'
        ></scatter>
      </div>

      <div class="stack-chart">
        <stacked-bar
          :dataModel='stackData'
          dateFormat='M/D/YY'
          title='D3 Stacked Bar Chart'
        ></stacked-bar>
      </div>

      <div class="st-chart">
        <stream
          :dataModel='streamData'
          title='D3 Stream Graph'
          dateFormat='M/D/YY'
        ></stream>
      </div>

      <div class="sun-chart">
        <sunburst
          :dataModel='sunData'
          title='D3 Sunburst'
        ></sunburst>
      </div>

      <div class="tl-chart">
        <two-line
          :dataModel='twoLineData'
          title='D3 Two Line Chart'
          dateFormat='YYYY-MM-DD'
          :dataModel2='linePlotData'
        ></two-line>
      </div>

      <div class="usc-chart">
        <us-map
          :dataModel='usCountyData'
          title='D3 US County Map'
        ></us-map>
      </div>

      <div class="uss-chart">
        <us-map
          :dataModel='usStateData'
          title='D3 US State Map'
          format="State"
          propID='state-map'
        ></us-map>
      </div>

      <div class="w-chart">
        <world-map
          :dataModel='worldData'
          title='D3 World Map'
        ></world-map>
      </div>

    </div>
  </main>
</template>

<script>
  // import the charts from the jscatalyst package
  import {
    D3BarChart,
    D3BoxPlot,
    D3BubbleChart,
    D3BulletChart,
    D3Dendrogram,
    D3DifferenceChart,
    D3ForceGraph,
    D3GanttChart,
    D3HeatMap,
    D3Histogram,
    D3HorizonChart,
    D3LineChart,
    D3ZoomableLineChart,
    D3LinePlot,
    D3PieChart,
    D3PunchCard,
    D3ScatterPlot,
    D3StackedBarChart,
    D3StreamGraph,
    D3Sunburst,
    D3TwoLinePlot,
    D3USMap,
    D3WorldMap
  } from 'jscatalyst'
  // import alll the data for the charts
  import barData from '@/mockData/d3/barchartMock.json'
  import bubbleData from '@/mockData/d3/bubbleMock.json'
  import heatData from '@/mockData/d3/heatmapMock.json'
  import stackData from '@/mockData/d3/stackedbarchartMock.json'
  import lineData from '@/mockData/d3/lineChartMock.json'
  import linePlotData from '@/mockData/d3/linePlotMock.json'
  import punchData from '@/mockData/d3/punchCardMock.json'
  import { ganttData } from '@/mockData/d3/ganttChartMock.js'
  import twoLineData from '@/mockData/d3/twoLinePlotMock.json'
  import { pieData } from '@/mockData/d3/pieChartMock.js'
  import sunData from '@/mockData/d3/flare.json'
  import scatterData from '@/mockData/d3/scatterplotMock.json'
  import differenceData from '@/mockData/d3/differenceChartMock.json'
  import bulletData from '@/mockData/d3/bulletChartMock.json'
  import dendroData from '@/mockData/d3/dendrogramMock.json'
  import zoomData from '@/mockData/d3/lineChartZoomableMock.json'
  import usCountyData from '@/mockData/d3/usMapCountyMock.json'
  import usStateData from '@/mockData/d3/usMapStateMock.json'
  import histogramData from '@/mockData/d3/histogramMock.json'
  import worldData from '@/mockData/d3/worldMapMock.json'
  import boxData from '@/mockData/d3/boxPlotMock.json'
  import forceData from '@/mockData/d3/forceDirectedGraphMock.json'
  import AAPL from '@/mockData/stockData/AAPL.json'
  import ADBE from '@/mockData/stockData/ADBE.json'
  import GOOG from '@/mockData/stockData/GOOG.json'

  import html2canvas from 'html2canvas'

  export default {
    // register the charts on the Vue instance
    components: {
      'bar': D3BarChart,
      'box': D3BoxPlot,
      'bubble': D3BubbleChart,
      'bullet': D3BulletChart,
      'dendrogram': D3Dendrogram,
      'difference': D3DifferenceChart,
      'force': D3ForceGraph,
      'gantt': D3GanttChart,
      'heat': D3HeatMap,
      'histogram': D3Histogram,
      'horizon': D3HorizonChart,
      'line-chart': D3LineChart,
      'zoomable': D3ZoomableLineChart,
      'line-plot': D3LinePlot,
      'pie': D3PieChart,
      'punch': D3PunchCard,
      'scatter': D3ScatterPlot,
      'stacked-bar': D3StackedBarChart,
      'stream': D3StreamGraph,
      'sunburst': D3Sunburst,
      'two-line': D3TwoLinePlot,
      'us-map': D3USMap,
      'world-map': D3WorldMap
    },
    // add the data to the vue instance to be used by the charts
    data() {
      return {
        barData: barData,
        boxData: boxData,
        bubbleData: bubbleData,
        bulletData: bulletData,
        dendroData: dendroData,
        differenceData: differenceData,
        forceData: forceData,
        ganttData: ganttData(),
        heatData: heatData,
        histogramData: histogramData,
        horizonData: {},
        lineData: lineData,
        zoomData: zoomData,
        linePlotData: linePlotData,
        pieData: pieData(),
        punchData: punchData,
        scatterData: scatterData,
        stackData: stackData,
        streamData: stackData,
        sunData: sunData,
        twoLineData: twoLineData,
        usCountyData: usCountyData,
        usStateData: usStateData,
        worldData: worldData,
        twoLineData: twoLineData
      }
    },
    mounted() {
      this.barData = barData
      this.horizonData = {'AAPL': AAPL, 'ADBE': ADBE, 'GOOG': GOOG}
    }
  }
</script>

<style lang="stylus">
  .d3-wrapper {
    display:grid;
    grid-gap: 30px;
    grid-template-columns: repeat(12, 1fr);

    & .bar-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .box-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .bu-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .bul-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .den-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .dif-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .f-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .g-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .heat-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .hist-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .hori-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .line-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .z-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .line-plot {
      height: 500px;
      grid-column: 7/13;
    }
    & .pi-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .punch-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .sc-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .stack-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .st-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .sun-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .tl-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .usc-chart {
      height: 500px;
      grid-column: 7/13;
    }
    & .uss-chart {
      height: 500px;
      grid-column: 1/7;
    }
    & .w-chart {
      height: 500px;
      grid-column: 7/13;
    }

  }
</style>
