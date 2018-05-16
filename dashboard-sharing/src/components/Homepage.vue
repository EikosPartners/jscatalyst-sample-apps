<template lang="html">
  <main>
    <section class="left">
      <h1 class="display-3">Dashboards and Charts Sharing</h1>
      <p class="headline my-3">
        This is a demo of the ability to send and receive charts and dashboards using JS Catalyst. </p>
    </section>
    <section class="right">
      <div class="card">
        <div class="my-3 mb-5">
          <h3 class="title mb-2">To Use</h3>
          <p>By using the Chart Sender component and the Receiver component contained in the JS Catalyst package it is easy to send all charts and dashboards over websockets. In order to play with the demo open another tab and navigate to the receiver page through the button at the top right. If you inspect the reciever page there is noting there except for the Receiver Component. Next in your other window either select a chart and click submit or send the wholde dashboard by clicking Share Dashboard. Now if you go back to the Receiver page in your other window you will see the chart or dashboard has been sent successfully. Notice the styles for each page. In the main dashboard page it is dashed border. The Receiver page has a dotted border. When the dashboard is sent over all styles are sent with it and the Receiver page has both the dotted and dashed border. Notice how the yellow background-color style on the Difference Chart is preserved when it is sent to the receiver page. This is because all inline styles on the charts are captured and sent along too. Also feel free to play around with the Theme colors and the light/dark theming. These styles are also sent with the chart or dashboard. The Receiver component also provides a Chart Sender component once it has received charts. This could be used to pass along dashboards and specific charts to other users, creating a chain of sharing. Another thing to note is that these charts come from different charting libraries. They are a mix of Chartjs, Chartist, and D3 charts. This demonstrates the flexibilty of the JS Catalyst Chart Sharing feature.</p>
          <p>In JS Catalyst, you can use pre-made themes, or easily create your own.</p>
        </div>
        <div>
          <router-link to='Dashboard' @click="openReceiver" style="text-decoration:none;"><v-btn color="primary" class="ml-0">Go to Dashboard</v-btn></router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {
    openReceiver: function() {
      console.log('hi!');
    }
  }
}
</script>

<style lang="css" scoped>
main {
    height: 100%;
    display: grid;
    grid-gap: 40px;
    justify-content: space-around;
    /* background-color: #E0E0E0; */
  }

  section {
    margin: auto 80px;
  }

  .left {
    grid-column: 1 / 4;
    grid-row: 1 / 1;
  }

  .right {
    grid-column: 5 / 12;
    grid-row: 1 / 1;
  }

  .card {
    padding: 40px;
    background-color: #FFF;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #999;
  }
</style>
