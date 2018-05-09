<template>
  <div class='charts'>

      <section class="description">
        <h1 class="display-1 my-5">Chart Sharing</h1>
        <p class="body-1 mt-3">
          This is a demo of the ability to send and receive charts and dashboards using JS Catalyst. By using the Chart Sender component and the Receiver component contained in the JS Catalyst package it is easy to send all charts and dashboards over websockets. In order to play with the demo open another tab and navigate to the receiver page through the button at the top right. If you inspect the reciever page there is noting there except for the Receiver Component. Next in your other window either select a chart and click submit or send the wholde dashboard by clicking Share Dashboard. Now if you go back to the Receiver page in your other window you will see the chart or dashboard has been sent successfully. Notice the styles for each page. In the main dashboard page it is dashed border. The Receiver page has a dotted border. When the dashboard is sent over all styles are sent with it and the Receiver page has both the dotted and dashed border. Notice how the yellow background-color style on the Difference Chart is preserved when it is sent to the receiver page. This is because all inline styles on the charts are captured and sent along too. Also feel free to play around with the Theme colors and the light/dark theming. These styles are also sent with the chart or dashboard. The Receiver component also provides a Chart Sender component once it has received charts. This could be used to pass along dashboards and specific charts to other users, creating a chain of sharing. Another thing to note is that these charts come from different charting libraries. They are a mix of Chartjs, Chartist, and D3 charts. This demonstrates the flexibilty of the JS Catalyst Chart Sharing feature.
        </p>
      </section>

      <div class="sender">
        <chart-sender></chart-sender>
      </div>

      <div class="bubble">
        <chartjs-bubble
          title='Chartjs Bubble Chart'
          :dataModel='bubbleData'
        ></chartjs-bubble>
      </div>

      <div class="line">
        <chartjs-line
          title='Chartjs Line Chart'
          :dataModel='lineData'
        ></chartjs-line>
      </div>

      <div class="pie">
        <chartist-pie
          title='Chartist Pie Chart'
          :dataModel='pieData'
        ></chartist-pie>
      </div>

      <div class="zoomable">
        <d3-zoomable-line
          title='D3 Zoomable Line Chart'
          :dataModel='zoomableData'
        ></d3-zoomable-line>
      </div>

      <div class="stream">
        <d3-stream
          title='D3 Stream Graph'
          :dataModel='streamData'
          dateFormat='M/D/YY'
        ></d3-stream>
      </div>

      <div class="difference">
        <d3-difference
          title='D3 Difference Chart'
          :dataModel='differenceData'
          style='background-color: yellow;'
        ></d3-difference>
      </div>

  </div>
</template>

<script>
  //import components from jscatalyst package
  import {
    ChartjsBubbleChart,
    ChartjsLineChart,
    ChartistPieChart,
    D3ZoomableLineChart,
    D3DifferenceChart,
    D3StreamGraph,
    ChartSender
  } from 'jscatalyst'
  // import mock data
  import barlineData from '@/mockData/barlineMock.json'
  import bubbleData from '@/mockData/bubbleMock.json'
  import pieData from '@/mockData/pieMock.json'
  import streamData from '@/mockData/streamMock.json'
  import zoomableData from '@/mockData/zoomableMock.json'
  import differenceData from '@/mockData/differenceMock.json'

  export default {
    // register the charts on the Vue instance
    components: {
      'chartjs-bubble': ChartjsBubbleChart,
      'chartjs-line': ChartjsLineChart,
      'chartist-pie': ChartistPieChart,
      'd3-zoomable-line': D3ZoomableLineChart,
      'd3-difference': D3DifferenceChart,
      'd3-stream': D3StreamGraph,
      'chart-sender': ChartSender
    },
    data: function() {
      return {
        bubbleData: [],
        lineData: [],
        pieData: [],
        zoomableData: [],
        streamData: [],
        differenceData: []
      }
    },
    // add mock data to the Vue instance to be used by the charts
    created() {
      this.bubbleData = bubbleData;
      this.lineData = barlineData;
      this.pieData = pieData;
      this.streamData = streamData;
      this.zoomableData = zoomableData;
      this.differenceData = differenceData;
    }

  }
</script>

<style>
@supports (display: grid) {
  .charts {
    display:grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
    '. ds ds ds ds ds ds ds ds ds ds .'
    '. sd sd sd sd sd sd sd sd sd sd .'
    '. bb bb bb bb bb bb bb bb bb bb .'
    '. li li li li li pi pi pi pi pi .'
    '. zo zo zo zo zo zo zo zo zo zo .'
    '. st st st st st df df df df df .'
    '. . . . . . . . . . . .'
    ;
    border: 2px dashed;
    grid-row-gap: 50px;
    grid-column-gap: 50px;
  }
  .description {
    grid-area: ds;
  }
  .sender {
    grid-area: sd;
    height: 100px;
  }
  .bubble {
    grid-area: bb;
    height: 400px;
  }
  .line {
    grid-area: li;
    height: 400px;
  }
  .pie {
    grid-area: pi;
    height: 400px;
  }
  .zoomable {
    grid-area: zo;
    height: 400px;
  }
  .stream {
    grid-area: st;
    height: 400px;
  }
  .difference {
    grid-area: df;
    height: 400px;
  }
}
@supports not (display:grid) {

}


</style>
