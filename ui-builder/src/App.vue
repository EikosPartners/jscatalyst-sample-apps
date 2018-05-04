<template>
  <v-app id="app">
    <toolbar></toolbar>
    <section class='description' style="z-index: 1;">
        <h1 class="display-2">UI Builder Demo</h1>
        <p class="subtitle my-3">
          This is a demo for the UI Builder that is available in the <a href="https://github.com/EikosPartners/jscatalyst" target="_blank">JS Catalyst repo</a>. This component creates an easy to use and simple user interface for designing and creating your own dashboards.
        </p>
        <p class="subtitle my-3">
          For this demo, click the add row button below and then hover over the secion. You can then add columns to that row or a dd a component to that area using the ADD button. This opens a model with a menu for selecting which component from the JS Catalyst package you would like to load, and the api endpoint for the data of that chart. You can also fill in the other props needed by the chart and customize it to your liking.
        <p class="subtitle my-3">
          Once you choose the chart and the correct endpoint for that chart please click load and the component will instantly load in the section you selected. In this example a list of endpoints are given, but because this component is so flexible it also allows for a user to enter their own api endpoints and customize it to fit their api. Once a dashboard is created it then would be possible to save it and use it in the future.
        </p>
    </section>
    <ui-page></ui-page>
  </v-app>
</template>

<script>
  import UIPage from './components/UIPage.vue'
  import Toolbar from './components/Toolbar.vue'
  export default {
    name: 'App',
    components: {
      'ui-page': UIPage,
      'toolbar': Toolbar
    }
  }
</script>

<style>
.description {
  width:800px;
  margin: auto;
}

</style>
